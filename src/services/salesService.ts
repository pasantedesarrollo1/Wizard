import axios from "axios"

// Interfaz para los vendedores
export interface Vendedor {
  id: number
  nombre: string
}

// Instancia de axios
const api = axios.create({
  baseURL: "http://localhost:3002",
})

// Servicio para obtener los vendedores
export const salesService = {
  // Obtener lista de vendedores
  getVendedores: async (): Promise<Vendedor[]> => {
    // Hacemos la petición directamente al endpoint /sales
    const response = await api.get<Vendedor[]>("/sales")
    return response.data
  }
}