<template>
  <IonPage>
    <IonContent class="ion-content">
      <!-- Pantalla de bienvenida (se muestra primero) -->
      <welcomeGeneral v-if="!started" @start="handleStart" />
      <!-- Contenido principal del wizard (se muestra después de hacer clic en "Comenzar") -->
      <div v-else class="wizard-container">
        <ProgressBar 
          :steps="steps" 
          :current-step="currentStep" 
          :show-title="true"
          @update:current-step="updateStep"
        />
        <!-- Contenedor del contenido -->
        <div class="wizard-content">
          <!-- Renderizado dinámico basado en el paso actual -->
          <template v-if="hasSubStepsForCurrentStep">
            <!-- Si el paso actual tiene sub-pasos -->
            <div class="sub-step-container">
              <!-- Componente del sub-paso actual -->
              <component 
                :is="currentSubStepComponent"
              />
            </div>
          </template>
          <template v-else>
            <!-- Renderizado normal para pasos sin sub-pasos -->
            <component 
              v-if="currentStepComponent" 
              :is="currentStepComponent" 
            />
          </template>
        </div>
        <!-- Botones de navegación -->
        <div class="navigation-controls">
          <IonButton fill="outline" @click="handlePrevious" :disabled="shouldDisablePreviousButton">
            Anterior
          </IonButton>
          <IonButton @click="handleNext" :disabled="shouldDisableNextButton">
            {{ isLastStepAndSubStep ? 'Finalizado' : 'Siguiente' }}
          </IonButton>
        </div>
      </div>
    </IonContent>
    
    <!-- Modal de confirmación para finalizar el wizard -->
    <ConfirmationModal 
      :is-open="showConfirmationModal"
      title="Finalizar Configuración"
      message="¿Está seguro que desea finalizar la configuración?"
      secondary-message="Al confirmar, se guardarán todos los datos y se completará el proceso."
      confirm-button-text="Finalizar"
      cancel-button-text="Continuar Editando"
      @confirm="handleConfirmFinish" 
      @cancel="handleCancelFinish"   
    ><finishSummary /> </ConfirmationModal>
    
    <!-- Modal de confirmación para el paso de ventas -->
    <ConfirmationModal 
      :is-open="showSalesConfirmationModal"
      title="Confirmar Información de Venta"
      message="¿Está seguro que desea continuar con esta información de venta?"
      secondary-message="Verifique que todos los datos de pago y plan sean correctos antes de continuar."
      confirm-button-text="Continuar"
      cancel-button-text="Revisar Datos"
      confirm-button-color="success"
      @confirm="handleConfirmSalesNext" 
      @cancel="handleCancelSalesNext"
    > 
    <SalesSummary />
    </ConfirmationModal> 
    
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue"
import { computed, ref, PropType, watch, onMounted } from "vue"
import { useRouter } from "vue-router"
import ProgressBar from "@/components/common/progressBar.vue"
import welcomeGeneral from "@/components/common/welcomeGeneral.vue"
import ConfirmationModal from "@/components/ui/confirmationModal.vue" // Cambiado a la nueva ruta
import { useWizardProgress } from "@/composables/useWizardProgress"
import { useWizardSubSteps, WizardSubStepsConfig } from "@/composables/useWizardSubSteps"
import { useWizardStore } from "@/stores/wizardStore"
import type { Component } from "vue"
import { useWizardValidation } from "@/composables/useWizardValidation"
import SalesSummary from "@/components/summary/salesSummary.vue" // Importamos el componente
import finishSummary from "@/components/summary/finishSummary.vue" // Importamos el componente

// Obtener las funciones de validación del composable
const { shouldDisableNextButton, shouldDisablePreviousButton } = useWizardValidation()

// Obtenemos el router para la navegación
const router = useRouter()

// Obtenemos la instancia del store
const wizardStore = useWizardStore()

// Props para configurar el wizard
const props = defineProps({
  // Tipo de wizard (ventas, soporte, cliente, general)
  wizardType: {
    type: String as PropType<"sales" | "soporte" | "cliente" | "general">,
    required: true,
  },
  // Mapeo de componentes para cada paso principal
  stepComponents: {
    type: Object as PropType<Record<string, Component>>,
    required: true,
  },
  // Configuración de sub-pasos
  subStepsConfig: {
    type: Object as PropType<WizardSubStepsConfig>,
    required: true,
  },
})

// Estado para controlar si se ha iniciado el wizard
const started = ref(false)

// Variable para controlar la visibilidad del modal de confirmación
const showConfirmationModal = ref(false)

// Variable para controlar la visibilidad del modal de confirmación de ventas
const showSalesConfirmationModal = ref(false)

// Inicializamos el wizard con el tipo proporcionado
const { steps, currentStep, nextStep, prevStep, goToStep } = useWizardProgress(props.wizardType)

// Obtenemos las funciones del composable useWizardSubSteps
const {
  currentSubStepIndex,
  hasSubSteps,
  getCurrentSubStep,
  getTotalSubSteps,
  nextSubStep,
  prevSubStep,
  resetSubStep,
} = useWizardSubSteps(props.subStepsConfig)

// Obtenemos la clave del paso actual
const currentStepKey = computed(() => {
  return steps.value[currentStep.value]?.key || ""
})

// Actualizamos el estado del wizard cuando cambia el paso
watch(currentStepKey, (newStepKey) => {
  wizardStore.updateWizardState({
    currentStep: newStepKey,
    currentSubStep: currentSubStepIndex.value + 1,
  })

  // Mostrar el estado completo en consola
  console.log("Wizard state actualizado (watch currentStepKey):", {
    wizardState: wizardStore.getCurrentWizardState,
    formData: wizardStore.getAllFormData,
  })
})

// Obtenemos el componente para el paso actual
const currentStepComponent = computed(() => {
  const key = currentStepKey.value
  return props.stepComponents[key] || null
})

// Verificamos si el paso actual tiene sub-pasos
const hasSubStepsForCurrentStep = computed(() => {
  return hasSubSteps(currentStepKey.value)
})

// Obtenemos el sub-paso actual
const currentSubStep = computed(() => {
  return getCurrentSubStep(currentStepKey.value)
})

const currentSubStepComponent = computed(() => {
  if (!currentSubStep.value) {
    return null;
  }
  return currentSubStep.value.component;
});

// Obtenemos el número total de sub-pasos para el paso actual
const totalSubStepsForCurrentStep = computed(() => {
  return getTotalSubSteps(currentStepKey.value)
})

// Verificamos si estamos en el último paso y sub-paso
const isLastStepAndSubStep = computed(() => {
  return (
    currentStep.value === steps.value.length - 1 && currentSubStepIndex.value === totalSubStepsForCurrentStep.value - 1
  )
})

// Función para manejar el evento de inicio desde welcomeGeneral
const handleStart = () => {
  started.value = true
  // Actualizar el tipo de wizard en el store
  wizardStore.updateWizardState({
    type: props.wizardType,
  })

  // Mostrar el estado completo en consola
  console.log("Wizard state actualizado (handleStart):", {
    wizardState: wizardStore.getCurrentWizardState,
    formData: wizardStore.getAllFormData,
  })
}

// Función para actualizar los datos de plan y billingFrequency si estamos en el paso data-sales
const updateSalesDataIfNeeded = () => {
  // Verificar si estamos en el paso data-sales y el subpaso 1 (indexSalesDataSS1)
  if (currentStepKey.value === "data-sales" && currentSubStepIndex.value === 0) {
    // Obtener los datos actuales de salesData
    const salesData = wizardStore.getStepData("salesData")

    // Verificar si tenemos datos de plan y billingFrequency para actualizar
    if (salesData && (salesData.plan || salesData.billingFrequency)) {
      // No es necesario hacer nada aquí, ya que los datos se actualizan directamente
      // desde el componente typePlan.vue mediante el watch y las funciones
    }
  }
}

// Modificar la función proceedToNextStep para mostrar el estado completo
const proceedToNextStep = () => {
  // Si el paso actual tiene sub-pasos
  if (hasSubStepsForCurrentStep.value) {
    // Intentamos avanzar al siguiente sub-paso
    const completed = nextSubStep(currentStepKey.value);
    // Actualizar el subpaso en el store
    wizardStore.updateWizardState({
      currentSubStep: currentSubStepIndex.value + 1,
    });

    // Mostrar el estado completo en consola con copia profunda para evitar referencias
    console.log("Wizard state actualizado (proceedToNextStep - subpaso):", {
      wizardState: JSON.parse(JSON.stringify(wizardStore.getCurrentWizardState)),
      formData: JSON.parse(JSON.stringify(wizardStore.getAllFormData))
    });

    // Si hemos completado todos los sub-pasos, avanzamos al siguiente paso principal
    if (completed) {
      nextStep();
    }
    return;
  }

  // Para pasos sin sub-pasos, comportamiento normal
  nextStep();

  // Mostrar el estado completo en consola con copia profunda para evitar referencias
  console.log("Wizard state actualizado (proceedToNextStep - paso principal):", {
    wizardState: JSON.parse(JSON.stringify(wizardStore.getCurrentWizardState)),
    formData: JSON.parse(JSON.stringify(wizardStore.getAllFormData))
  });
};

// Modificar la función handleNext para asegurar que los datos se guarden correctamente
const handleNext = () => {
  // Actualizar datos de salesData si es necesario
  updateSalesDataIfNeeded();

  // Si estamos en el último paso y sub-paso y el botón dice "Finalizado"
  if (isLastStepAndSubStep.value) {
    // Mostramos el modal de confirmación en lugar de avanzar
    showConfirmationModal.value = true;
    return;
  }

  // Verificar si estamos en el paso data-sales y subpaso 1 (indexSalesDataSS2)
  if (currentStepKey.value === "data-sales" && currentSubStepIndex.value === 1) {
    // Verificar si se cumplen todas las condiciones para habilitar el botón
    if (!shouldDisableNextButton.value) {
      // Mostrar el modal de confirmación de ventas
      showSalesConfirmationModal.value = true;
      return;
    }
  }

  // Forzar una actualización del store antes de proceder
  if (currentStepKey.value === "config-company") {
    // Esperar un momento para asegurar que los datos se han guardado
    setTimeout(() => {
      // Para todos los demás casos, procedemos normalmente
      proceedToNextStep();
    }, 200);
  } else {
    // Para todos los demás casos, procedemos normalmente
    proceedToNextStep();
  }
};

// Función para manejar la confirmación del modal de ventas
const handleConfirmSalesNext = () => {
  // Ocultamos el modal
  showSalesConfirmationModal.value = false
  
  // Procedemos al siguiente paso/subpaso
  proceedToNextStep()
}

// Función para manejar la cancelación del modal de ventas
const handleCancelSalesNext = () => {
  // Simplemente ocultamos el modal sin hacer nada más
  showSalesConfirmationModal.value = false
}

// Función para manejar la confirmación del modal
const handleConfirmFinish = () => {
  // Ocultamos el modal
  showConfirmationModal.value = false

  // Obtener todos los datos del formulario para procesar
  const formData = wizardStore.getAllFormData
  console.log("Wizard finalizado con datos:", {
    wizardState: wizardStore.getCurrentWizardState,
    formData: formData,
  })

  // Navegamos a la página de finishedCompany
  router.push("/finished-company")
}

// Función para manejar la cancelación del modal
const handleCancelFinish = () => {
  // Simplemente ocultamos el modal sin hacer nada más
  showConfirmationModal.value = false
}

// Maneja la lógica de navegación "anterior"
const handlePrevious = () => {
  // Si el paso actual tiene sub-pasos
  if (hasSubStepsForCurrentStep.value) {
    // Intentamos retroceder al sub-paso anterior
    const goToPrevStep = prevSubStep(currentStepKey.value)
    // Actualizar el subpaso en el store
    wizardStore.updateWizardState({
      currentSubStep: currentSubStepIndex.value + 1,
    })

    // Mostrar el estado completo en consola
    console.log("Wizard state actualizado (handlePrevious - subpaso):", {
      wizardState: wizardStore.getCurrentWizardState,
      formData: wizardStore.getAllFormData,
    })

    // Si estamos en el primer sub-paso, retrocedemos al paso principal anterior
    if (goToPrevStep) {
      prevStep()
    }
    return
  }
  // Para pasos sin sub-pasos, comportamiento normal
  prevStep()

  // Mostrar el estado completo en consola
  console.log("Wizard state actualizado (handlePrevious - paso principal):", {
    wizardState: wizardStore.getCurrentWizardState,
    formData: wizardStore.getAllFormData,
  })
}

// Maneja la actualización manual del paso
const updateStep = (step: number) => {
  // Si cambiamos a un paso diferente, reseteamos el sub-paso
  if (step !== currentStep.value) {
    resetSubStep()
  }
  goToStep(step)

  // Actualizar el estado del wizard cuando se cambia de paso mediante la barra de navegación
  wizardStore.updateWizardState({
    currentStep: steps.value[step]?.key || "",
    currentSubStep: 1, // Reseteamos al primer subpaso
  })

  // Mostrar el estado completo en consola
  console.log("Wizard state actualizado (updateStep - navegación):", {
    wizardState: wizardStore.getCurrentWizardState,
    formData: wizardStore.getAllFormData,
  })
}

//Cargamos los datos iniciales si existen
onMounted(() => {
  // Inicializar currentSubStepIndex a 0 al montar el componente
  resetSubStep()

  // Cargar datos iniciales si están disponibles, por ejemplo de localStorage
  try {
    const savedData = localStorage.getItem("wizardData")
    if (savedData) {
      wizardStore.loadInitialData(JSON.parse(savedData))

      // Mostrar el estado cargado en consola
      console.log("Wizard state cargado desde localStorage:", {
        wizardState: wizardStore.getCurrentWizardState,
        formData: wizardStore.getAllFormData,
      })
    }
  } catch (error) {
    console.error("Error cargando datos guardados:", error)
  }
})

// Define un ref para el estado del wizard
const wizardState = ref({
  currentStep: "",
  currentSubStep: 0,
})

// Modificar el watch para usar copia profunda en los logs
watch([currentStepKey, currentSubStepIndex], () => {
  // Actualiza el estado del wizard con los valores actuales
  wizardState.value = {
    currentStep: currentStepKey.value,
    currentSubStep: currentSubStepIndex.value + 1,
  };

  // Actualiza el estado del wizard en el store
  wizardStore.updateWizardState(wizardState.value);

  // Muestra el estado completo en la consola con copia profunda para evitar referencias
  console.log("Wizard state actualizado (watch currentStepKey y currentSubStepIndex):", {
    wizardState: JSON.parse(JSON.stringify(wizardStore.getCurrentWizardState)),
    formData: JSON.parse(JSON.stringify(wizardStore.getAllFormData))
  });
});
</script>
<style scoped>
.ion-content {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Asegura que ocupe toda la pantalla */
}
.wizard-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Permite que crezca */
  height: 100%; /* Asegura que ocupe toda la altura disponible */
}
.wizard-content {
  flex-grow: 1; /* Hace que el contenido ocupe el espacio restante */
  display: flex;
  flex-direction: column; /* Cambiado a column para que el indicador esté arriba */
  align-items: center;
  padding: 0px;
  overflow-y: auto; /* Permite scroll si el contenido es muy grande */
}
.sub-step-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sub-step-indicator {
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  background-color: rgba(0, 60, 255, 0.05);
  border-radius: 8px;
}
.navigation-controls {
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 7px;
  padding-bottom: 7px;
  background: white;
  position: sticky; /* Cambiado de static a sticky */
  bottom: 0; /* Fija al fondo */
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); /* Añade una sombra sutil para separar visualmente */
  z-index: 10; /* Asegura que esté por encima de otros elementos */
}
</style>