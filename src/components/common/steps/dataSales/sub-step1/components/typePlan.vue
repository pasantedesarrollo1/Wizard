<template>
  <div class="p-4">
    <ion-text color="medium" class="text-center">
      <h5>Selecciona el plan de tu preferencia</h5>
    </ion-text>
    
    <!-- Switch personalizado para alternar entre Mensual y Anual -->
    <div class="flex justify-center my-5">
      <div class="flex items-center justify-center gap-2.5">
        <span :class="{ 'text-black font-semibold': periodoSeleccionado === 'mensual', 'text-gray-500 font-medium': periodoSeleccionado !== 'mensual' }">
          Mensual
        </span>
        <div class="relative w-[74px] h-[36px] box-border">
          <div id="button-3" class="button r">
            <input 
              class="checkbox" 
              type="checkbox" 
              :checked="periodoSeleccionado === 'anual'"
              @change="togglePeriodo"
            >
            <div class="knobs"></div>
            <div class="layer"></div>
          </div>
        </div>
        <span :class="{ 'text-black font-semibold': periodoSeleccionado === 'anual', 'text-gray-500 font-medium': periodoSeleccionado !== 'anual' }">
          Anual
        </span>
      </div>
    </div>
    
    <!-- Contenedor de cards -->
    <ion-grid>
      <ion-row>
        <ion-col 
          size="12" 
          size-sm="6" 
          size-md="3" 
          v-for="opcion in opcionesTipoPlanes" 
          :key="opcion.value"
        >
          <ion-card 
            button 
            :color="tipoPlanSeleccionado === opcion.value ? 'primary' : ''"
            @click="seleccionarPlan(opcion.value)"
            class="h-full flex flex-col transition-transform duration-300 hover:-translate-y-1.5"
          >
            <ion-card-header>
              <ion-card-title class="text-center">{{ opcion.label }}</ion-card-title>
            </ion-card-header>
            <ion-card-content class="text-center">
              <ion-text color="dark">
                <h2 class="text-[1.8rem] font-bold my-[15px]">
                  {{ periodoSeleccionado === 'anual' ? opcion.precioAnual : opcion.precioMensual }}
                </h2>
              </ion-text>
              <ion-badge 
                v-if="opcion.value === 'pg'" 
                color="success"
                class="mt-4"
              >
                Gratis
              </ion-badge>
              <ion-badge 
                v-if="periodoSeleccionado === 'anual'" 
                color="tertiary"
                class="mt-4"
              >
                Ahorro anual
              </ion-badge>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonText, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge
} from '@ionic/vue';
  
// Definimos la interfaz para las opciones de tipo de plan con precios
interface TipoPlanesOpcion {
  label: string;
  value: string;
  precioMensual: string;
  precioAnual: string;
}
  
// Estado para controlar si se muestra el precio anual o mensual
const periodoSeleccionado = ref<string>('mensual');
  
// Array con las opciones de tipo de plan incluyendo precios
const opcionesTipoPlanes = ref<TipoPlanesOpcion[]>([
  { 
    label: 'Plan Gratuito', 
    value: 'pg',
    precioMensual: '0$',
    precioAnual: '0$'
  },
  { 
    label: 'Plan Lite', 
    value: 'pl',
    precioMensual: '10$',
    precioAnual: '120$'
  },
  { 
    label: 'Plan Básico', 
    value: 'pb',
    precioMensual: '20$',
    precioAnual: '240$'
  },
  { 
    label: 'Plan Pyme', 
    value: 'pp',
    precioMensual: '30$',
    precioAnual: '360$'
  },
]);
  
// Variable para almacenar el plan seleccionado
const tipoPlanSeleccionado = ref<string>('');
  
// Función para seleccionar un plan
const seleccionarPlan = (value: string) => {
  tipoPlanSeleccionado.value = value;
};

// Función para alternar entre periodos (mensual/anual)
const togglePeriodo = (event: Event) => {
  const target = event.target as HTMLInputElement;
  periodoSeleccionado.value = target.checked ? 'anual' : 'mensual';
};
</script>
  
<style lang="scss" src="@/components/common/steps/dataSales/sub-step1/styles/typePlan.scss" scoped></style>