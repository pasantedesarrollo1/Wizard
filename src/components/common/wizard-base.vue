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
              <!-- Indicador de sub-paso -->
              <!-- <div class="sub-step-indicator" v-if="currentSubStep">
                <p class="text-sm text-center mb-4">
                  Sub-paso {{ currentSubStepIndex + 1 }} de {{ totalSubStepsForCurrentStep }}: 
                  {{ currentSubStep.title }}
                </p>
              </div> -->
              <!-- Componente del sub-paso actual -->
              <component 
                v-if="currentSubStep" 
                :is="currentSubStep.component"
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
          <IonButton fill="outline" @click="handlePrevious" :disabled="currentStep === 0">
            Anterior
          </IonButton>
          <IonButton @click="handleNext">
            {{ isLastStepAndSubStep ? 'Finalizado' : 'Siguiente' }}
          </IonButton>
        </div>
      </div>
    </IonContent>
    
    <!-- Modal de confirmación -->
    <ConfirmationModal 
      :is-open="showConfirmationModal" 
      @confirm="handleConfirmFinish" 
      @cancel="handleCancelFinish"
    />
  </IonPage>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonButton } from "@ionic/vue"
import { computed, ref, PropType, watch, onMounted } from "vue"
import { useRouter } from "vue-router"
import ProgressBar from "@/components/common/progressBar.vue"
import welcomeGeneral from "@/components/common/welcomeGeneral.vue"
import ConfirmationModal from "@/components/common/confirmation-modal.vue"
import { useWizardProgress } from "@/composables/useWizardProgress"
import { useWizardSubSteps, WizardSubStepsConfig } from "@/composables/useWizardSubSteps"
import { useWizardStore } from "@/stores/wizardStore"
import type { Component } from "vue"

// Obtenemos el router para la navegación
const router = useRouter()

// Obtenemos la instancia del store
const wizardStore = useWizardStore()

// Props para configurar el wizard
const props = defineProps({
  // Tipo de wizard (ventas, soporte, cliente, general)
  wizardType: {
    type: String as PropType<"ventas" | "soporte" | "cliente" | "general">,
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

// Inicializamos el wizard con el tipo proporcionado
const { steps, currentStep, nextStep, prevStep, goToStep } = useWizardProgress(props.wizardType)

// Función para manejar el evento de inicio desde welcomeGeneral
const handleStart = () => {
  started.value = true
  // Actualizar el tipo de wizard en el store
  wizardStore.updateWizardState({
    type: props.wizardType,
  })
}

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

// Maneja la lógica de navegación "siguiente"
const handleNext = () => {
  // Si estamos en el último paso y sub-paso y el botón dice "Finalizado"
  if (isLastStepAndSubStep.value) {
    // Mostramos el modal de confirmación en lugar de avanzar
    showConfirmationModal.value = true
    return
  }

  // Si el paso actual tiene sub-pasos
  if (hasSubStepsForCurrentStep.value) {
    // Intentamos avanzar al siguiente sub-paso
    const completed = nextSubStep(currentStepKey.value)
    // Actualizar el subpaso en el store
    wizardStore.updateWizardState({
      currentSubStep: currentSubStepIndex.value + 1,
    })

    // Si hemos completado todos los sub-pasos, avanzamos al siguiente paso principal
    if (completed) {
      nextStep()
    }
    return
  }

  // Para pasos sin sub-pasos, comportamiento normal
  nextStep()
}

// Función para manejar la confirmación del modal
const handleConfirmFinish = () => {
  // Ocultamos el modal
  showConfirmationModal.value = false

  // Obtener todos los datos del formulario para procesar
  const formData = wizardStore.getAllFormData
  console.log("Wizard finalizado con datos:", formData)

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

    // Si estamos en el primer sub-paso, retrocedemos al paso principal anterior
    if (goToPrevStep) {
      prevStep()
    }
    return
  }
  // Para pasos sin sub-pasos, comportamiento normal
  prevStep()
}

// Maneja la actualización manual del paso
const updateStep = (step: number) => {
  // Si cambiamos a un paso diferente, reseteamos el sub-paso
  if (step !== currentStep.value) {
    resetSubStep()
  }
  goToStep(step)
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
    }
  } catch (error) {
    console.error("Error cargando datos guardados:", error)
  }
})
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