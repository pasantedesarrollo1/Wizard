import axios from "axios"

// Instancia básica de axios
const api = axios.create({
  baseURL: "http://localhost:3001",
})

// Interfaz básica para los datos del wizard
interface WizardData {
  proofPayment: string
  // Puedes agregar otros campos si los necesitas en el futuro
}

// Servicio simplificado con tipos
export const wizardService = {
  // Obtener el comprobante de pago
  getProofPayment: async (): Promise<string> => {
    const response = await api.get<WizardData>("/wizardData")
    return response.data.proofPayment
  },

  // Actualizar el comprobante de pago
  updateProofPayment: async (proofPayment: string): Promise<void> => {
    const response = await api.get<WizardData>("/wizardData")
    const currentData = response.data
    const updatedData = { ...currentData, proofPaymanet: proofPayment }
    await api.put("/wizardData", updatedData)
  },
}
