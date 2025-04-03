import { ref, computed } from "vue";

export function useWizardProgress(type) {
  // Definir los pasos comunes
  const commonSteps = [
    { label: "Inicio", key: "start" },
    { label: "Datos Personales", key: "personal-info" }
  ];

  // Definir los pasos específicos por wizard
  const wizardSteps = {
    ventas: [
      ...commonSteps,
      { label: "Carrito", key: "cart" },
      { label: "Pago", key: "payment" },
      { label: "Confirmación", key: "confirmation" }
    ],
    soporte: [
      ...commonSteps,
      { label: "Detalles del Ticket", key: "ticket-details" },
      { label: "Confirmación", key: "confirmation" }
    ],
    cliente: [
      ...commonSteps,
      { label: "Información de Cuenta", key: "account-info" },
      { label: "Resumen", key: "summary" }
    ]
  };

  // Estado reactivo del paso actual
  const currentStep = ref(0);
  
  // Obtener pasos según el tipo de wizard
  const steps = computed(() => wizardSteps[type] || []);

  return {
    steps,
    currentStep
  };
}
