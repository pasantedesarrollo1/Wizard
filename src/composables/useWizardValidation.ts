import { computed } from 'vue'
import { useWizardStore } from '@/stores/wizardStore'
import { useRoute } from 'vue-router'

export function useWizardValidation() {
  // Obtenemos la instancia del store
  const wizardStore = useWizardStore()
  const route = useRoute()

  // Obtener los parámetros de la ruta
  const currentStep = computed(() => {
    const stepParam = route.params.step
    return stepParam ? parseInt(stepParam as string, 10) : 0
  })

  const currentSubStepIndex = computed(() => {
    const subStepParam = route.params.subStep
    return subStepParam ? parseInt(subStepParam as string, 10) : 0
  })

// Verifica si el botón "Anterior" debe estar deshabilitado
  const shouldDisablePreviousButton = computed(() => {
    // Obtener la clave del paso actual
    const currentStepKey = wizardStore.getCurrentWizardState.currentStep

    // Deshabilitar si estamos en el primer paso y primer subpaso
    const isFirstStepAndSubStep = currentStep.value === 0 && currentSubStepIndex.value === 0
    
    // Deshabilitar si estamos en el paso "personal-info" (independientemente del subpaso)
    const isPersonalInfoStep = currentStepKey === "personal-info"
    
    // Retornar true si cualquiera de las condiciones se cumple
    return isFirstStepAndSubStep || isPersonalInfoStep
  })

  /**
   * Verifica si el botón "Siguiente" debe estar deshabilitado
   * @param currentStepKey - Clave del paso actual
   * @param currentSubStepIndex - Índice del subpaso actual
   * @returns boolean - true si el botón debe estar deshabilitado
   */
  const shouldDisableNextButton = computed(() => {
    // Obtener la clave del paso actual
    const currentStepKey = wizardStore.getCurrentWizardState.currentStep
    const currentSubStepIndexValue = wizardStore.getCurrentWizardState.currentSubStep - 1

    // Verificar según el paso actual
    if (currentStepKey === "data-sales") {
      return validateDataSalesStep(currentSubStepIndexValue)
    } else if (currentStepKey === "personal-info") {
      return validatePersonalInfoStep(currentSubStepIndexValue)
    } else if (currentStepKey === "config-company") {
      // Para el paso config-company, verificar según el subpaso
      if (currentSubStepIndexValue === 0) {
        // Para el subpaso 0 (RUC validation)
        return !wizardStore.getCurrentWizardState.rucValidated
      } else if (currentSubStepIndexValue === 1) {
        // Para el subpaso 1 (indexConfiCompanySS2)
        return validateConfigCompanyStep(currentSubStepIndexValue)
      }
    } else if (currentStepKey === "create-company") {
      // Para el paso create-company
      return validateCreateCompanyStep()
    }
    
    // Para otros pasos, el botón está habilitado por defecto
    return false
  })

  /**
   * Valida el paso de creación de la empresa (indexCreateCompanySS1)
   * @returns boolean - true si el botón debe estar deshabilitado
   */
  const validateCreateCompanyStep = (): boolean => {
    // Obtener los datos de companyCreation y branchAndPOS del store
    const companyCreation = wizardStore.getStepData("companyCreation")
    const branchAndPOS = wizardStore.getStepData("branchAndPOS")

    // Verificar si los datos existen
    if (!companyCreation || !branchAndPOS || !branchAndPOS.branch || !branchAndPOS.pointOfSale) {
      return true // Deshabilitar si faltan datos
    }

    // Verificar que los campos requeridos en companyCreation tengan valor
    const hasCompanyCreationData =
      companyCreation.ruc &&
      companyCreation.name &&
      companyCreation.legalName &&
      companyCreation.address &&
      companyCreation.phone &&
      companyCreation.businessEmail

    // Verificar que los campos requeridos en branchAndPOS tengan valor
    const hasBranchAndPOSData =
      branchAndPOS.branch.commercialName &&
      branchAndPOS.branch.idBranch &&
      branchAndPOS.branch.name &&
      branchAndPOS.branch.address &&
      branchAndPOS.branch.phone &&
      branchAndPOS.branch.email &&
      branchAndPOS.pointOfSale.idPos &&
      branchAndPOS.pointOfSale.name

    // Retornar true (deshabilitar botón) si falta algún dato
    return !(hasCompanyCreationData && hasBranchAndPOSData)
  }

// Valida el paso de configuración de la empresa (subpaso 1 - indexConfiCompanySS2)
  const validateConfigCompanyStep = (subStepIndex: number): boolean => {
    // Solo validamos el subpaso 1 (indexConfiCompanySS2)
    if (subStepIndex === 1) {
      // Obtener los datos de configuración de la empresa
      const companyConfig = wizardStore.getStepData("companyConfig")
      
      if (!companyConfig) return false
      
      // Verificar la condición 1: Si isArtisan es true y artisanNumber está vacío
      const isArtisanInvalid = companyConfig.artisan?.isArtisan === true && 
                              (!companyConfig.artisan?.artisanNumber || 
                               companyConfig.artisan?.artisanNumber.trim() === '')
      
      // Verificar la condición 2: Si taxes incluye "5" y taxesFiveNumber está vacío
      const hasFivePercentTax = companyConfig.taxes && 
                               Array.isArray(companyConfig.taxes) && 
                               companyConfig.taxes.includes("5")
      
      const isTaxesFiveInvalid = hasFivePercentTax && 
                                (!companyConfig.taxesFiveNumber || 
                                 companyConfig.taxesFiveNumber.trim() === '')
      
      // Retornar true (deshabilitar botón) si cualquiera de las condiciones se cumple
      return isArtisanInvalid || isTaxesFiveInvalid
    }
    
    // Para otros subpasos, el botón está habilitado por defecto
    return false
  }

// Valida el paso de datos de venta
  const validateDataSalesStep = (subStepIndex: number): boolean => {
    // Obtener los datos de venta del store
    const salesData = wizardStore.getStepData("salesData")
    const consultantData = wizardStore.getStepData("consultant")
    
    // Subpaso 0 (indexSalesDataSS1) - Verificar selección de plan
    if (subStepIndex === 0) {
      return !salesData?.plan
    }
    
    // Subpaso 1 (indexSalesDataSS2) - Verificar condiciones considerando la nueva estructura
    if (subStepIndex === 1) {
      // 1. Verificar si se ha seleccionado un vendedor
      const hasSelectedSeller = consultantData?.sellerId ? true : false
      
      // 2. Verificar si se ha seleccionado un método de pago
      const hasSelectedPaymentMethod = salesData?.paymentMethod ? true : false
      
      // Si no hay método de pago seleccionado, el botón debe estar deshabilitado
      if (!hasSelectedPaymentMethod) {
        return true
      }

      // 3. Verificar campos específicos según el método de pago seleccionado
      const paymentData = salesData?.payment || {}
      const paymentMethod = salesData?.paymentMethod

      // Verificar si se han completado los campos comunes
      const hasAmount = paymentData.amount > 0
      const hasDate = !!paymentData.date

      if (!hasAmount || !hasDate) {
        return true
      }
      
      // Verificar campos específicos según el método de pago
      if (paymentMethod === 'transferencia') {
        // Para transferencia, validar financialInstitution y proofPayment
        const transferData = paymentData.transferData || {}
        const hasFinancialInstitution = !!transferData.financialInstitution
        const hasProofPayment = !!transferData.proofPayment
        
        return !(hasSelectedSeller && hasFinancialInstitution && hasProofPayment)
      } 
      else if (paymentMethod === 'datafast-voucher') {
        // Para datafast, validar typeCard y numberLote
        const datafastData = paymentData.datafastData || {}
        const hasTypeCard = !!datafastData.typeCard
        const hasNumberLote = !!datafastData.numberLote
        
        return !(hasSelectedSeller && hasTypeCard && hasNumberLote)
      }
      
      // Si llegamos aquí, significa que hay un método de pago seleccionado pero no reconocido
      // Por defecto, mantenemos el botón deshabilitado
      return true
    }

    // Para otros subpasos, el botón está habilitado por defecto
    return false
  }

// Valida el paso de información personal
  const validatePersonalInfoStep = (subStepIndex: number): boolean => {
    // Obtener los datos personales del store
    const personalInfo = wizardStore.getStepData("personalInfo")

    // Subpaso 0 (personalInfo) - Verificar que todos los datos estén seleccionados
    if (subStepIndex === 0) {
      // Si se ha seleccionado algún tipo de identificación y un número de identificación
      const hasSelectedTypeId = personalInfo?.identification.type ? true : false
      const hasNumberId = personalInfo?.identification.number ? personalInfo?.identification.number.trim().length > 0 : false

      // Si se ha ingresado algún nombre y apellido
      const hasFirstName = personalInfo?.name.first ? personalInfo?.name.first.trim().length > 0 : false
      const hasLastName = personalInfo?.name.last ? personalInfo?.name.last.trim().length > 0 : false

      // Si se ha ingresado email y teléfono
      const hasEmail = personalInfo?.contact.email ? personalInfo?.contact.email.trim().length > 0 : false
      const hasPhone = personalInfo?.contact.phone ? personalInfo?.contact.phone.trim().length > 0 : false
      
      return !(hasSelectedTypeId && hasNumberId && hasFirstName && hasLastName && hasPhone && hasEmail)
    }

    // Para otros subpasos, el botón está habilitado por defecto
    return false
  }

  return {
    shouldDisablePreviousButton,
    shouldDisableNextButton,
  }
}