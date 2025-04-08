<template>
  <div>
    <form>
      <!-- Configuracion de documentos sistema.illarli-->
      <div>
        <label class="block text-center">¿Qué tipo de documento utilizará su Empresa?</label>
        <br />
        <!-- Contenedor de cards con selección múltiple -->
        <div class="cards-container">
          <!-- Iteramos sobre las opciones para crear una card por cada tipo de documento -->
          <div 
            v-for="opcion in opcionesDocumentType" 
            :key="opcion.value" 
            class="company-card" 
            :class="{ 
              'selected': documentTypesSeleccionados.includes(opcion.value),
              'default': documentTypeDefault === opcion.value 
            }"
            @click="toggleDocumentType(opcion.value)"
          >
            <!-- Texto centrado dentro de la card -->
            <div class="card-text">{{ opcion.label }}</div>
            
            <!-- Indicador de opción por defecto -->
            <div v-if="documentTypeDefault === opcion.value" class="default-badge">
              Por defecto
            </div>
            
            <!-- Botón para establecer como predeterminado (solo visible cuando hay múltiples selecciones y no es la predeterminada) -->
            <button 
              v-if="documentTypesSeleccionados.length > 1 && documentTypeDefault !== opcion.value && documentTypesSeleccionados.includes(opcion.value)" 
              type="button"
              class="set-default-btn"
              @click.stop="setDefaultDocumentType(opcion.value)"
            >
              Establecer como predeterminado
            </button>
          </div>
        </div>
        
        <!-- Input de firma electrónica (solo visible cuando se selecciona Factura Electronica) -->
        <div v-if="documentTypesSeleccionados.includes('electronico')" class="file-input-container">
          <label for="firma-electronica" class="file-label">
            Carga tu firma electonica (opcional para la creacion de la empresa)
          </label>
          <input 
            type="file" 
            id="firma-electronica" 
            class="file-input"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Definimos los eventos que puede emitir este componente
const emit = defineEmits<{
  (e: 'update:DocumentTypes', value: string[]): void;
  (e: 'update:DefaultDocumentType', value: string | null): void; // Nuevo evento para la opción por defecto
}>();

// Definimos la interfaz para las opciones de tipo de documento
interface DocumentTypeOpcion {
  label: string;
  value: string;
}

// Array con las opciones de tipo de documento
const opcionesDocumentType = ref<DocumentTypeOpcion[]>([
  { label: 'Factura Electronica', value: 'electronico' },
  { label: 'Recivos', value: 'recivos' },
]);

// Array para almacenar los tipos de documento seleccionados
const documentTypesSeleccionados = ref<string[]>([]);

// Variable para almacenar el tipo de documento por defecto
const documentTypeDefault = ref<string | null>(null);

// Función para alternar la selección de un tipo de documento
const toggleDocumentType = (value: string) => {
  // Verificamos si el valor ya está seleccionado
  const index = documentTypesSeleccionados.value.indexOf(value);
  
  if (index === -1) {
    // Si no está seleccionado, lo agregamos al array
    documentTypesSeleccionados.value.push(value);
    
    // Si es la única opción seleccionada, la establecemos como predeterminada automáticamente
    if (documentTypesSeleccionados.value.length === 1) {
      documentTypeDefault.value = value;
      emit('update:DefaultDocumentType', value);
    }
  } else {
    // Si ya está seleccionado, lo quitamos del array
    documentTypesSeleccionados.value.splice(index, 1);
    
    // Si estamos quitando la opción predeterminada
    if (documentTypeDefault.value === value) {
      // Si aún queda una opción seleccionada, la convertimos en predeterminada
      if (documentTypesSeleccionados.value.length > 0) {
        documentTypeDefault.value = documentTypesSeleccionados.value[0];
      } else {
        documentTypeDefault.value = null;
      }
      emit('update:DefaultDocumentType', documentTypeDefault.value);
    }
  }
  
  // Emitimos el evento para notificar al componente padre con el array completo
  emit('update:DocumentTypes', documentTypesSeleccionados.value);
  
  // Mensaje de depuración
  console.log('DocumentTypes seleccionados:', documentTypesSeleccionados.value);
  console.log('DocumentType por defecto:', documentTypeDefault.value);
};

// Función para establecer un tipo de documento como predeterminado
const setDefaultDocumentType = (value: string) => {
  // Solo permitimos establecer como predeterminado si está seleccionado
  if (documentTypesSeleccionados.value.includes(value)) {
    documentTypeDefault.value = value;
    emit('update:DefaultDocumentType', value);
    console.log('Nuevo DocumentType por defecto:', value);
  }
};

// Observamos cambios en la selección para mantener consistencia con la opción por defecto
watch(documentTypesSeleccionados, (newSelection) => {
  // Si no hay selección, no hay opción por defecto
  if (newSelection.length === 0) {
    documentTypeDefault.value = null;
  }
  // Si hay selección pero la opción por defecto no está entre las seleccionadas
  else if (documentTypeDefault.value === null || !newSelection.includes(documentTypeDefault.value)) {
    documentTypeDefault.value = newSelection[0];
  }
}, { deep: true });
</script>

<style scoped>
/* Contenedor para centrar las cards */
.cards-container {
  display: flex;
  justify-content: center; /* Centra las cards horizontalmente */
  gap: 1rem; /* Espacio entre las cards */
  margin-top: 0.5rem;
  flex-wrap: wrap; /* Permite que las cards se ajusten en pantallas pequeñas */
}

/* Estilos básicos para las cards */
.company-card {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 1rem;
  cursor: pointer;
  min-width: 120px;
  position: relative; /* Necesario para posicionar el badge y botones */
  
  /* Centrar el texto dentro de la card */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.2s ease;
}

/* Estilo para la card seleccionada */
.company-card.selected {
  border-color: black;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Estilo para la card por defecto */
.company-card.default {
  border-color: #4CAF50; /* Color verde para indicar que es la opción por defecto */
  border-width: 2px;
}

/* Badge para indicar la opción por defecto */
.default-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #4CAF50;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
}

/* Botón para establecer como predeterminado */
.set-default-btn {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
}

.set-default-btn:hover {
  background-color: #e0e0e0;
}

/* Efecto hover */
.company-card:hover {
  border-color: #999;
}

/* Contenedor para el input de archivo usando grid */
.file-input-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 2rem; /* Espacio entre las cards y el input */
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  background-color: #f9f9f9;
}

/* Estilo para la etiqueta del input */
.file-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* Estilo básico para el input de archivo */
.file-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>