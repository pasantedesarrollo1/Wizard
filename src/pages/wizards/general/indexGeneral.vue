<template>
  <IonPage>
    <IonContent class="ion-content">
      <div class="wizard-container">
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
              <div class="sub-step-indicator" v-if="currentSubStep">
                <p class="text-sm text-center mb-4">
                  Sub-paso {{ currentSubStepIndex + 1 }} de {{ totalSubStepsForCurrentStep }}: 
                  {{ currentSubStep.title }}
                </p>
              </div>
              
              <!-- Componente del sub-paso actual -->
              <component 
                v-if="currentSubStep" 
                :is="currentSubStep.component" 
                @update:tipoCompania="handleTipoCompaniaChange"
                @update:Recivos="handleRecivosChange"
                @update:DocumentType="handleDocumentTypeChange"
                :recivoSeleccionado="recivosSeleccionado"
                :documentTypeSeleccionado="documentTypeSeleccionado"
              />
            </div>
          </template>
          <template v-else>
            <!-- Renderizado normal para pasos sin sub-pasos -->
            <welcomeGeneral v-if="currentStep === 0" />
            <personalData v-else-if="currentStep === 1" />
            <impuestosManejar v-else-if="currentStep === 4" />
            <!-- Aquí puedes añadir más pasos sin sub-pasos -->
          </template>
        </div>
        
        <!-- Botones de navegación -->
        <div class="navigation-controls">
          <IonButton fill="outline" @click="handlePrevious" :disabled="currentStep === 0">
            Anterior
          </IonButton>
          <IonButton @click="handleNext" :disabled="isLastStep">
            {{ isSecondLastStep ? 'Completar' : 'Siguiente' }}
          </IonButton>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { computed, markRaw, defineAsyncComponent, ref, watch } from 'vue';
import ProgressBar from "@/components/common/progressBar.vue";
import welcomeGeneral from "@/components/wizard/general/welcomeGeneral.vue";
import personalData from "@/pages/wizards/common/personalData.vue";
import impuestosManejar from "@/pages/wizards/common/impuestosManejar.vue";
import { useWizardProgress } from "@/composables/useWizardProgress";
import { useWizardSubSteps } from "@/composables/useWizardSubSteps";

// Importamos los componentes para los sub-pasos
// Usamos markRaw para evitar problemas de reactividad con los componentes
const companyInfo = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyInfo.vue")));
const companyContact = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyContact.vue")));
const companyType = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyType.vue")));
const companyDomain = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyDomain.vue")));
const companySucursal = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/sucursalPOS/companySucursal.vue")));
const companyDespacho = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/sucursalPOS/companyDespacho.vue")));
const companyTuristico = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/sucursalPOS/companyTuristico.vue")));
const companyPOS = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/sucursalPOS/companyPOS.vue")));
const companyPlanComercios = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyPlanComercios.vue")));
const companyPlanRestaurantes = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyPlanRestaurantes.vue")));
const companyFrecuencia = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyFrecuencia.vue")));
const companyPagos = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyPagos.vue")));
const companyTicketEmail = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/createCompany/companyTicketEmail.vue")));
const configRecivos = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configRecivos.vue")));
const configDocumentType = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configDocumentType.vue")));
const configDocumentDefault = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configDocumentDefault.vue")));
const configParameterSearch = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configParameterSearch.vue")));
const configRipe = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configRipe.vue")));
const configRetencion = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configRetencion.vue")));
const configArtesano = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configArtesano.vue")));
const configInventario = markRaw(defineAsyncComponent(() => 
  import("@/pages/wizards/common/configuracionCompany/configInventario.vue")));
// Variable para almacenar el tipo de compañía seleccionado
const tipoCompaniaSeleccionado = ref<string>('');

// Variables para almacenar las selecciones de recibos y tipo de documento
const recivosSeleccionado = ref<string>('');
const documentTypeSeleccionado = ref<string>('');

// Obtenemos los pasos del wizard
const { steps, currentStep, nextStep, prevStep, goToStep } = useWizardProgress("general");

// Función para manejar el cambio en el tipo de compañía
const handleTipoCompaniaChange = (tipo: string) => {
  // Actualizamos el tipo de compañía seleccionado
  tipoCompaniaSeleccionado.value = tipo;
  console.log('Tipo de compañía seleccionado:', tipo);
};

// Función para manejar el cambio en la selección de recibos
const handleRecivosChange = (value: string) => {
  recivosSeleccionado.value = value;
  console.log('Recibos seleccionado:', value);
};

// Función para manejar el cambio en el tipo de documento
const handleDocumentTypeChange = (value: string) => {
  documentTypeSeleccionado.value = value;
  console.log('Tipo de documento seleccionado:', value);
};

// Configuración de sub-pasos
const subStepsConfig = ref({
  // El paso 'create-company' (índice 2) tiene sub-pasos
  'create-company': [
    { title: "Información Básica", component: companyInfo },
    { title: "Tipo de compania", component: companyType },
    { title: "Freuencia", component: companyFrecuencia },
    { title: "Tipo de Pagos", component: companyPagos },
    { title: "Email del ticket", component: companyTicketEmail },
    { title: "Dominio", component: companyDomain },
    { title: "Datos de Contacto", component: companyContact },  
  ],
  'config-company': [
    { title: "Configuracion de Recibos", component: configRecivos },
    { title: "Configuracion de Tipo de Documento", component: configDocumentType },
    { title: "Configuracion de Documento por Defecto", component: configDocumentDefault },
    { title: "Configuracion del Parametro de busqueda", component: configParameterSearch },
    { title: "Configuracion de RIPE", component: configRipe },
    { title: "Configuracion de Agente de retencion", component: configRetencion },
    { title: "Configuracion de Artesano", component: configArtesano },
    { title: "Configuracion de Control de Inventario", component: configInventario },
  ],
  'sucursal-punto-venta-inicial': [
    { title: "Creacion de Sucursal", component: companySucursal },
    { title: "Creacion de Sucursal", component: companyDespacho },
    { title: "Creacion de Sucursal", component: companyTuristico },
    { title: "Creacion de Punto de Venta", component: companyPOS },
  ],
});

// Observamos cambios en tipoCompaniaSeleccionado para actualizar los sub-pasos
watch(tipoCompaniaSeleccionado, (newValue) => {
  // Obtenemos la configuración actual
  const currentConfig = [...subStepsConfig.value['create-company']];
  
  // Eliminamos cualquier plan existente (si lo hubiera)
  const filteredConfig = currentConfig.filter(step => 
    step.title !== "Planes Comercios" && step.title !== "Planes Restaurantes");
  
  // Determinamos qué plan insertar basado en el tipo seleccionado
  if (newValue === 'comercios') {
    // Insertamos el plan de comercios después del tipo de compañía (índice 1)
    filteredConfig.splice(2, 0, { title: "Planes Comercios", component: companyPlanComercios });
  } else if (newValue === 'restaurante') {
    // Insertamos el plan de restaurantes después del tipo de compañía (índice 1)
    filteredConfig.splice(2, 0, { title: "Planes Restaurantes", component: companyPlanRestaurantes });
  }
  
  // Actualizamos la configuración
  subStepsConfig.value['create-company'] = filteredConfig;
  
  console.log('Configuración de sub-pasos actualizada:', subStepsConfig.value['create-company']);
}, { immediate: true });

// Inicializamos el composable de sub-pasos con la configuración
const { 
  currentSubStepIndex, 
  hasSubSteps,
  getCurrentSubStep,
  getTotalSubSteps,
  nextSubStep,
  prevSubStep,
  resetSubStep
} = useWizardSubSteps(subStepsConfig.value);

// Obtenemos la clave del paso actual
const currentStepKey = computed(() => {
  return steps.value[currentStep.value]?.key || '';
});

// Verificamos si el paso actual tiene sub-pasos
const hasSubStepsForCurrentStep = computed(() => {
  return hasSubSteps(currentStepKey.value);
});

// Obtenemos el sub-paso actual
const currentSubStep = computed(() => {
  return getCurrentSubStep(currentStepKey.value);
});

// Obtenemos el número total de sub-pasos para el paso actual
const totalSubStepsForCurrentStep = computed(() => {
  return getTotalSubSteps(currentStepKey.value);
});

// Verificamos si estamos en el último paso
const isLastStep = computed(() => {
  return currentStep.value === steps.value.length - 1;
});

// Verificamos si estamos en el penúltimo paso y último sub-paso
const isSecondLastStep = computed(() => {
  const isSecondLast = currentStep.value === steps.value.length - 2;
  if (!isSecondLast) return false;
  
  if (hasSubStepsForCurrentStep.value) {
    return currentSubStepIndex.value === totalSubStepsForCurrentStep.value - 1;
  }
  
  return true;
});

// Maneja la lógica de navegación "siguiente"
const handleNext = () => {
  // Si el paso actual tiene sub-pasos
  if (hasSubStepsForCurrentStep.value) {
    // Intentamos avanzar al siguiente sub-paso
    const completed = nextSubStep(currentStepKey.value);
    
    // Si hemos completado todos los sub-pasos, avanzamos al siguiente paso principal
    if (completed) {
      nextStep();
    }
    
    return;
  }
  
  // Para pasos sin sub-pasos, comportamiento normal
  nextStep();
};

// Maneja la lógica de navegación "anterior"
const handlePrevious = () => {
  // Si el paso actual tiene sub-pasos
  if (hasSubStepsForCurrentStep.value) {
    // Intentamos retroceder al sub-paso anterior
    const goToPrevStep = prevSubStep(currentStepKey.value);
    
    // Si estamos en el primer sub-paso, retrocedemos al paso principal anterior
    if (goToPrevStep) {
      prevStep();
    }
    
    return;
  }
  
  // Para pasos sin sub-pasos, comportamiento normal
  prevStep();
};

// Maneja la actualización manual del paso
const updateStep = (step: number) => {
  // Si cambiamos a un paso diferente, reseteamos el sub-paso
  if (step !== currentStep.value) {
    resetSubStep();
  }
  
  goToStep(step);
};
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
  padding: 20px;
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
  padding-top: 7;
  padding-bottom: 7;
  background: white;
  position: sticky; /* Cambiado de static a sticky */
  bottom: 0; /* Fija al fondo */
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); /* Añade una sombra sutil para separar visualmente */
  z-index: 10; /* Asegura que esté por encima de otros elementos */
}
</style>