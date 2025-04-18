<template>
  <span class="block text-left text-gray-700">Selecciona el tipo de documento que deseas emitir por defecto al vender</span>
  <div class=" py-2 bg-white rounded-xl">    
    <!-- Grid mejorado con SelectableCard -->
    <div class="w-full">
      <ion-grid class="w-full mx-auto document-grid">
        <ion-row class="ion-justify-content-center">
          <ion-col
            size="6"
            size-md="6"
            v-for="opcion in opcionesDocumento"
            :key="opcion.value"
            class="pb-2.5"
          >
            <!-- Usando el componente SelectableCard con ancho completo -->
            <SelectableCard
              v-model="selectedDocumentType"
              :value="opcion.value"
              :label="opcion.label"
              :icon="getIconForDocumentType(opcion.value)"
              height="120px"
              class="w-full"
              @update:modelValue="seleccionarDocumento"
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

interface DocumentoOpcion {
  label: string;
  value: string;
}

// Opciones de documentos disponibles
const opcionesDocumento = ref<DocumentoOpcion[]>([
  { label: 'Facturas electrónicas', value: 'facturas' },
  { label: 'Recibos', value: 'recibos' }
]);

// Valores iniciales para el formulario
const initialValues = {
  defaultDocumentType: 'facturas'
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

// Estado local para el tipo de documento seleccionado
const selectedDocumentType = ref(data.value.defaultDocumentType || 'facturas');

// Sincronizar el estado local con el store cuando cambia
onMounted(() => {
  // Inicializar el estado local con el valor del store
  selectedDocumentType.value = data.value.defaultDocumentType || 'facturas';
  
  // Observar cambios en el store para actualizar el estado local
  watch(data.value, (newValue) => {
    if (newValue.defaultDocumentType && newValue.defaultDocumentType !== selectedDocumentType.value) {
      selectedDocumentType.value = newValue.defaultDocumentType;
    }
  }, { deep: true });
});

// Función para seleccionar un documento
const seleccionarDocumento = (value: string) => {
  // Actualizar el store
  updateFields({ defaultDocumentType: value });
  console.log('Documento seleccionado:', value);
};

// Función para obtener el icono según el tipo de documento
const getIconForDocumentType = (documentType: string): string => {
  switch (documentType) {
    case 'facturas':
      return 'mdi:file-document-outline';
    case 'recibos':
      return 'mdi:receipt-text-outline';
    default:
      return 'mdi:file-outline';
  }
};
</script>

<style scoped>
/* Configuración del grid de Ionic con CSS estándar */
.document-grid {
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