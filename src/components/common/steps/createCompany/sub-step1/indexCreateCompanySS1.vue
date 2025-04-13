<template>
  <ion-card class="wizard-card">
    <ion-card-content class="wizard-content">
      <!-- Contenedor principal con grid responsivo -->
      <div class="wizard-grid">
        <!-- Sección de Empresa -->
        <div class="section-container company-section">
          <h4 class="section-title">Datos de la Empresa</h4>
          <createCompany />
        </div>
        
        <!-- Contenedor para Sucursal y POS -->
        <div class="section-container branch-pos-container">
          <!-- Sección de Sucursal -->
          <div class="sub-section">
            <h4 class="section-title">Datos de la Sucursal</h4>
            <companySucursal />
          </div>
          
          <!-- Sección de Punto de Venta -->
          <div class="sub-section">
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

/* Grid responsivo para organizar las secciones */
.wizard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* En pantallas medianas y grandes, usamos dos columnas */
@media (min-width: 768px) {
  .wizard-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Contenedor de sección con estilos comunes */
.section-container {
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Contenedor específico para sucursal y POS */
.branch-pos-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Subsecciones dentro del contenedor de sucursal y POS */
.sub-section {
  background-color: #f0f7ff;
  border-radius: 8px;
}

/* Título de sección */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-top: 0;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 8px;
}

/* Estilos específicos para cada sección */
.company-section {
  background-color: #f0f7ff;
}
</style>