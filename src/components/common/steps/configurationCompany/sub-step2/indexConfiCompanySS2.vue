<template>
  <ion-card class="w-full">
    <ion-card-content class="p-3 sm:p-4 md:p-5">
      <!-- Contenedor principal con dos columnas generales -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- Columna 1 - Dividida en 4 filas -->
        <div class="flex flex-col gap-4">
          <!-- Fila 1 Columna 1: regimeRUC y categoryRUC t  -->
          <div className="w-full">
            <h4 className="font-medium text-lg mb-2">Datos informativos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="w-full">
                <regimeRUC />
              </div>
              <div className="w-full">
                <categoryRUC />
              </div>
              <div className="w-full">
                <agentRUC />
              </div>
            </div>
          </div>

          <!-- Fila 2 Columna 1: agentRUC -->
          <div class="w-full">
            <h4 class="font-medium text-lg mb-2">
              Si eres agente de retención es opcional llevar contabilidad
            </h4>
            <accountingRUC />
          </div>

          <!-- Fila 3 Columna 1: artisanRUC -->
          <div class="w-full">
            <artisanRUC />
          </div>

          <!-- Fila 4 Columna 1: dispatch_touris -->
          <div class="w-full">
            <dispatch_touris />
          </div>
        </div>

        <!-- Columna 2 - Dividida en 2 filas -->
        <div class="flex flex-col gap-4">
          <!-- Fila 1 Columna 2: docDefault y parameterSearch -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="w-full">
              <docDefault />
            </div>
            <div class="w-full">
              <parameterSearch />
            </div>
          </div>

          <!-- Fila 2 Columna 2: taxes -->
          <div class="w-full">
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
/* No se necesitan estilos adicionales ya que usamos Tailwind */
</style>
