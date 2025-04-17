<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <!-- Título descriptivo -->
    <span class="block mb-4 text-gray-700">Selecciona el tipo de documento que deseas emitir por defecto al vender</span>
    
    <!-- Grid mejorado con SelectableCard -->
    <ion-grid class="document-grid">
      <ion-row class="ion-justify-content-center">
        <ion-col
          size="12"
          size-sm="6"
          size-md="6"
          v-for="opcion in opcionesDocumento"
          :key="opcion.value"
        >
          <!-- Usando el componente SelectableCard -->
          <SelectableCard
            v-model="selectedDocumentType"
            :value="opcion.value"
            :label="opcion.label"
            :icon="getIconForDocumentType(opcion.value)"
            height="150px"
            @update:modelValue="seleccionarDocumento"
          />
        </ion-col>
      </ion-row>
    </ion-grid>
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
  watch(() => data.value.defaultDocumentType, (newValue) => {
    if (newValue && newValue !== selectedDocumentType.value) {
      selectedDocumentType.value = newValue;
    }
  });
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

<style lang="scss" scoped>
// Configuración del grid de Ionic
.document-grid {
  --ion-grid-padding: 0;
  --ion-grid-column-padding: 10px;
  width: 100%;
  margin: 0;
}

// Media queries para responsividad
@media (max-width: 576px) {
  ion-col {
    padding-bottom: 10px;
  }
}
</style>