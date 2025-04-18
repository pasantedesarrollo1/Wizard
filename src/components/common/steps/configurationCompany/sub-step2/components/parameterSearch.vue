<template>
  <span class="block text-left text-gray-700">Elige cómo prefieres buscar tus productos por defecto</span>
  <div class=" py-2 bg-white rounded-xl">    
    <!-- Grid mejorado con SelectableCard -->
    <div class="w-full">
      <ion-grid class="w-full mx-auto parameter-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col
            size="6"
            size-md="6"
            v-for="opcion in opcionesParametro"
            :key="opcion.value"
            class="pb-2.5"
          >
            <!-- Usando el componente SelectableCard con ancho completo -->
            <SelectableCard
              v-model="selectedParameter"
              :value="opcion.value"
              :label="opcion.label"
              :icon="getIconForParameterType(opcion.value)"
              height="120px"
              class="w-full"
              @update:modelValue="seleccionarParametro"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import { useInitialData } from "@/composables/useInitialData";
import SelectableCard from "@/components/ui/selectableCard.vue";

interface ParametroOpcion {
  label: string;
  value: string;
}

// Opciones de parámetros disponibles
const opcionesParametro = ref<ParametroOpcion[]>([
  { label: 'Nombre', value: 'nombre' },
  { label: 'Código', value: 'codigo' }
]);

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

// Estado local para el parámetro seleccionado
const selectedParameter = ref(data.value.defaultSearchParameter || 'nombre');

// Sincronizar el estado local con el store cuando cambia
onMounted(() => {
  // Inicializar el estado local con el valor del store
  selectedParameter.value = data.value.defaultSearchParameter || 'nombre';
  
  // Observar cambios en el store para actualizar el estado local
  watch(() => data.value.defaultSearchParameter, (newValue) => {
    if (newValue && newValue !== selectedParameter.value) {
      selectedParameter.value = newValue;
    }
  }, { immediate: true }); // Add immediate: true to trigger the watcher on mount
});

// Función para seleccionar un parámetro
const seleccionarParametro = (value: string) => {
  // Actualizar el store
  updateFields({ defaultSearchParameter: value });
  console.log('Parámetro seleccionado:', value);
};

// Función para obtener el icono según el tipo de parámetro
const getIconForParameterType = (parameterType: string): string => {
  switch (parameterType) {
    case 'codigo':
      return 'mdi:barcode-scan';
    case 'nombre':
      return 'mdi:format-text';
    default:
      return 'mdi:magnify';
  }
};
</script>

<style scoped>
/* Configuración del grid de Ionic con CSS estándar */
.parameter-grid {
  --ion-grid-padding: 0;
  --ion-grid-column-padding: 8px;
  width: 100%;
}

/* Asegurar que el contenido de las tarjetas esté centrado */
:deep(.selectable-card-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  width: 100%;
}

/* Asegurar que las tarjetas ocupen todo el ancho disponible */
:deep(.selectable-card) {
  width: 100% !important;
}

/* Hacer los iconos más pequeños */
:deep(.selectable-card svg),
:deep(.selectable-card i),
:deep(.selectable-card .icon) {
  font-size: 3rem !important;
  width: 3rem !important;
  height: 3rem !important;
}
</style>