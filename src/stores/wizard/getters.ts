import type { WizardInterface, FormData } from "@/types/wizardTypes"

export const getters = {
  /**
   * Obtener datos de un paso específico
   * @returns Función que devuelve los datos de un paso específico
   */
  getStepData: (state: WizardInterface) => (step: string) => {
    return state.formData[step]
  },

  /**
   * Obtener los datos completos del formulario
   * @returns Datos completos del formulario
   */
  getAllFormData: (state: WizardInterface): FormData => state.formData,

  /**
   * Obtener el estado actual del wizard
   * @returns Estado actual del wizard
   */
  getCurrentWizardState: (state: WizardInterface) => state.wizardState,

  /**
   * Verificar si un paso está completo
   * @returns Función que verifica si un paso está completo
   */
  isStepComplete:
    (state: WizardInterface) =>
    (step: string): boolean => {
      // Implementar lógica para verificar si un paso está completo
      // Esta es una implementación de ejemplo
      const stepData = state.formData[step]
      if (!stepData) return false

      // Verificar si todos los campos requeridos tienen valor
      // Esta lógica dependerá de tus requisitos específicos
      return Object.values(stepData).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          (typeof value !== "object" || Object.keys(value).length > 0),
      )
    },
}
