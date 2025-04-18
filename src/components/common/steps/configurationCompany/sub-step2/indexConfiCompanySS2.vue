<template>
  <ion-card class="shadow-lg rounded-xl overflow-hidden">
    <ion-card-content>
      <!-- Contenedor principal con dos columnas generales -->
      <div class="flex flex-col lg:flex-row gap-3">
        <!-- Columna 1 - Información y configuración principal (60%) -->
        <div class="flex flex-col gap-2 lg:w-[55%]">
          <!-- Sección 1: Datos informativos -->
          <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <h3 class="font-medium text-lg mb-3 flex items-center text-black">
              <b>              Datos informativos <span class="text-blue-700 pl-1">*</span>
              </b>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <regimeRUC />
              <categoryRUC />
              <agentRUC />
            </div>
          </div>

          <!-- Sección 2: Contabilidad -->
          <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <accountingRUC />
          </div>

          <!-- Sección 3: Artesano -->
          <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <artisanRUC />
          </div>

          <!-- Sección 4: Despacho y Turismo -->
          <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <dispatch_touris />
          </div>
        </div>

        <!-- Columna 2 - Configuraciones adicionales (40%) -->
        <div class="flex flex-col gap-2 lg:w-[45%]">
          <!-- Sección 1: Preferencias de Operación (título general) -->
          <!-- Grid de 2 columnas para las dos secciones independientes -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Columna para docDefault -->

            <div
              class="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
            >
              <docDefault />
            </div>

            <!-- Columna para parameterSearch -->

            <div
              class="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
            >
              <parameterSearch />
            </div>
          </div>

          <!-- Sección 2: Impuestos -->
          <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <taxesRUC />
          </div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent } from "@ionic/vue";
import regimeRUC from "./components/regimeRUC.vue";
import categoryRUC from "./components/categoryRUC.vue";
import agentRUC from "./components/agentRUC.vue";
import accountingRUC from "./components/accountingRUC.vue";
import artisanRUC from "./components/artisanRUC.vue";
import docDefault from "./components/docDefault.vue";
import parameterSearch from "./components/parameterSearch.vue";
import taxesRUC from "./components/taxesRUC.vue";
import dispatch_touris from "./components/dispatch-tourist.vue";
</script>

<style scoped>
/* Estilos adicionales para mejorar la apariencia */
:deep(ion-card) {
  margin: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

:deep(ion-card-header) {
  padding: 1.25rem;
}

@media (max-width: 640px) {
  :deep(ion-card-content) {
    padding: 1rem;
  }
}
</style>
