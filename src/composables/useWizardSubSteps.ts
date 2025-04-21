import { ref } from "vue"
import type { Component } from "vue"

// Interfaz para la configuración de un sub-paso
export interface SubStep {
  title: string
  component: Component
}

// Interfaz para la configuración de sub-pasos por paso principal
export interface WizardSubStepsConfig {
  [stepKey: string]: SubStep[]
}

export function useWizardSubSteps(config: WizardSubStepsConfig) {
  // Estado para el índice del sub-paso actual
  const currentSubStepIndex = ref(0)

  /**
   * Verifica si un paso principal tiene sub-pasos
   * @param stepKey - Clave del paso principal
   * @returns true si el paso tiene sub-pasos, false en caso contrario
   */
  const hasSubSteps = (stepKey: string): boolean => {
    // Verificamos que exista la clave en la configuración y que tenga elementos
    return !!config[stepKey] && config[stepKey].length > 0
  }

  /**
   * Obtiene los sub-pasos para un paso principal específico
   * @param stepKey - Clave del paso principal
   * @returns Array de sub-pasos o array vacío si no hay sub-pasos
   */
  const getSubSteps = (stepKey: string): SubStep[] => {
    return config[stepKey] || []
  }

  /**
   * Obtiene el número total de sub-pasos para un paso principal
   * @param stepKey - Clave del paso principal
   * @returns Número total de sub-pasos
   */
  const getTotalSubSteps = (stepKey: string): number => {
    return getSubSteps(stepKey).length
  }

  /**
   * Obtiene el sub-paso actual para un paso principal
   * @param stepKey - Clave del paso principal
   * @returns El sub-paso actual o null si no hay sub-pasos
   */
  const getCurrentSubStep = (stepKey: string): SubStep | null => {
    const subSteps = getSubSteps(stepKey)
    return subSteps[currentSubStepIndex.value] || null
  }

  /**
   * Avanza al siguiente sub-paso
   * @param stepKey - Clave del paso principal
   * @returns true si se han completado todos los sub-pasos, false en caso contrario
   */
  const nextSubStep = (stepKey: string): boolean => {
    const totalSubSteps = getTotalSubSteps(stepKey)

    // Si hay más sub-pasos, avanzamos al siguiente
    if (currentSubStepIndex.value < totalSubSteps - 1) {
      currentSubStepIndex.value++
      return false // No hemos terminado todos los sub-pasos
    }

    // Hemos terminado todos los sub-pasos, resetear y continuar
    currentSubStepIndex.value = 0
    return true // Indica que hemos completado todos los sub-pasos
  }

  /**
   * Retrocede al sub-paso anterior
   * @param stepKey - Clave del paso principal
   * @returns true si se debe ir al paso principal anterior, false en caso contrario
   */
  const prevSubStep = (stepKey: string): boolean => {
    // Si no estamos en el primer sub-paso, retrocedemos
    if (currentSubStepIndex.value > 0) {
      currentSubStepIndex.value--
      return false // No necesitamos ir al paso principal anterior
    }

    // Estamos en el primer sub-paso, debemos ir al paso principal anterior
    return true // Indica que debemos ir al paso principal anterior
  }

  /**
   * Resetea el índice del sub-paso a 0
   */
  const resetSubStep = () => {
    currentSubStepIndex.value = 0
  }

// Inserta un nuevo sub-paso en una posición específica
  const insertSubStep = (stepKey: string, position: number, subStep: SubStep): boolean => {
    // Verificamos que exista la clave en la configuración
    if (!config[stepKey]) {
      console.error(`No existe el paso principal con clave ${stepKey}`)
      return false
    }

    // Verificamos que el componente del sub-paso no sea null
    if (!subStep.component) {
      console.error("El componente del sub-paso no puede ser null")
      return false
    }

    // Simplificación: Verificamos directamente si la posición es válida
    // Eliminamos la lógica redundante de búsqueda de "Tipo de Emprendimiento"
    if (position < 0 || position > config[stepKey].length) {
      console.error(`Posición inválida: ${position}`)
      return false
    }

    // Insertamos el sub-paso en la posición especificada
    config[stepKey].splice(position, 0, subStep)

    console.log(`Sub-paso "${subStep.title}" insertado en posición ${position} en el paso ${stepKey}`)
    return true
  }

  return {
    currentSubStepIndex,
    hasSubSteps,
    getSubSteps,
    getTotalSubSteps,
    getCurrentSubStep,
    nextSubStep,
    prevSubStep,
    resetSubStep,
    insertSubStep,
  }
}
