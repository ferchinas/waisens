
import React, { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X, ChevronUp, ChevronDown, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DebugConsole() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState([])
  const [copied, setCopied] = useState(false)

  // Solo mostrar para admin
  if (user?.role !== "admin") return null

  useEffect(() => {
    const originalConsoleDebug = console.debug
    const originalConsoleError = console.error

    console.debug = (...args) => {
      setLogs(prev => [...prev, { type: "debug", message: args.join(" "), timestamp: new Date() }])
      originalConsoleDebug.apply(console, args)
    }

    console.error = (...args) => {
      setLogs(prev => [...prev, { type: "error", message: args.join(" "), timestamp: new Date() }])
      originalConsoleError.apply(console, args)
    }

    return () => {
      console.debug = originalConsoleDebug
      console.error = originalConsoleError
    }
  }, [])

  const handleCopyLogs = () => {
    const logText = logs
      .map(log => `[${log.timestamp.toLocaleTimeString()}] ${log.type.toUpperCase()}: ${log.message}`)
      .join("\n")
    
    navigator.clipboard.writeText(logText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        className="mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Terminal className="h-4 w-4 mr-2" />
        Consola de Depuración
        {isOpen ? (
          <ChevronDown className="h-4 w-4 ml-2" />
        ) : (
          <ChevronUp className="h-4 w-4 ml-2" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-card border rounded-lg shadow-lg w-96 max-h-96 overflow-hidden"
          >
            <div className="p-2 border-b flex items-center justify-between bg-muted">
              <h3 className="text-sm font-medium">Registros de Depuración</h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={handleCopyLogs}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={clearLogs}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="overflow-auto p-2 space-y-2 max-h-80">
              {logs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay registros disponibles
                </p>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className={`text-xs p-2 rounded ${
                      log.type === "error"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {log.type.toUpperCase()}
                      </span>
                      <span className="text-muted-foreground">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-1 break-all">{log.message}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
