
import React, { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

const TimezoneContext = createContext()

export function TimezoneProvider({ children }) {
  const [timezone, setTimezone] = useState(() => {
    const stored = localStorage.getItem("timezone")
    return stored || "America/Argentina/Buenos_Aires"
  })
  const { toast } = useToast()

  useEffect(() => {
    localStorage.setItem("timezone", timezone)
  }, [timezone])

  const updateTimezone = (newTimezone) => {
    setTimezone(newTimezone)
    toast({
      title: "Zona horaria actualizada",
      description: "Se ha actualizado la configuración de zona horaria",
    })
  }

  const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleString("es-AR", {
      timeZone: timezone,
      dateStyle: "medium",
      timeStyle: "short",
    })
  }

  return (
    <TimezoneContext.Provider value={{ timezone, updateTimezone, formatDate }}>
      {children}
    </TimezoneContext.Provider>
  )
}

export const useTimezone = () => {
  const context = useContext(TimezoneContext)
  if (!context) {
    throw new Error("useTimezone debe usarse dentro de TimezoneProvider")
  }
  return context
}
