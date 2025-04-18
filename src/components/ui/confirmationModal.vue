<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] animate-fadeIn" @click="handleBackdropClick">
    <ion-card class="w-[90%] max-w-[400px] rounded-2xl shadow-xl bg-white overflow-hidden animate-scaleIn" @click.stop>
      <!-- Título del modal (si existe) -->
      <div v-if="title" class="px-6 py-4 border-b border-gray-200">
        <h3 class="m-0 text-xl font-semibold text-gray-800">{{ title }}</h3>
      </div>
      
      <!-- Contenido del modal -->
      <ion-card-content class="p-6">
        <!-- Mensaje principal -->
        <p class="text-lg mb-4 text-gray-800 text-center">{{ message }}</p>
        
        <!-- Mensaje secundario (si existe) -->
        <p v-if="secondaryMessage" class="text-sm text-gray-600 mb-4 text-center">
          {{ secondaryMessage }}
        </p>
        
        <!-- Slot para contenido personalizado -->
        <div class="custom-content-wrapper mb-4">
          <slot></slot>
        </div>
        
        <!-- Botones de acción - SIEMPRE VISIBLES -->
        <div class="flex justify-between mt-4 gap-4 sm:flex-row flex-col-reverse">
          <ion-button 
            fill="outline" 
            class="flex-1 cancel-button"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </ion-button>
          
          <ion-button 
            :color="confirmButtonColor" 
            class="flex-1 confirm-button"
            @click="handleConfirm"
          >
            {{ confirmButtonText }}
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonButton } from "@ionic/vue";

// Propiedades que recibe el componente
interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  secondaryMessage?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  closeOnBackdropClick?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: "",
  message: "¿Está seguro que desea continuar?",
  secondaryMessage: "",
  confirmButtonText: "Sí",
  cancelButtonText: "No",
  confirmButtonColor: "primary",
  closeOnBackdropClick: true
});

// Eventos que emite el componente
const emit = defineEmits<{
  (e: "confirm"): void; // Evento cuando se confirma
  (e: "cancel"): void; // Evento cuando se cancela
}>();

// Función para manejar la confirmación
const handleConfirm = () => {
  // Emitimos el evento de confirmación
  emit("confirm");
};

// Función para manejar la cancelación
const handleCancel = () => {
  // Emitimos el evento de cancelación
  emit("cancel");
};

// Función para manejar el clic en el fondo oscuro
const handleBackdropClick = () => {
  if (props.closeOnBackdropClick) {
    handleCancel();
  }
};
</script>

<style scoped>
/* Estilos para los botones */
.cancel-button, .confirm-button {
  --border-radius: 10px;
  font-weight: 500;
}

/* Contenedor para el contenido personalizado */
.custom-content-wrapper {
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { 
    transform: scale(0.9);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease;
}
</style>