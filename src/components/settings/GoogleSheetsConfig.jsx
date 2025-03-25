
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FileSpreadsheet, Link2, CheckCircle, XCircle } from "lucide-react"

export function GoogleSheetsConfig() {
  const [connected, setConnected] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const { toast } = useToast()

  const handleConnect = () => {
    // Aquí irá la lógica de conexión con Google OAuth
    toast({
      title: "Conectando con Google Sheets",
      description: "Iniciando proceso de autorización..."
    })
  }

  const handleSelectFile = () => {
    // Aquí irá la lógica de selección de archivo
    setSelectedFile({
      name: "Catálogo de Productos",
      lastSync: new Date().toLocaleString()
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Configuración de Google Sheets</h2>
        <Button
          variant={connected ? "destructive" : "default"}
          onClick={() => setConnected(!connected)}
        >
          {connected ? (
            <>
              <XCircle className="h-4 w-4 mr-2" />
              Desconectar
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4 mr-2" />
              Conectar
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="p-6 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${connected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              <Link2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Estado de Conexión</h3>
              <p className="text-sm text-muted-foreground">
                {connected ? "Conectado a Google Sheets" : "No conectado"}
              </p>
            </div>
            {connected && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
          </div>
        </div>

        {connected && (
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Archivo Seleccionado</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedFile ? selectedFile.name : "Ningún archivo seleccionado"}
                </p>
              </div>
              <Button
                variant="outline"
                className="ml-auto"
                onClick={handleSelectFile}
              >
                Cambiar
              </Button>
            </div>
            {selectedFile && (
              <div className="mt-4 text-sm text-muted-foreground">
                Última sincronización: {selectedFile.lastSync}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
