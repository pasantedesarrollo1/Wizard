<template>
  <div class="container-wrapper">
    <ion-card class="shadow-md rounded-2xl overflow-hidden w-full main-container">
      <ion-card-content>
        <div class="layout-container w-full">
          <!-- Columna izquierda: contiene vendor-section y proof-section -->
          <div class="left-column">
            <!-- Sección de selección de vendedor -->
            <div class="section-container vendor-section">
              <h4 class="text-lg font-semibold text-gray-800 mt-0 mb-4 pl-3 pb-2 border-b border-opacity-6">Selecciona tu nombre para registrar tu venta</h4>
              <salesListe />
            </div>
            
            <!-- Sección del método de pago -->
            <div class="section-container payment-section">
              <h4 class="text-lg font-semibold text-gray-800 pl-3 mt-0 mb-4 pb-2 border-b border-opacity-6">Selecciona el método de pago del Servicio</h4>
              <typePayments />
            </div>
          </div>
          
          <!-- Seccion de formularios -->
          <div class="right-column">
            <div class="section-container proof-section">
              <h4 class="text-lg font-semibold text-gray-800 pl-1 mt-0 mb-4 pb-2 border-b border-opacity-6">Llena los siguientes datos</h4>
              <transferPayment />
            </div>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue'
import typePayments from "@/components/common/steps/dataSales/sub-step2/components/typePayments.vue"
import transferPayment from "@/components/common/steps/dataSales/sub-step2/components/transferPayment.vue"
import salesListe from "@/components/common/steps/dataSales/sub-step2/components/salesList.vue"
</script>

<style lang="scss" scoped>
// Contenedor principal con ancho máximo
.container-wrapper {
  @apply w-full flex justify-center;
}

.main-container {
  width: 100%;
  max-width: 100%;
  
  @media (min-width: 768px) {
    max-width: 768px; // Ancho fijo de 768px en pantallas de 768px en adelante
  }
}

// Estilos base para las secciones
.section-container {
  @apply mb-6 p-2 rounded-xl shadow-sm;
  background-color: #f9fafb;
  
  &:last-child {
    @apply mb-0;
  }
}

// Colores específicos para cada sección
.vendor-section {
  background-color: #f0f7ff; // Tono azul muy claro
}

.payment-section {
  background-color: #f7faff; // Tono azul aún más claro
  @apply h-full flex flex-col;
}

.proof-section {
  background-color: #f9fbff; // Tono azul casi imperceptible
}

// Media queries y layout responsive
@media (max-width: 767px) {
  // Diseño móvil: todo en una columna
  .left-column, .right-column {
    @apply w-full;
  }
  
  .section-container {
    @apply mb-4;
  }
}

@media (min-width: 768px) {
  // Diseño tablet y desktop: dos filas, primera fila con dos columnas iguales
  .layout-container {
    @apply flex flex-col;
  }
  
  .left-column {
    @apply flex flex-row w-full mb-5;
    gap: 20px;
  }
  
  .vendor-section, .proof-section {
    @apply w-1/2 m-0;
  }
  
  .right-column {
    @apply w-full;
  }
  
  .payment-section {
    @apply w-full m-0;
  }
}
</style>