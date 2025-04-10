<template>
    <div class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Email que aparecerá en el ticket</ion-label>
        <ion-input
          type="email"
          placeholder="Ingresa el correo"
          v-model="email"
          @ionInput="updateEmail"
          class="custom-input"
          fill="outline"
        ></ion-input>
      </ion-item>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonItem, IonLabel, IonInput } from '@ionic/vue';
  
  // Definimos el evento que emitirá el componente
  const emit = defineEmits(['update:email']);
  
  // Creamos una variable reactiva para el email
  const email = ref('');
  
  // Función para actualizar el email y emitir el evento
  const updateEmail = () => {
    emit('update:email', email.value);
  };
  </script>
  
  <style scoped>
  .custom-input {
    margin-top: 8px;
  }
  
  ion-item {
    --padding-start: 0;
    --inner-padding-end: 0;
  }
  </style>