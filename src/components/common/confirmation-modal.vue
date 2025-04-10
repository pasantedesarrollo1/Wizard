<template>
  <div v-if="isOpen" class="modal-overlay">
    <ion-card class="modal-container">
      <ion-card-content class="modal-content">
        <!-- Texto de confirmación -->
        <p class="modal-text">¿Está seguro que desea finalizar la creación de su empresa?</p>
        
        <!-- Botones de acción -->
        <div class="modal-buttons">
          <ion-button 
            @click="handleConfirm" 
            color="primary"
            expand="block"
            class="confirm-button"
          >
            Sí
          </ion-button>
          <ion-button 
            @click="handleCancel" 
            fill="outline"
            expand="block"
            class="cancel-button"
          >
            No
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { IonCard, IonCardContent, IonButton } from '@ionic/vue';

// Propiedades que recibe el componente
defineProps<{
  isOpen: boolean; // Controla si el modal está abierto o cerrado
}>();

// Eventos que emite el componente
const emit = defineEmits<{
  (e: 'confirm'): void; // Evento cuando se confirma
  (e: 'cancel'): void;  // Evento cuando se cancela
}>();

// Función para manejar la confirmación
const handleConfirm = () => {
  // Emitimos el evento de confirmación
  emit('confirm');
};

// Función para manejar la cancelación
const handleCancel = () => {
  // Emitimos el evento de cancelación
  emit('cancel');
};
</script>

<style scoped>
/* Overlay que cubre toda la pantalla */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Aseguramos que esté por encima de otros elementos */
}

/* Contenedor del modal */
.modal-container {
  width: 90%;
  max-width: 400px;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Contenido del modal */
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Texto del modal */
.modal-text {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Contenedor de botones */
.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

/* Estilos para los botones de Ionic */
.confirm-button {
  --background: #003cff;
  margin: 0;
}

.cancel-button {
  --border-color: #ccc;
  margin: 0;
}
</style>