<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <!-- Grid mejorado con animaciones y efectos -->
    <span >Impuestos a manejar</span>
    <ion-grid class="taxes-grid">
      <ion-row class="ion-justify-content-center">
        <ion-col
          size="12"
          size-sm="4"
          size-md="4"
          v-for="opcion in opcionesImpuesto"
          :key="opcion.value"
        >
          <!-- Card unificada -->
          <div 
            class="unified-card w-full h-[180px] rounded-[20px] transition-all duration-300 mx-auto cursor-pointer p-2 flex flex-col justify-between items-center"
            :class="{ 'selected-card': impuestoSeleccionado === opcion.value }"
            @click="seleccionarImpuesto(opcion.value)"
          >
            <!-- Número grande como elemento principal -->
            <div class="flex-grow flex items-center justify-center w-full">
              <div 
                class="tax-number text-6xl font-bold transition-all duration-300"
                :class="{ 'text-white': impuestoSeleccionado === opcion.value, 'text-blue-600': impuestoSeleccionado !== opcion.value }"
              >
                {{ opcion.label }}
              </div>
            </div>
            
            <!-- Texto "Impuesto" con mejor estilo -->
            <div class="text-center w-full mt-auto">
              <p class="m-0 text-lg font-medium text-gray-800 transition-all duration-300"
                 :class="{ 'text-white font-semibold': impuestoSeleccionado === opcion.value }">
              </p>
            </div>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
    
    <!-- Campo de entrada condicional con estilo mejorado -->
    <div v-if="impuestoSeleccionado === '5%'" class="mt-4 px-2">
      <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <ion-item lines="none" class="p-0">
          <ion-label position="stacked" class="text-gray-700 font-medium mb-2">Código para 5%</ion-label>
          <ion-input
            id="tax-code"
            type="text"
            placeholder="Ingresa tu código para 5%"
            v-model="codigoImpuesto"
            class="border rounded-lg p-2"
          ></ion-input>
        </ion-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/vue'

interface ImpuestoOpcion {
  label: string
  value: string
}

const opcionesImpuesto = ref<ImpuestoOpcion[]>([
  { label: '15%', value: '15%' },
  { label: '5%', value: '5%' },
  { label: '0%', value: '0%' }
])

const impuestoSeleccionado = ref('')
const codigoImpuesto = ref('')

const seleccionarImpuesto = (value: string) => {
  impuestoSeleccionado.value = value
  console.log('Impuesto seleccionado:', value)
  
  // Si se deselecciona 5%, limpiar el código
  if (value !== '5%') {
    codigoImpuesto.value = ''
  }
}
</script>

<style lang="scss" scoped>
/* Estilos unificados para la tarjeta */
.unified-card {
  border: 1px solid #e5e7eb; /* Borde sutil por defecto */
  background-color: white;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 60, 255, 0.30);
    transform: scale(0.98);
    border-color: transparent;
  }
}

/* Estilos para cards seleccionadas */
.selected-card {
  box-shadow: 0px 0px 30px 1px rgba(0, 60, 255, 0.50);
  transform: scale(0.98);
  background-color: rgb(0, 60, 255) !important; /* Color azul específico */
  border-color: transparent !important;
}

/* Estilos para los números de impuesto */
.tax-number {
  transition: all 0.3s ease;
  line-height: 1;
}

/* Estilos para el campo de entrada condicional */
ion-input {
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --background: white;
  --border-radius: 8px;
  margin-top: 8px;
}

/* Estilos responsivos adicionales */
@media (max-width: 768px) {
  .unified-card {
    height: 160px;
  }
  
  .tax-number {
    font-size: 3.5rem;
  }
}

@media (max-width: 576px) {
  .unified-card {
    height: 140px;
    margin: 0.25rem auto;
  }
  
  .tax-number {
    font-size: 3rem;
  }
}
</style>