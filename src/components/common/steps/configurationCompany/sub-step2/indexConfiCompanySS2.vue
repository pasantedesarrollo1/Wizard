<template>
  <ion-card class="w-full">
    <ion-card-content class="p-3 sm:p-4 md:p-5">
      <!-- Contenedor principal con 4 filas -->
      <div class="flex flex-col gap-3 sm:gap-4 lg:gap-6">
        <!-- Fila 1: Régimen y Categoría -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div class="w-full">
            <regimeRUC />
          </div>
          <div class="w-full">
            <categoryRUC />
          </div>
        </div>
        
        <!-- Fila 2: Agente de retención y Artesano -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div class="w-full">
            <agentRUC />
          </div>
          <div class="w-full">
            <artisanRUC />
          </div>
        </div>
        
        <!-- Fila 3: Documento por defecto, Parámetro de búsqueda e Impuestos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div class="w-full">
            <docDefault />
          </div>
          <div class="w-full sm:col-span-1">
            <parameterSearch />
          </div>
          <div class="w-full sm:col-span-2 lg:col-span-1">
            <taxesRUC />
          </div>
        </div>
        
        <!-- Fila 4: Despacho posterior y Establecimiento turístico -->
        <div class="w-full">
          <dispatch_touris />
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue';
import regimeRUC from "./components/regimeRUC.vue";
import categoryRUC from "./components/categoryRUC.vue";
import agentRUC from "./components/agentRUC.vue";
import artisanRUC from "./components/artisanRUC.vue";
import docDefault from "./components/docDefault.vue";
import parameterSearch from "./components/parameterSearch.vue";
import taxesRUC from "./components/taxesRUC.vue";
import dispatch_touris from "./components/dispatch-tourist.vue";
</script>

<style scoped>
/* No se necesitan estilos adicionales ya que usamos Tailwind */
</style>