
import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpDown, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

// Datos de ejemplo - Serán reemplazados por datos reales de Google Sheets
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    categoria: "Electrónica",
    marca: "TechBrand",
    codigo_interno: "E001",
    codigo_barras: "123456789",
    precio_compra: 100,
    precio_final: 150,
    stock: 50,
    ubicacion: "A-1",
    descripcion: "Producto de ejemplo 1"
  },
  {
    id: 2,
    categoria: "Hogar",
    marca: "HomeBrand",
    codigo_interno: "H001",
    codigo_barras: "987654321",
    precio_compra: 200,
    precio_final: 300,
    stock: 30,
    ubicacion: "B-2",
    descripcion: "Producto de ejemplo 2"
  }
]

export function ProductsTable({ searchTerm, filters }) {
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [products, setProducts] = useState(SAMPLE_PRODUCTS)

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true
    
    return Object.values(product).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-md border border-border"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button variant="ghost" size="sm" onClick={() => handleSort("codigo_interno")}>
                  Código
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button variant="ghost" size="sm" onClick={() => handleSort("descripcion")}>
                  Descripción
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button variant="ghost" size="sm" onClick={() => handleSort("categoria")}>
                  Categoría
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button variant="ghost" size="sm" onClick={() => handleSort("precio_final")}>
                  Precio
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button variant="ghost" size="sm" onClick={() => handleSort("stock")}>
                  Stock
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{product.codigo_interno}</td>
                <td className="px-4 py-3 text-sm">{product.descripcion}</td>
                <td className="px-4 py-3 text-sm">{product.categoria}</td>
                <td className="px-4 py-3 text-sm">${product.precio_final}</td>
                <td className="px-4 py-3 text-sm">{product.stock}</td>
                <td className="px-4 py-3 text-sm text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
