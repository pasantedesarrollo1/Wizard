<template>
  <ion-card class="shadow-md rounded-2xl overflow-hidden w-full">
    <ion-card-content>
      <div class="layout-container w-full">
        <!-- Columna izquierda: contiene vendor-section y proof-section -->
        <div class="left-column">
          <!-- Sección de selección de vendedor -->
          <div class="section-container vendor-section">
            <h4 class="text-lg font-semibold text-gray-800  mt-0 mb-4 pl-3 pb-2 border-b border-opacity-6">Registro de venta</h4>
            <salesListe />
          </div>
          
          <!-- Sección del comprobante de pago -->
          <div class="section-container proof-section">
            <h4 class="text-lg font-semibold text-gray-800 pl-1 mt-0 mb-4 pb-2 border-b border-opacity-6">Ingresa el numero del comprobante de pago</h4>
            <proofPayment />
          </div>
        </div>
        
        <!-- Columna derecha: contiene payment-section -->
        <div class="right-column">
          <!-- Sección del método de pago -->
          <div class="section-container payment-section">
            <h4 class="text-lg font-semibold text-gray-800 pl-3 mt-0 mb-4 pb-2 border-b border-opacity-6">Selecciona el método de pago del Servicio</h4>
            <typePayments />
          </div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue'
import typePayments from "@/components/common/steps/dataSales/sub-step2/components/typePayments.vue"
import proofPayment from "@/components/common/steps/dataSales/sub-step2/components/proofPayment.vue"
import salesListe from "@/components/common/steps/dataSales/sub-step2/components/salesList.vue"
</script>

<style lang="scss" scoped>
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

// Se elimina el media query para pantallas grandes (min-width: 1200px)
</style>