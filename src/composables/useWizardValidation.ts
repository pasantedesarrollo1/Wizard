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

  /**
   * Verifica si el botón "Anterior" debe estar deshabilitado
   * @param currentStep - Índice del paso actual
   * @param currentStepKey - Clave del paso actual
   * @param currentSubStepIndex - Índice del subpaso actual
   * @returns boolean - true si el botón debe estar deshabilitado
   */
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
    } 
    
    // Para otros pasos, el botón está habilitado por defecto
    return false
  })

  /**
   * Valida el paso de datos de venta
   * @param subStepIndex - Índice del subpaso actual
   * @returns boolean - true si el botón debe estar deshabilitado
   */
  const validateDataSalesStep = (subStepIndex: number): boolean => {
    // Obtener los datos de venta del store
    const salesData = wizardStore.getStepData("salesData")
    const consultantData = wizardStore.getStepData("consultant")
    
    // Subpaso 0 (indexSalesDataSS1) - Verificar selección de plan
    if (subStepIndex === 0) {
      return !salesData?.plan
    }
    
    // Subpaso 1 (indexSalesDataSS2) - Verificar las tres condiciones
    if (subStepIndex === 1) {
      // Verificar si se ha seleccionado un vendedor
      const hasSelectedSeller = consultantData?.sellerId ? true : false
      
      // Verificar si se ha ingresado un comprobante de pago
      const hasProofPayment = salesData?.proofPayment ? salesData.proofPayment.trim().length > 0 : false
      
      // Verificar si se ha seleccionado un método de pago
      const hasSelectedPaymentMethod = salesData?.paymentMethod ? true : false
      
      // El botón debe estar deshabilitado si alguna de las condiciones no se cumple
      return !(hasSelectedSeller && hasProofPayment && hasSelectedPaymentMethod)
    }

    // Para otros subpasos, el botón está habilitado por defecto
    return false
  }

  /**
   * Valida el paso de información personal
   * @param subStepIndex - Índice del subpaso actual
   * @returns boolean - true si el botón debe estar deshabilitado
   */
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

  /**
   * Función para agregar validaciones personalizadas para nuevos pasos
   * @param stepKey - Clave del paso a validar
   * @param validationFn - Función de validación que retorna true si el botón debe estar deshabilitado
   */
  // const addCustomStepValidation = (stepKey: string, validationFn: (subStepIndex: number) => boolean) => {
  //   // Esta función permitiría extender las validaciones para nuevos pasos
  //   // en una implementación más completa
  //   console.log(`Agregada validación personalizada para el paso: ${stepKey}`)
  // }

  return {
    shouldDisablePreviousButton,
    shouldDisableNextButton,
    // addCustomStepValidation
  }
}