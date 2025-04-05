import { ref, computed } from "vue";
export interface WizardStep {
  label: string;
  key: string;
  description?: string;
}
export function useWizardProgress(type: 'ventas' | 'soporte' | 'cliente' | 'general') {
  // Definir los pasos comunes
  const commonSteps: WizardStep[] = [
    { label: "Inicio", key: "start"},
    { label: "Datos Personales", key: "personal-info"},
    { label: "Creacion Empresa", key: "create-company"},
  ];

  // Definir los pasos específicos por wizard
  const wizardSteps = {
    ventas: [
      ...commonSteps,
      { label: "Carrito", key: "cart"},
      { label: "Pago", key: "payment"},
      { label: "Confirmación", key: "confirmation"}
    ],
    soporte: [
      ...commonSteps,
      { label: "Detalles del Ticket", key: "ticket-details"},
      { label: "Confirmación", key: "confirmation"}
    ],
    cliente: [
      ...commonSteps,
      { label: "Información de Cuenta", key: "account-info"},
      { label: "Resumen", key: "summary"}
    ],
    general: [
      ...commonSteps,
      { label: "Inf", key: "account-info"},
      { label: "Resu", key: "summary"}
    ]
  };

  // Estado reactivo del paso actual
  const currentStep = ref(0);
  
  // Obtener pasos según el tipo de wizard
  const steps = computed(() => wizardSteps[type] || []);

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value++;
    }
  };

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };

  // Función para ir a un paso específico
  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.value.length) {
      currentStep.value = index;
    }
  };

  return {
    steps,
    currentStep,
    nextStep,
    prevStep,
    goToStep
  };
}