<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Ventas</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <progress-bar />
        <welcome-ventas />
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  // 1. Importar los componentes de Ionic necesarios
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  // 2. Importar los componentes personalizados
  import progressBar from '@/components/common/progressBar.vue';
  import WelcomeVentas from '@/components/wizard/ventas/welcomeVentas.vue';
  
  // 3. No es necesario registrar los componentes con <script setup>
  // Vue los registra automáticamente y están disponibles en la plantilla
  </script>
  
  <style scoped>
  /* Estilos específicos si son necesarios */
  </style>