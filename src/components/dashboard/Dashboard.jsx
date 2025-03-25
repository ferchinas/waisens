
import React, { useState } from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminPanel } from "@/components/admin/AdminPanel"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState("welcome")

  const renderContent = () => {
    switch (currentView) {
      case "admin":
        return <AdminPanel />
      default:
        return (
          <h2 className="text-3xl font-bold text-foreground">
            Bienvenido a WAISENS
          </h2>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-screen"
          >
            <Sidebar onNavigate={setCurrentView} currentView={currentView} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">WAISENS</h1>
        </header>

        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-8 overflow-y-auto"
        >
          {renderContent()}
        </motion.main>
      </div>
    </div>
  )
}
