<template>
  <div class="create-company-container">
    <!-- Estructura de dos columnas principales -->
    <ion-row class="ion-no-padding full-height-row">
      <!-- Columna izquierda - Datos de la empresa -->
      <ion-col size="12" size-md="6" class="left-column">
        <createCompany />
      </ion-col>

      <!-- Columna derecha - Dividida en dos filas -->
      <ion-col size="12" size-md="6" class="right-column">
        <!-- Fila superior - Punto de venta -->
        <div class="top-section">
          <companyPOS />
        </div>
        
        <!-- Fila inferior - Sucursal -->
        <div class="bottom-section">
          <companySucursal />
        </div>
      </ion-col>
    </ion-row>
  </div>
</template>

<script setup lang="ts">
import { IonCol, IonRow } from '@ionic/vue';
import companyPOS from "@/components/common/steps/createCompany/sub-step1/components/createPOS.vue";
import companySucursal from "@/components/common/steps/createCompany/sub-step1/components/createSucursal.vue";
import createCompany from "@/components/common/steps/createCompany/sub-step1/components/createCompany.vue";
</script>

<style scoped>
.create-company-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.full-height-row {
  width: 100%;
  height: 100%;
  display: flex;
}

.left-column, .right-column {
  height: 100%;
  padding: 0;
}

.right-column {
  display: flex;
  flex-direction: column;
}

.top-section, .bottom-section {
  flex: 1;
  padding: 0.5rem;
  overflow-y: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .full-height-row {
    flex-direction: column;
  }
  
  .left-column, .right-column {
    height: auto;
    min-height: 50vh;
  }
  
  .top-section, .bottom-section {
    min-height: 40vh;
  }
}
</style>