import type { WizardInterface } from "@/types/wizardTypes"

// Estado inicial del wizard
export const initialState = (): WizardInterface => ({
  wizardState: {
    type: "",
    currentStep: "",
    currentSubStep: 0,
  },
  formData: {
    personalInfo: {
      identification: {
        type: "",
        number: "",
      },
      name: {
        first: "",
        last: "",
      },
      contact: {
        email: "",
        phone: "",
      },
    },
    consultant: {
      sellerId: "",
      sellerName: "",
    },
    companyCreation: {
      ruc: "",
      name: "",
      legalName: "",
      domain: "",
      address: "",
      phones: "",
      businessEmail: "",
    },
    salesData: {
      // Datos generales de la venta
      plan: "",
      billingFrequency: "",
      paymentMethod: "",
      
      // Datos comunes a todos los métodos de pago
      payment: {
        amount: 0,
        date: "",
        
        // Datos específicos por método de pago
        transferData: {
          financialInstitution: "",
          proofPayment: "",
        },
        datafastData: {
          typeCard: "",
          numberLote: "",
        }
      }
    },
    companyConfig: {
      defaultDocument: {
        type: "",
        searchParameter: "",
      },
      regimeRUC: "",
      categoryRUC: "",
      taxAgent: {
        isAgent: false,
        agentNumber: "",
        accountingRequired: false,
      },
      artisan: {
        isArtisan: false,
        artisanNumber: "",
      },
      taxes: [],
      taxesFiveNumber: "",
      logo: {
        url: "",
        fileName: "",
      },
    },
    branchAndPOS: {
      branch: {
        idBranch: "",
        name: "",
        commercialName: "",
        address: "",
        phone: "",
        email: "",
        isTouristEstablishment: false,
        delayedDispatch: false,
      },
      pointOfSale: {
        idPos: "",
        name: "",
      },
    },
  },
})
