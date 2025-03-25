
import React from "react"
import { Login } from "@/components/auth/Login"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { useAuth } from "@/contexts/AuthContext"

export function AppRouter() {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return <Dashboard />
}
