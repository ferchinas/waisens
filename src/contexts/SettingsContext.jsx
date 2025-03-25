
import React, { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"

const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const { user } = useAuth()
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      loadSettings()
    }
  }, [user])

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setSettings(data)
      } else {
        // Create default settings if none exist
        const defaultSettings = {
          user_id: user.id,
          theme: 'claro',
          timezone: 'America/Argentina/Buenos_Aires',
          is_2fa_enabled: false
        }

        const { data: newSettings, error: createError } = await supabase
          .from('settings')
          .insert([defaultSettings])
          .select()
          .single()

        if (createError) throw createError
        setSettings(newSettings)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las configuraciones",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (newSettings) => {
    try {
      const { error } = await supabase
        .from('settings')
        .update(newSettings)
        .eq('user_id', user.id)

      if (error) throw error

      setSettings({ ...settings, ...newSettings })
      toast({
        title: "Configuración actualizada",
        description: "Los cambios han sido guardados",
      })
    } catch (error) {
      console.error('Error updating settings:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron guardar los cambios",
      })
    }
  }

  if (loading) {
    return null
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings debe usarse dentro de SettingsProvider")
  }
  return context
}
