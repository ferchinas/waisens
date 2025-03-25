
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Aquí iría la lógica real de envío de correo
    // Por ahora solo simulamos el proceso
    toast({
      title: "Correo enviado",
      description: "Se han enviado las instrucciones de recuperación a tu correo",
    })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg"
      >
        <button
          onClick={onBack}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio de sesión
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Recuperar contraseña
          </h2>
          <p className="mt-2 text-muted-foreground">
            {submitted
              ? "Revisa tu correo para continuar"
              : "Ingresa tu correo para recibir instrucciones"}
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <CheckCircle className="mx-auto h-12 w-12 text-primary" />
            <p className="text-sm text-muted-foreground">
              Si existe una cuenta asociada a {email}, recibirás un correo con las
              instrucciones para restablecer tu contraseña.
            </p>
            <Button onClick={onBack} className="w-full">
              Volver al inicio
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Enviar instrucciones
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
