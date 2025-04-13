<template>
  <div class="config-company-container">
    <!-- Tarjeta principal con sombra y bordes redondeados -->
    <ion-card class="main-card">
      <ion-card-header>
        <ion-card-title class="card-title">Búsqueda y Validación de RUC</ion-card-title>
        <ion-card-subtitle class="card-subtitle">
          Ingresa tu RUC para validar la información de tu empresa
        </ion-card-subtitle>
      </ion-card-header>
      
      <ion-card-content class="search-section">
        <searchRUC @ruc-searched="handleRucSearched" />
      </ion-card-content>
    </ion-card>

    <!-- Tarjeta de información que aparece cuando se encuentra un RUC -->
    <ion-card v-if="showRucInfo" class="info-card">
      <ion-card-header>
        <ion-card-title class="card-title">Información Validada</ion-card-title>
      </ion-card-header>
      
      <ion-card-content class="info-section">
        <informationRUC :ruc-data="rucData" />
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue'
import searchRUC from "./components/searchRUC.vue";
import informationRUC from "./components/informationRUC.vue";

// Estado para controlar la visibilidad del componente informationRUC
const showRucInfo = ref(false);

// Datos del RUC que se pasarán al componente informationRUC
const rucData = ref({
  ruc: '',
  razonSocial: '',
  estado: ''
});

// Función que se ejecuta cuando se busca un RUC
const handleRucSearched = (data: any) => {
  // Actualizar los datos del RUC
  rucData.value = data;
  // Mostrar el componente informationRUC
  showRucInfo.value = true;
};
</script>

<style scoped>
.config-company-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.main-card, .info-card {
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background-color: white;
  transition: all 0.3s ease;
}

.main-card:hover, .info-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.card-subtitle {
  color: #666;
  font-size: 0.9rem;
}

.search-section, .info-section {
  padding: 16px;
}

.info-card {
  background-color: #f0f7ff;
  border-left: 4px solid var(--ion-color-primary);
}

/* Animación para la tarjeta de información */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.info-card {
  animation: fadeIn 0.5s ease-out;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .config-company-container {
    padding: 0 8px;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
}
</style>