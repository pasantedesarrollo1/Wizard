<template>
  <div class="p-3 rounded-lg bg-gray-50">
    <div class="flex items-center justify-between mb-4">
      <div class="flex-1">
        <p class="text-sm text-gray-700 mb-1"> <b>Artesano: </b> Activa e ingresa tu código si eres artesano (opcional)</p>
      </div>
      
      <!-- Toggle Switch moderno -->
      <div 
        class="toggle-switch"
        :class="{ 'active': isArtisan }"
        @click="toggleArtisan"
      >
        <div class="toggle-switch-handle"></div>
      </div>
    </div>
    
    <!-- Campo de entrada con animación de transición -->
    <div 
      class="input-container"
      :class="{ 'visible': isArtisan }"
    >
      <div class="relative">
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <Icon icon="lsicon:number-filled" width="18" height="18" />
        </span>
        <input
          type="text"
          placeholder="Ingresa tu código de artesano"
          :value="artisanNumber"
          @input="updateArtisanNumber($event)"
          class="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-base transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

// Definir props para recibir datos del componente padre
const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

// Definir eventos para comunicarse con el componente padre
const emit = defineEmits(['update']);

// Computed property para obtener el estado actual de isArtisan
const isArtisan = computed(() => {
  // Verificar si existe la propiedad artisan y isArtisan
  if (props.formData && 
      props.formData.artisan && 
      typeof props.formData.artisan.isArtisan === 'boolean') {
    return props.formData.artisan.isArtisan;
  }
  // Valor por defecto si no existe
  return false;
});

// Computed property para obtener el número de artesano actual
const artisanNumber = computed(() => {
  // Verificar si existe la propiedad artisan y artisanNumber
  if (props.formData && 
      props.formData.artisan && 
      props.formData.artisan.artisanNumber !== undefined) {
    return props.formData.artisan.artisanNumber;
  }
  // Valor por defecto si no existe
  return '';
});

// Función para alternar el estado del artesano
const toggleArtisan = () => {
  // Crear una copia del objeto artisan actual o uno nuevo si no existe
  const updatedArtisan = props.formData.artisan 
    ? { ...props.formData.artisan } 
    : { isArtisan: false, artisanNumber: '' };
  
  // Actualizar el valor de isArtisan
  updatedArtisan.isArtisan = !isArtisan.value;
  
  // Si se desmarca la casilla, limpiar el código de artesano
  if (!updatedArtisan.isArtisan) {
    updatedArtisan.artisanNumber = '';
  }
  
  // Emitir evento al componente padre
  emit('update', 'artisan', updatedArtisan);
  
  console.log('Estado de artesano actualizado:', updatedArtisan);
};

// Función para actualizar el número de artesano
const updateArtisanNumber = (event: Event) => {
  const target = event.target as HTMLInputElement;
  
  // Crear una copia del objeto artisan actual o uno nuevo si no existe
  const updatedArtisan = props.formData.artisan 
    ? { ...props.formData.artisan } 
    : { isArtisan: true, artisanNumber: '' };
  
  // Actualizar el valor de artisanNumber
  updatedArtisan.artisanNumber = target.value;
  
  // Emitir evento al componente padre
  emit('update', 'artisan', updatedArtisan);
  
  console.log('Número de artesano actualizado:', updatedArtisan.artisanNumber);
};

// Inicializar el componente
onMounted(() => {
  // Verificar si los datos iniciales son válidos
  if (!props.formData.artisan) {
    // Si no existe artisan, inicializarlo con valores por defecto
    emit('update', 'artisan', {
      isArtisan: false,
      artisanNumber: ''
    });
  }
});
</script>

<style scoped>
/* Estilo para el toggle switch */
.toggle-switch {
  position: relative;
  width: 50px;
  height: 26px;
  border-radius: 13px;
  background-color: #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-switch.active {
  background-color: #3b82f6;
}

.toggle-switch-handle {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.toggle-switch.active .toggle-switch-handle {
  left: calc(100% - 23px);
}

/* Animación para el contenedor de entrada */
.input-container {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.input-container.visible {
  max-height: 100px;
  opacity: 1;
}
</style>