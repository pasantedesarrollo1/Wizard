<template>
    <ion-card>
      <ion-card-content>
        <form>
          <ion-item lines="none">
            <ion-label>Carga tu logo aquí</ion-label>
          </ion-item>
          
          <div class="file-upload-container">
            <label for="logo-upload" class="custom-file-upload">
              <ion-icon :icon="cloudUploadOutline" class="upload-icon"></ion-icon>
              <span>Seleccionar archivo</span>
            </label>
            <input 
              id="logo-upload" 
              type="file" 
              class="file-input"
              accept="image/*"
            />
            <div class="selected-file-name">
              <span v-if="selectedFile">{{ selectedFile.name }}</span>
              <span v-else>Ningún archivo seleccionado</span>
            </div>
          </div>
        </form>
        
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { 
    IonCard, 
    IonCardContent, 
    IonItem, 
    IonLabel, 
    IonIcon 
  } from '@ionic/vue';
  import { cloudUploadOutline } from 'ionicons/icons';
  
  // Estado para almacenar el archivo seleccionado
  const selectedFile = ref<File | null>(null);
  
  // Función para manejar la selección de archivos
  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedFile.value = input.files[0];
    } else {
      selectedFile.value = null;
    }
  };
  
  // Agregar el event listener después de que el componente se monte
  const onMounted = () => {
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) {
      fileInput.addEventListener('change', handleFileChange);
    }
  };
  
  // Limpiar el event listener cuando el componente se desmonte
  const onUnmounted = () => {
    const fileInput = document.getElementById('logo-upload');
    if (fileInput) {
      fileInput.removeEventListener('change', handleFileChange);
    }
  };
  
  // Llamar a onMounted y onUnmounted
  import { onMounted as vueOnMounted, onUnmounted as vueOnUnmounted } from 'vue';
  vueOnMounted(onMounted);
  vueOnUnmounted(onUnmounted);
  </script>
  
  <style scoped>
  .file-upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
  }
  
  .custom-file-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background-color: var(--ion-color-primary);
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .custom-file-upload:hover {
    background-color: var(--ion-color-primary-shade);
  }
  
  .upload-icon {
    font-size: 20px;
  }
  
  .file-input {
    display: none;
  }
  
  .selected-file-name {
    margin-top: 8px;
    font-size: 14px;
    color: var(--ion-color-medium);
  }
  </style>