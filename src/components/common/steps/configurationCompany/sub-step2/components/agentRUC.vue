<template>
  <ion-item>
    <ion-label class="agent-label">Agente de retención: </ion-label>
    <ion-input class="agent-input" v-model="categoria" readonly></ion-input>
  </ion-item>
</template>
    
<script setup lang="ts">
import { IonItem, IonLabel, IonInput } from "@ionic/vue";
import { ref } from 'vue';

// Valor constante directamente como solicitado
const categoria = ref('Si');
</script>
    
<style scoped>
/* Estilos básicos similares al componente informationRUC */
ion-label.agent-label {
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
  flex: 3; /* Hace que el label ocupe más espacio */
  min-width: 70%; /* Asegura un ancho mínimo para el label */
}

ion-input.agent-input {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  --padding-start: 0.5rem;
  flex: 1; /* Hace que el input ocupe menos espacio */
  max-width: 80px; /* Limita el ancho máximo del input */
}

/* Asegura que el ion-item use flexbox correctamente */
ion-item {
  --inner-padding-end: 0;
  display: flex;
}
</style>