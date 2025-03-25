
import React, { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

const AuthContext = createContext()

const DEFAULT_ADMIN = {
  id: "00000000-0000-0000-0000-000000000000",
  email: "admin",
  name: "Administrador",
  role: "admin",
  password_hash: "ag724jp",
  is_2fa_enabled: false
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      // Verificar si es el usuario admin por defecto
      if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password_hash) {
        setUser(DEFAULT_ADMIN)
        localStorage.setItem('user', JSON.stringify(DEFAULT_ADMIN))
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema",
        })
        return true
      }

      // Si no es el admin por defecto, buscar en la base de datos
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema",
        })
        return true
      }
      
      throw new Error('Credenciales inválidas')
    } catch (error) {
      console.error('Error logging in:', error)
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Credenciales inválidas",
      })
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    })
  }

  const updateLastScreen = async (screen) => {
    if (!user) return

    try {
      // Si es el admin por defecto, solo actualizar en localStorage
      if (user.id === DEFAULT_ADMIN.id) {
        const updatedUser = { ...user, last_screen: screen }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        return
      }

      // Si no, actualizar en la base de datos
      const { error } = await supabase
        .from('users')
        .update({ last_screen: screen })
        .eq('id', user.id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating last screen:', error)
    }
  }

  if (loading) {
    return null
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLastScreen }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
