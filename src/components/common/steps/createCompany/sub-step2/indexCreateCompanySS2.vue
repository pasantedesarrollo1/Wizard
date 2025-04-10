<template>
    <div class="create-company-ss2-container">
      <!-- Upload Logo Component -->
      <ion-card class="component-card">
        <ion-card-content>
          <uploadLogo />
        </ion-card-content>
      </ion-card>
      
      <!-- Create Domain Component -->
      <ion-card class="component-card">
        <ion-card-content>
          <createDomain />
        </ion-card-content>
      </ion-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IonCard, IonCardContent } from '@ionic/vue';
  import createDomain from "./components/createDomain.vue";
  import uploadLogo from "./components/uploadLogo.vue";
  </script>
  
  <style scoped>
  .create-company-ss2-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto;
  }
  
  .component-card {
    width: 100%;
    margin-bottom: 16px;
  }
  
  /* Ensure content takes full width */
  :deep(ion-card-content) {
    width: 100%;
    padding: 16px;
  }
  </style>