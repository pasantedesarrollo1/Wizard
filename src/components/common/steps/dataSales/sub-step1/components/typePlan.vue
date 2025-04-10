<template>
  <div class="ion-padding">
    <ion-text color="medium" class="ion-text-center">
      <h5>Selecciona el plan de tu preferencia</h5>
    </ion-text>
    
    <!-- Switch para alternar entre Mensual y Anual -->
    <div class="period-toggle-container ion-margin-vertical">
      <ion-segment v-model="periodoSeleccionado" mode="ios">
        <ion-segment-button value="mensual">
          <ion-label>Mensual</ion-label>
        </ion-segment-button>
        <ion-segment-button value="anual">
          <ion-label>Anual</ion-label>
        </ion-segment-button>
      </ion-segment>
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
            class="plan-card"
          >
            <ion-card-header>
              <ion-card-title class="ion-text-center">{{ opcion.label }}</ion-card-title>
            </ion-card-header>
            <ion-card-content class="ion-text-center">
              <ion-text color="dark">
                <h2 class="price">
                  {{ periodoSeleccionado === 'anual' ? opcion.precioAnual : opcion.precioMensual }}
                </h2>
              </ion-text>
              <ion-badge 
                v-if="opcion.value === 'pg'" 
                color="success"
                class="ion-margin-top"
              >
                Gratis
              </ion-badge>
              <ion-badge 
                v-if="periodoSeleccionado === 'anual'" 
                color="tertiary"
                class="ion-margin-top"
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
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel
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
</script>
  
<style scoped>
.period-toggle-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.plan-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-5px);
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 15px 0;
}

ion-segment {
  width: 80%;
  max-width: 300px;
}
</style>