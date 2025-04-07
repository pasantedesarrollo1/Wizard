import { ref, computed } from "vue"
export interface WizardStep {
  label: string
  key: string
  description?: string
}

// Definimos una interfaz para la configuración de pasos por tipo de wizard
export interface WizardStepsConfig {
  [type: string]: WizardStep[]
}

export function useWizardProgress(type: "ventas" | "soporte" | "cliente" | "general") {
  // Definir los pasos comunes
  const commonSteps: WizardStep[] = [
    { label: "Datos Personales", key: "personal-info" },
    { label: "Configuraciones de la Empresa", key: "config-company" },
    { label: "Datos de la Empresa", key: "create-company" },
    //{ label: "Sucursal y Punto de Venta Inicial", key: "sucursal-punto-venta-inicial" },
  ]

  // Configuración centralizada de pasos para cada tipo de wizard
  // Esto permite agregar o modificar pasos específicos para cada flujo
  const wizardStepsConfig: WizardStepsConfig = {
    ventas: [{ label: "Consultor", key: "consultor" }, ...commonSteps],
    soporte: [...commonSteps],
    cliente: [...commonSteps],
    general: [...commonSteps],
  }

  // Estado reactivo del paso actual
  const currentStep = ref(0)

  // Obtener pasos según el tipo de wizard
  const steps = computed(() => wizardStepsConfig[type] || [])

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value++
    }
  }

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  // Función para ir a un paso específico
  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.value.length) {
      currentStep.value = index
    }
  }

  return {
    steps,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
  }
}

