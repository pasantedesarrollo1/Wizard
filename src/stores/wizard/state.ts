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
      phone: "",
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
      defaultDocument:"",
      searchParameter: "",
      regimeRUC: "",
      categoryRUC: "",
      taxAgent: {
        isAgent: false,
        accountingRequired: false,
      },
      artisan: {
        isArtisan: false,
        artisanNumber: "",
      },
      taxes: [],
      taxesFiveNumber: "",
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
        logo: {
          url: "",
          fileName: "",
        },
      },
      pointOfSale: {
        idPos: "",
        name: "",
      },
    },
  },
})
