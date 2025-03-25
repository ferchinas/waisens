
import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Camera, FlipCamera, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function BarcodeScanner() {
  const [scanning, setScanning] = useState(false)
  const [facingMode, setFacingMode] = useState("environment")
  const videoRef = useRef(null)
  const { toast } = useToast()

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanning(true)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de cámara",
        description: "No se pudo acceder a la cámara del dispositivo"
      })
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      setScanning(false)
    }
  }

  const toggleCamera = () => {
    stopScanning()
    setFacingMode(prev => prev === "environment" ? "user" : "environment")
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Escáner de Códigos</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={toggleCamera}
            disabled={!scanning}
          >
            <FlipCamera className="h-4 w-4 mr-2" />
            Cambiar Cámara
          </Button>
          <Button
            variant={scanning ? "destructive" : "default"}
            onClick={scanning ? stopScanning : startScanning}
          >
            {scanning ? "Detener" : "Iniciar"} Escaneo
          </Button>
        </div>
      </div>

      <div className="relative aspect-video max-w-2xl mx-auto rounded-lg overflow-hidden border-2 border-border">
        {scanning ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-full"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <motion.div
              animate={{
                y: ["0%", "100%", "0%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 left-0 w-full h-1 bg-primary/50"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <QrCode className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="p-4 rounded-lg bg-card border border-border">
        <h3 className="font-medium mb-2">Último código escaneado:</h3>
        <p className="text-muted-foreground">Ningún código escaneado aún</p>
      </div>
    </div>
  )
}
