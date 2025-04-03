/**
 * Tipos para la estructura de los wizards
 */

// Tipo para un paso individual del wizard
export interface WizardStep {
    id: string // Identificador único del paso
    title: string // Título que se muestra en la navegación
    description?: string // Descripción opcional
    isCommon: boolean // Indica si es un paso común entre wizards
    order: number // Orden del paso en el flujo
    icon?: string // Icono opcional para el paso
  }
  
  // Tipo para un wizard completo
  export interface Wizard {
    id: string // Identificador único del wizard
    name: string // Nombre del wizard
    description?: string // Descripción opcional
    steps: WizardStep[] // Pasos específicos de este wizard
    currentStepIndex: number // Índice del paso actual
  }
  
  // Tipo para el estado global de los wizards
  export interface WizardState {
    wizards: Wizard[] // Lista de todos los wizards
    commonSteps: WizardStep[] // Pasos comunes entre todos los wizards
    activeWizardId: string | null // ID del wizard activo
  }
  
  