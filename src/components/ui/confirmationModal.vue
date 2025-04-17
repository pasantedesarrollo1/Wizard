<template>
    <div v-if="isOpen" class="modal-overlay" @click="handleBackdropClick">
      <ion-card class="confirmation-modal" @click.stop>
        <!-- Título del modal (si existe) -->
        <div v-if="title" class="modal-header">
          <h3 class="modal-title">{{ title }}</h3>
        </div>
        
        <!-- Contenido del modal -->
        <ion-card-content class="modal-content">
          <!-- Mensaje principal -->
          <p class="modal-message">{{ message }}</p>
          
          <!-- Mensaje secundario (si existe) -->
          <p v-if="secondaryMessage" class="modal-secondary-message">
            {{ secondaryMessage }}
          </p>
          
          <!-- Slot para contenido personalizado -->
          <slot></slot>
          
          <!-- Botones de acción -->
          <div class="modal-actions">
            <ion-button 
              fill="outline" 
              class="cancel-button"
              @click="handleCancel"
            >
              {{ cancelButtonText }}
            </ion-button>
            
            <ion-button 
              :color="confirmButtonColor" 
              class="confirm-button"
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
  
  <style lang="scss" scoped>
  // Variables
  $border-radius: 16px;
  $modal-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  $transition-duration: 0.3s;
  
  // Overlay que cubre toda la pantalla
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn $transition-duration ease;
  }
  
  // Contenedor del modal
  .confirmation-modal {
    width: 90%;
    max-width: 400px;
    border-radius: $border-radius;
    box-shadow: $modal-shadow;
    background-color: white;
    animation: scaleIn $transition-duration ease;
    overflow: hidden;
  }
  
  // Encabezado del modal
  .modal-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #eee;
  }
  
  // Título del modal
  .modal-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }
  
  // Contenido del modal
  .modal-content {
    padding: 1.5rem;
  }
  
  // Mensaje principal
  .modal-message {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #333;
    text-align: center;
  }
  
  // Mensaje secundario
  .modal-secondary-message {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  // Contenedor de botones
  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    gap: 1rem;
  }
  
  // Botones
  .cancel-button, .confirm-button {
    flex: 1;
    --border-radius: 10px;
    font-weight: 500;
  }
  
  // Animaciones
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
  
  // Estilos responsivos
  @media (max-width: 576px) {
    .confirmation-modal {
      width: 95%;
    }
    
    .modal-actions {
      flex-direction: column-reverse;
    }
    
    .cancel-button, .confirm-button {
      margin: 0;
    }
  }
  </style>