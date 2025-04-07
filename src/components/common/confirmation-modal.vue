<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <!-- Texto de confirmación -->
          <p class="modal-text">¿Está seguro que desea finalizar la creación de su empresa?</p>
          
          <!-- Botones de acción -->
          <div class="modal-buttons">
            <button 
              @click="handleConfirm" 
              class="modal-button confirm-button"
            >
              Sí
            </button>
            <button 
              @click="handleCancel" 
              class="modal-button cancel-button"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
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
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 400px;
    padding: 20px;
  }
  
  /* Contenido del modal */
  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    justify-content: center;
    gap: 16px;
    width: 100%;
  }
  
  /* Estilo base para los botones */
  .modal-button {
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    min-width: 80px;
  }
  
  /* Botón de confirmación */
  .confirm-button {
    background-color: #003cff;
    color: white;
    border: none;
  }
  
  .confirm-button:hover {
    background-color: #0035e0;
  }
  
  /* Botón de cancelación */
  .cancel-button {
    background-color: white;
    color: #333;
    border: 1px solid #ccc;
  }
  
  .cancel-button:hover {
    background-color: #f5f5f5;
  }
  </style>
  
  