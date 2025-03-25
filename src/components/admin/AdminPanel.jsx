
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/UserManagement"
import { SystemPreferences } from "@/components/admin/SystemPreferences"
import { AuditLog } from "@/components/admin/AuditLog"
import { motion } from "framer-motion"

export function AdminPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-foreground">Panel de Administración</h2>
        <p className="text-muted-foreground">Gestiona usuarios y configura el sistema</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="audit">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <SystemPreferences />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <AuditLog />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
