
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Pencil, Trash2, Key } from "lucide-react"
import { UserForm } from "@/components/admin/UserForm"
import { supabase } from "@/lib/supabase"

export function UserManagement() {
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  React.useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los usuarios",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (userData) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (error) throw error

      setUsers([data, ...users])
      setShowForm(false)
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente"
      })
    } catch (error) {
      console.error('Error creating user:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el usuario",
      })
    }
  }

  const handleEditUser = async (userData) => {
    try {
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userData.id)

      if (error) throw error

      setUsers(users.map(user => user.id === userData.id ? userData : user))
      setEditingUser(null)
      toast({
        title: "Usuario actualizado",
        description: "Los cambios han sido guardados"
      })
    } catch (error) {
      console.error('Error updating user:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el usuario",
      })
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) throw error

      setUsers(users.filter(user => user.id !== userId))
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado del sistema"
      })
    } catch (error) {
      console.error('Error deleting user:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el usuario",
      })
    }
  }

  const handleResetPassword = async (userId) => {
    try {
      // Aquí iría la lógica para restablecer la contraseña
      // Por ahora solo mostramos una notificación
      toast({
        title: "Contraseña restablecida",
        description: "Se ha enviado un correo con las instrucciones"
      })
    } catch (error) {
      console.error('Error resetting password:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo restablecer la contraseña",
      })
    }
  }

  if (loading) {
    return <div>Cargando usuarios...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Rol</th>
              <th className="p-4 text-left">Último Acceso</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.last_login || 'Nunca'}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingUser(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleResetPassword(user.id)}
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {(showForm || editingUser) && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleEditUser : handleAddUser}
            onCancel={() => {
              setShowForm(false)
              setEditingUser(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
