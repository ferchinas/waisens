
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { motion } from "framer-motion"
import { 
  Sun, 
  Moon, 
  LogOut, 
  Package, 
  BarChart2, 
  QrCode, 
  Settings,
  ChevronDown,
  ChevronUp,
  Users
} from "lucide-react"

export function Sidebar({ onNavigate, currentView }) {
  const { logout, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const isAdmin = user?.role === "admin"

  return (
    <div className="w-64 h-full bg-card border-r border-border flex flex-col">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-foreground">WAISENS</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => onNavigate("products")}
        >
          <Package className="mr-2 h-4 w-4" />
          Productos
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => onNavigate("overview")}
        >
          <BarChart2 className="mr-2 h-4 w-4" />
          Vista General
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => onNavigate("scanner")}
        >
          <QrCode className="mr-2 h-4 w-4" />
          Escanear
        </Button>
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-between"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <div className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </div>
            {settingsOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {settingsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pl-6 space-y-1"
            >
              {isAdmin && (
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${
                    currentView === "admin" ? "bg-accent" : ""
                  }`}
                  onClick={() => onNavigate("admin")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Panel de Admin
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Moon className="mr-2 h-4 w-4" />
          ) : (
            <Sun className="mr-2 h-4 w-4" />
          )}
          Tema {theme === "light" ? "Oscuro" : "Claro"}
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
