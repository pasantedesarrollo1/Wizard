<template>
    <div class="information-ruc-container">
      <!-- Título del componente -->
      <h4 class="title-heading">Validación de RUC</h4>
      
      <!-- Contenedor de la información del RUC -->
      <div class="ruc-info-container">
        <!-- RUC -->
        <div class="info-item">
          <div class="label-container">
            <ion-label class="info-label">RUC</ion-label>
          </div>
          <div class="value-container">
            <div class="info-value">{{ rucData.ruc }}</div>
          </div>
        </div>
        
        <!-- Razón social -->
        <div class="info-item">
          <div class="label-container">
            <ion-label class="info-label">Razón social</ion-label>
          </div>
          <div class="value-container">
            <div class="info-value">{{ rucData.razonSocial }}</div>
          </div>
        </div>
        
        <!-- Estado contribuyente -->
        <div class="info-item">
          <div class="label-container">
            <ion-label class="info-label">Estado contribuyente en el RUC</ion-label>
          </div>
          <div class="value-container">
            <div class="info-value" :class="{ 'estado-activo': rucData.estado === 'ACTIVO' }">
              {{ rucData.estado }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IonLabel } from '@ionic/vue';
  
  // Recibir los datos del RUC como prop desde el componente padre
    props = defineProps({
    rucData: {
      type: Object,
      default: () => ({
        ruc: '1792780241001',
        razonSocial: 'TODONEG S.A.',
        estado: 'ACTIVO'
      })
    }
  });
  </script>
  
  <style scoped>
  .information-ruc-container {
    width: 100%;
    padding: 0.5rem 0;
  }
  
  .title-heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #333;
    padding-left: 0.5rem;
  }
  
  .ruc-info-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.5rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .label-container {
    margin-bottom: 0.5rem;
  }
  
  .info-label {
    font-weight: 500;
    color: #555;
    font-size: 0.95rem;
  }
  
  .value-container {
    padding: 0.5rem 0;
  }
  
  .info-value {
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    padding: 0.25rem 0;
  }
  
  .estado-activo {
    color: #10b981; /* Color verde para estado activo */
    font-weight: 600;
  }
  
  /* Estilos responsivos */
  @media (min-width: 768px) {
    .info-item {
      flex-direction: row;
      align-items: center;
    }
    
    .label-container {
      width: 40%;
      margin-bottom: 0;
    }
    
    .value-container {
      width: 60%;
    }
  }
  </style>