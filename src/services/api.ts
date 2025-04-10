import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Tipos para los datos
export interface WizardData {
  wizardType: string;
  currentStep: number;
  proofPaymanet: string;
  personalInfo: {
    identification: {
      type: string;
      number: string;
    };
    name: {
      first: string;
      last: string;
    };
    contact: {
      email: string;
      phone: string;
      whatsapp: string;
    };
    roleInCompany: string;
  };
  consultant: {
    sellerId: string;
  };
  companyCreation: {
    name: string;
    ruc: string;
    legalName: string;
    // ... otros campos
  };
  // ... otros campos
}

// Servicio para obtener los datos del wizard
export const wizardService = {
  // Obtener todos los datos del wizard
  getWizardData: async (): Promise<WizardData> => {
    const response = await api.get('/wizardData');
    return response.data;
  },
  
  // Obtener solo el número de comprobante de pago
  getProofPayment: async (): Promise<string> => {
    const response = await api.get('/wizardData');
    return response.data.proofPaymanet;
  },
  
  // Actualizar el número de comprobante de pago
  updateProofPayment: async (proofPayment: string): Promise<WizardData> => {
    const currentData = await wizardService.getWizardData();
    const updatedData = { ...currentData, proofPaymanet: proofPayment };
    const response = await api.put('/wizardData', updatedData);
    return response.data;
  }
};

export default api;