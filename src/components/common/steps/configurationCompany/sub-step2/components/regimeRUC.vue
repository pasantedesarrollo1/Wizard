<template>
  <ion-item>
    <ion-label>Regimen: </ion-label>
    <ion-input v-model="regimen" readonly></ion-input>
  </ion-item>
</template>
    
<script setup lang="ts">
import { IonItem, IonLabel, IonInput } from "@ionic/vue";
import { ref } from 'vue';

// Valor constante directamente como solicitado
const regimen = ref('General');
</script>
    
<style scoped>
/* Estilos básicos similares al componente informationRUC */
ion-label {
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
}

ion-input {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  --padding-start: 0.5rem;
}
</style>