
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Globe, Monitor, Folder } from "lucide-react"
import { useTimezone } from "@/contexts/TimezoneContext"

export function AuditLog() {
  const { formatDate } = useTimezone()
  const [logs] = useState([
    {
      id: 1,
      user: "admin",
      action: "login",
      timestamp: "2024-03-24 10:30:00",
      ip: "192.168.1.1",
      browser: "Chrome",
      module: "Productos"
    },
    {
      id: 2,
      user: "admin",
      action: "view",
      timestamp: "2024-03-24 10:35:00",
      ip: "192.168.1.1",
      browser: "Chrome",
      module: "Configuración"
    }
  ])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Registro de Actividad</h3>
        <p className="text-muted-foreground">
          Historial de accesos y acciones en el sistema
        </p>
      </div>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{log.user}</span>
              <span className="text-sm text-muted-foreground">{log.action}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(log.timestamp)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{log.ip}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span>{log.browser}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Folder className="h-4 w-4 text-muted-foreground" />
                <span>{log.module}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
