<!--central.illarli-->
<template>
    <div>
      <form>
        <!-- Configuracion de documentos sistema.illarli-->
        <div>
          <label class="block text-center">¿Qué tipo de documento por defecto utilizará su Empresa?</label>
          <br />
          <!-- Reemplazamos el select por un contenedor de cards -->
          <div class="cards-container">
            <!-- Iteramos sobre las opciones para crear una card por cada tipo de documento -->
            <div 
              v-for="opcion in opcionesDocumentDefault" 
              :key="opcion.value" 
              class="company-card" 
              :class="{ 'selected': DocumentDefaultSeleccionado === opcion.value }"
              @click="seleccionarDocumentDefault(opcion.value)"
            >
              <!-- Texto centrado dentro de la card -->
            <div class="card-text">{{ opcion.label }}</div>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits, defineProps, watch, onMounted } from 'vue';
  
  // Definimos los eventos que puede emitir este componente
  const emit = defineEmits<{
    (e: 'update:DocumentDefault', value: string): void;
  }>();
  
  // Definimos las propiedades que recibe el componente
  const props = defineProps<{
    recivoSeleccionado?: string;
    documentTypeSeleccionado?: string;
  }>();
  
  // Definimos la interfaz para las opciones de tipo de documento
  interface DocumentDefaultOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de documento por defecto
  // Inicializamos con un array vacío que se llenará dinámicamente
  const opcionesDocumentDefault = ref<DocumentDefaultOpcion[]>([]);
  
  // Variable para almacenar el tipo de documento seleccionado
  const DocumentDefaultSeleccionado = ref('');
  
  // Función para actualizar las opciones basadas en las selecciones previas
  const actualizarOpciones = () => {
    // Limpiamos el array de opciones
    opcionesDocumentDefault.value = [];
    
    // Si se seleccionó "Si voy a manejar recivos" en configRecivos.vue
    if (props.recivoSeleccionado === 'si') {
      // Agregamos la opción de recibos
      opcionesDocumentDefault.value.push({ 
        label: 'Recivos', 
        value: 'recivos' 
      });
      
      // Mensaje de depuración
      console.log('Se agregó la opción de recibos');
    }
    
    // Si se seleccionó alguna opción en configDocumentType.vue
    if (props.documentTypeSeleccionado) {
      if (props.documentTypeSeleccionado === 'electronico') {
        // Agregamos la opción de documento electrónico
        opcionesDocumentDefault.value.push({ 
          label: 'Electronico', 
          value: 'electronico' 
        });
        
        // Mensaje de depuración
        console.log('Se agregó la opción de documento electrónico');
      } else if (props.documentTypeSeleccionado === 'preimpresos') {
        // Agregamos la opción de documento preimpreso
        opcionesDocumentDefault.value.push({ 
          label: 'Preimpresos', 
          value: 'preimpresos' 
        });
        
        // Mensaje de depuración
        console.log('Se agregó la opción de documento preimpreso');
      }
    }
    
    // Mensaje de depuración con todas las opciones
    console.log('Opciones actualizadas:', opcionesDocumentDefault.value);
  };
  
  // Observamos cambios en las propiedades para actualizar las opciones
  watch(() => props.recivoSeleccionado, () => {
    actualizarOpciones();
  });
  
  watch(() => props.documentTypeSeleccionado, () => {
    actualizarOpciones();
  });
  
  // Inicializamos las opciones al montar el componente
  onMounted(() => {
    actualizarOpciones();
  });
  
  // Función para seleccionar un tipo de documento y emitir el evento
  const seleccionarDocumentDefault = (value: string) => {
    // Actualizamos el valor seleccionado
    DocumentDefaultSeleccionado.value = value;
    
    // Emitimos el evento para notificar al componente padre
    emit('update:DocumentDefault', value);
    
    // Mensaje de depuración
    console.log('DocumentDefault seleccionado:', value);
  };
  </script>
  
  <style scoped>
  /* Contenedor para centrar las cards */
  .cards-container {
    display: flex;
    justify-content: center; /* Centra las cards horizontalmente */
    gap: 1rem; /* Espacio entre las cards */
    margin-top: 0.5rem;
  }
  
  /* Estilos básicos para las cards */
  .company-card {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 1rem;
    cursor: pointer;
    min-width: 120px;
    
    /* Centrar el texto dentro de la card */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  /* Estilo para la card seleccionada */
  .company-card.selected {
    border-color: black;
    background-color: #f0f0f0;
  }
  </style>