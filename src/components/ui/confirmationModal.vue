<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] animate-fadeIn" @click="handleBackdropClick">
    <ion-card 
      class="w-[95%] md:w-[80%] lg:w-[70%] max-w-[800px] rounded-2xl shadow-xl bg-white overflow-hidden animate-scaleIn" 
      @click.stop
    >
      <!-- Título del modal -->
      <div v-if="title" class="px-6 py-4 border-b border-blue-100 bg-blue-50">
        <h3 class="m-0 text-xl font-semibold text-blue-800">{{ title }}</h3>
      </div>
      
      <!-- Cabecera con mensajes -->
      <div class="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <!-- Mensaje principal -->
        <p class="text-lg mb-2 text-blue-800 text-center font-medium">{{ message }}</p>
        
        <!-- Mensaje secundario (si existe) -->
        <p v-if="secondaryMessage" class="text-sm text-blue-600 text-center">
          {{ secondaryMessage }}
        </p>
      </div>
      
      <!-- Contenido del modal -->
      <ion-card-content class="p-4 md:p-5">
        <!-- Contenido personalizado (slot) a todo el ancho -->
        <div class="custom-content-wrapper">
          <slot></slot>
        </div>
        
        <!-- Botones de acción -->
        <div class="flex justify-between mt-5 gap-3 sm:flex-row flex-col-reverse">
          <ion-button 
            fill="outline" 
            class="flex-1 cancel-button"
            color="medium"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </ion-button>
          
          <ion-button 
            color="primary" 
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
  message: "",
  secondaryMessage: "",
  confirmButtonText: "",
  cancelButtonText: "",
  confirmButtonColor: "",
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
  --border-radius: 8px;
  font-weight: 500;
  height: 44px;
  margin: 0;
}

.confirm-button {
  --background: #1a56db;
  --color: white;
}

.cancel-button {
  --border-color: #1a56db;
  --color: #1a56db;
}

/* Contenedor para el contenido personalizado */
.custom-content-wrapper {
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  padding: 0;
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { 
    transform: scale(0.95);
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

/* Estilos para scrollbar personalizado */
.custom-content-wrapper::-webkit-scrollbar {
  width: 5px;
}

.custom-content-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-content-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.custom-content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Sobrescribir estilos de Ionic para mantener consistencia */
:deep(ion-card) {
  margin: 0;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

:deep(ion-card-content) {
  padding: 16px;
}

@media (min-width: 768px) {
  :deep(ion-card-content) {
    padding: 20px;
  }
}
</style>