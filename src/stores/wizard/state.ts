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
      roleInCompany: "",
    },
    consultant: {
      sellerId: "",
      sellerName: "",
    },
    companyCreation: {
      name: "",
      legalName: "",
      ticketEmail: "",
      domain: "",
      address: "",
      phones: {
        number: "",
      },
      businessEmail: "",
    },
    salesData: {
      proofPayment: "",
      billingFrequency: "",
      paymentMethod: "",
      plan: "",
      
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
      inventoryManagement: false,
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
        phone: {
          number: "",
        },
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
