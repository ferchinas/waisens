
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/contexts/ThemeContext"
import { useTimezone } from "@/contexts/TimezoneContext"
import { Sun, Moon, FileSpreadsheet, Clock } from "lucide-react"

const TIMEZONES = [
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (GMT-3)" },
  { value: "America/Santiago", label: "Santiago (GMT-4)" },
  { value: "America/Bogota", label: "Bogotá (GMT-5)" },
  { value: "America/Mexico_City", label: "Ciudad de México (GMT-6)" },
  { value: "Europe/Madrid", label: "Madrid (GMT+1)" },
]

export function SystemPreferences() {
  const { theme, toggleTheme } = useTheme()
  const { timezone, updateTimezone } = useTimezone()
  const { toast } = useToast()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [googleSheetId, setGoogleSheetId] = useState("")

  const handleGoogleSheetsSave = () => {
    toast({
      title: "Configuración guardada",
      description: "La integración con Google Sheets ha sido actualizada"
    })
  }

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
    toast({
      title: "Autenticación en dos pasos",
      description: twoFactorEnabled
        ? "La autenticación en dos pasos ha sido desactivada"
        : "La autenticación en dos pasos ha sido activada"
    })
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">Zona Horaria</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Clock className="h-5 w-5" />
            <div>
              <p className="font-medium">Zona Horaria del Sistema</p>
              <p className="text-sm text-muted-foreground">
                Configura la zona horaria para todas las fechas y horas
              </p>
            </div>
          </div>
          <select
            value={timezone}
            onChange={(e) => updateTimezone(e.target.value)}
            className="px-3 py-2 bg-background border rounded-md"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">Tema</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <div>
              <p className="font-medium">Tema {theme === "light" ? "Claro" : "Oscuro"}</p>
              <p className="text-sm text-muted-foreground">
                Cambia entre tema claro y oscuro
              </p>
            </div>
          </div>
          <Button onClick={toggleTheme} variant="outline">
            Cambiar tema
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">Seguridad</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium">Autenticación en dos pasos</p>
            <p className="text-sm text-muted-foreground">
              Añade una capa extra de seguridad a tu cuenta
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={handleTwoFactorToggle}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">Integración con Google Sheets</h3>
        <div className="p-4 border rounded-lg space-y-4">
          <div className="flex items-center space-x-4">
            <FileSpreadsheet className="h-5 w-5" />
            <div>
              <p className="font-medium">Conectar con Google Sheets</p>
              <p className="text-sm text-muted-foreground">
                Configura la sincronización con tu hoja de cálculo
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              ID de la hoja de cálculo
            </label>
            <input
              type="text"
              value={googleSheetId}
              onChange={(e) => setGoogleSheetId(e.target.value)}
              placeholder="Ingresa el ID de tu Google Sheet"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <Button onClick={handleGoogleSheetsSave}>
            Guardar configuración
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
