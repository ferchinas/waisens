
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductsTable } from "@/components/products/ProductsTable"
import { useToast } from "@/components/ui/use-toast"

export function ProductsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({})
  const { toast } = useToast()

  const handleImportFromSheets = () => {
    toast({
      title: "Importación iniciada",
      description: "Conectando con Google Sheets...",
    })
    // Aquí irá la lógica de importación
  }

  const handleExportToSheets = () => {
    toast({
      title: "Exportación iniciada",
      description: "Preparando datos para Google Sheets...",
    })
    // Aquí irá la lógica de exportación
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" onClick={handleImportFromSheets} className="flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" onClick={handleExportToSheets} className="flex-1 sm:flex-none">
            <Upload className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </motion.div>

      <ProductsTable searchTerm={searchTerm} filters={filters} />
    </div>
  )
}
