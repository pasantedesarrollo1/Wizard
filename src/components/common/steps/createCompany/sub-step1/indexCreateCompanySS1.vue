<template>
  <ion-card class="wizard-card">
    <ion-card-content class="wizard-content">
      <!-- Grid principal con 2 filas -->
      <div class="grid-container">
        <!-- Fila 1: Dos columnas para createCompany y companySucursal -->
        <div class="top-row">
          <!-- Columna 1: createCompany -->
          <div class="section-container company-section">
            <h4 class="section-title">Datos de la Empresa</h4>
            <createCompany />
          </div>
          
          <!-- Columna 2: companySucursal -->
          <div class="section-container branch-section">
            <h4 class="section-title">Datos de la Sucursal</h4>
            <companySucursal />
          </div>
        </div>
        
        <!-- Fila 2: Una columna centrada para companyPOS -->
        <div class="bottom-row">
          <div class="section-container pos-section">
            <h4 class="section-title">Datos del Punto de Emisión</h4>
            <companyPOS />
          </div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue';
import companyPOS from "@/components/common/steps/createCompany/sub-step1/components/createPOS.vue";
import companySucursal from "@/components/common/steps/createCompany/sub-step1/components/createSucursal.vue";
import createCompany from "@/components/common/steps/createCompany/sub-step1/components/createCompany.vue";
</script>

<style scoped>
/* Estilos para la tarjeta principal */
.wizard-card {
  width: 100%;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.wizard-content {
  padding: 16px;
}

/* Grid principal con 2 filas */
.grid-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Fila superior con 2 columnas */
.top-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Fila inferior con 1 columna centrada */
.bottom-row {
  display: flex;
  justify-content: center;
}

/* Contenedor de sección con estilos comunes */
.section-container {
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Estilos específicos para cada sección */
.company-section {
  background-color: #f0f7ff;
}

.branch-section {
  background-color: #f0f7ff;
}

.pos-section {
  background-color: #f0f7ff;
  width: 60%; /* Ancho controlado para centrar sin columnas vacías */
}

/* Título de sección */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .top-row {
    grid-template-columns: 1fr; /* Una columna en pantallas pequeñas */
  }
  
  .pos-section {
    width: 100%; /* Ancho completo en pantallas pequeñas */
  }
}
</style>