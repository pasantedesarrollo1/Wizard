export interface WizardInterface {
    wizardState: {
      type: string
      currentStep: string
      currentSubStep: number
    }
    formData: {
      personalInfo: {
        identification: {
          type: string
          number: string
        }
        name: {
          first: string
          last: string
        }
        contact: {
          email: string
          phone: {
            landline: string
            mobile: string
          }
        }
        roleInCompany: string
      }
      consultant: {
        sellerId: string
        sellerName: string
      }
      companyCreation: {
        name: string
        legalName: string
        ticketEmail: string
        domain: string
        address: string
        phones: {
          number: string
        }
        businessEmail: string
      }
      salesData: {
        proofPayment: string
        billingFrequency: string
        paymentMethod: string
        plans: {
          commerces: string
        }
      }
      companyConfig: {
        defaultDocument: {
          type: string
          searchParameter: string
        }
        regimeRUC: string
        categoryRUC: string
        taxAgent: {
          isAgent: boolean
          agentNumber: string
          accountingRequired: boolean
        }
        artisan: {
          isArtisan: boolean
          artisanNumber: string
        }
        inventoryManagement: boolean
        taxes: string[]
        taxesFiveNumber: string
        logo: {
          url: string
          fileName: string
        }
      }
      branchAndPOS: {
        branch: {
          idBranch: string
          name: string
          commercialName: string
          address: string
          phone: {
            number: string
          }
          email: string
          isTouristEstablishment: boolean
          delayedDispatch: boolean
        }
        pointOfSale: {
          idPos: string
          name: string
        }
      }
      [key: string]: any // Índice de firma para permitir acceso dinámico
    }
  }
  