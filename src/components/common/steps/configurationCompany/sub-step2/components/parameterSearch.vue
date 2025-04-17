<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <span >Elige cómo prefieres buscar tus productos por defecto</span>
    <!-- Grid mejorado con animaciones y efectos -->
    <ion-grid class="parameter-grid">
      <ion-row class="ion-justify-content-center">
        <ion-col
          size="12"
          size-sm="6"
          size-md="6"
          v-for="opcion in opcionesParametro"
          :key="opcion.value"
        >
          <!-- Card unificada -->
          <div 
            class="unified-card w-full h-[150px] rounded-[20px] transition-all duration-300 mx-auto cursor-pointer p-2 flex flex-col justify-between items-center"
            :class="{ 'selected-card': data.defaultSearchParameter === opcion.value }"
            @click="seleccionarParametro(opcion.value)"
          >
            <!-- Contenedor del icono grande -->
            <div class="flex-grow flex items-center justify-center w-full">
              <Icon 
                :icon="getIconForParameterType(opcion.value)" 
                class="w-20 h-20 transition-all duration-300"
                :class="{ 'text-white': data.defaultSearchParameter === opcion.value }"
              />
            </div>
            
            <!-- Texto del parámetro con mejor estilo -->
            <div class="text-center w-full mt-auto">
              <p class="m-0 text-lg font-medium text-gray-800 transition-all duration-300"
                 :class="{ 'text-white font-semibold': data.defaultSearchParameter === opcion.value }">
                {{ opcion.label }}
              </p>
            </div>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue'
import { Icon } from '@iconify/vue'
import { useInitialData } from "@/composables/useInitialData"

interface ParametroOpcion {
  label: string
  value: string
}

const opcionesParametro = ref<ParametroOpcion[]>([
  { label: 'Nombre', value: 'nombre' },  
  { label: 'Código', value: 'codigo' }
])

// Valores iniciales para el formulario
const initialValues = {
  defaultSearchParameter: 'nombre'
};

// Usar el composable useInitialData para manejar los datos
const { data, updateFields } = useInitialData(
  "companyConfig",
  initialValues,
  {
    autoSave: true,
    debug: false
  }
);

const seleccionarParametro = (value: string) => {
  updateFields({ defaultSearchParameter: value })
  console.log('Parámetro seleccionado:', value)
}

// Función para obtener el icono según el tipo de parámetro
const getIconForParameterType = (parameterType: string): string => {
  switch (parameterType) {
    case 'codigo':
      return 'mdi:barcode-scan'
    case 'nombre':
      return 'mdi:format-text'
    default:
      return 'mdi:magnify'
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

/* Estilos para el contenedor de iconos */
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* Estilos responsivos adicionales */
@media (max-width: 768px) {
  .unified-card {
    height: 160px;
  }
}

@media (max-width: 576px) {
  .unified-card {
    height: 140px;
    margin: 0.25rem auto;
  }
}
</style>