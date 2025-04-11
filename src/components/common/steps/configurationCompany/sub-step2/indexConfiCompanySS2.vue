<template>
  <ion-card class="w-full">
    <ion-card-content>
      <!-- Contenedor para los componentes importados -->
      <div class="components-container">
        <!-- Régimen (RIMPE/general)-->
        <regimeRUC />
        
        <!-- Categoaria: Negocio Popular/Emprendimeinto-->
        <categoryRUC />

        <!-- Agente de retencion-->
        <agentRUC />

        <!-- Artesano-->
        <artisanRUC />

        <!-- Documento por defecto-->
        <docDefault />

        <!-- Parametro de busqueda-->
        <parameterSearch />

        <!-- Impuestos-->
        <taxesRUC />

        <!-- despacho posterior y Establecimiento turisicto-->
        <dispatch_touris />
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
/* Contenedor para los componentes importados */
.components-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
