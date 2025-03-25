
import React from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { TimezoneProvider } from "@/contexts/TimezoneContext"
import { SettingsProvider } from "@/contexts/SettingsContext"
import { AppRouter } from "@/routes/AppRouter"

export function App() {
  return (
    <ThemeProvider>
      <TimezoneProvider>
        <AuthProvider>
          <SettingsProvider>
            <AppRouter />
          </SettingsProvider>
        </AuthProvider>
      </TimezoneProvider>
    </ThemeProvider>
  )
}
