<template>
  <div class="container-wrapper bg-blue-50">
    <div class="create-company-ss2-container main-container">
      <!-- Tarjeta principal con diseño mejorado -->
      <ion-card class="component-card shadow-lg border border-blue-100">
        <ion-card-header class="bg-blue-500 text-white">
          <ion-card-title class="text-center text-xl font-bold">
            Logo de la Matriz
          </ion-card-title>
          <ion-card-subtitle class="text-center text-white opacity-90">
            Personaliza la identidad visual de tu Matriz
          </ion-card-subtitle>
        </ion-card-header>
        
        <ion-card-content class="p-0">
          <uploadLogo />
        </ion-card-content>
      </ion-card>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import uploadLogo from "@/components/common/steps/createCompany/sub-step2/components/uploadLogo.vue";
</script>
  
<style scoped>
/* Fondo principal con color azul muy claro */
.container-wrapper {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  background-color: #f0f7ff;
  overflow: hidden; /* Evita scroll horizontal */
}

/* Configuración del ancho fijo para pantallas grandes */
.main-container {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .main-container {
    max-width: 768px; /* Ancho fijo de 768px en pantallas de 768px en adelante */
  }
}

.create-company-ss2-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: visible; /* Evita scroll interno */
}
  
.component-card {
  width: 100%;
  margin-bottom: 0;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
}

/* Estilos para el encabezado */
:deep(ion-card-header) {
  background-color: #003cff;
  color: white;
  padding: 1.25rem 1rem;
}

:deep(ion-card-title) {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

:deep(ion-card-subtitle) {
  color: rgba(255, 255, 255, 0.9);
  margin-top: 0.5rem;
}

/* Asegurar que el contenido tome todo el ancho disponible */
:deep(ion-card-content) {
  width: 100%;
  padding: 0;
  background-color: white;
}

/* Estilos específicos para el componente uploadLogo */
:deep(.upload-logo-container) {
  background-color: white;
  border-radius: 0;
  padding: 1.5rem;
}

:deep(.section-title) {
  color: #003cff;
  font-weight: 600;
}

:deep(.section-description) {
  color: #4a5568;
}

/* Estilos para el área de arrastrar y soltar */
:deep(.dropzone) {
  border-color: #e1effe;
  background-color: #f0f7ff;
  transition: all 0.3s ease;
}

:deep(.dropzone:hover), :deep(.dropzone.drag-over) {
  border-color: #003cff;
  background-color: rgba(0, 60, 255, 0.05);
}

:deep(.upload-icon) {
  color: #003cff;
}

:deep(.upload-button) {
  background-color: #003cff;
  transition: all 0.3s ease;
}

:deep(.upload-button:hover) {
  background-color: #0035e0;
}

/* Estilos para la previsualización */
:deep(.preview-container) {
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 1rem;
}

:deep(.logo-preview) {
  border: 2px solid #e1effe;
}

:deep(.edit-button) {
  background-color: #003cff;
  color: white;
}

:deep(.remove-button) {
  background-color: #fee2e2;
}

/* Estilos para el modo de edición */
:deep(.editor-mode) {
  border-color: #e1effe;
}

:deep(.editor-toolbar) {
  background-color: #003cff;
  color: white;
}

:deep(.toolbar-title) {
  color: white;
}

:deep(.save-btn) {
  background-color: white;
  color: #003cff;
}

:deep(.close-btn) {
  color: white;
}

/* Evitar scroll horizontal en todos los elementos */
* {
  max-width: 100%;
}
</style>