<template>
  <ion-card>
    <ion-card-content>
      <form @submit.prevent>
        <!-- Título e instrucción -->
        <ion-text color="dark">
          <h5>Ingresa tu Dominio con el cual podrás acceder a tu empresa</h5>
        </ion-text>
        
        <!-- Campo de entrada de dominio -->
        <ion-item class="domain-input-container">
          <ion-label>https://</ion-label>
          <ion-input 
            placeholder="tudominio" 
            class="domain-input"
          ></ion-input>
          <ion-label>.wanqara.com</ion-label>
        </ion-item>
        
        <!-- Texto de ejemplos -->
        <ion-text color="medium" class="ion-margin-top">
          <p>Ejemplos</p>
        </ion-text>
        
        <!-- Imágenes de ejemplo -->
        <div class="example-images">
          <ion-img src="@/assets/ejemploDomain.png" alt="ejemplo de dominio"></ion-img>
          <ion-img src="@/assets/ejemploDomain2.png" alt="ejemplo de dominio2" class="ion-margin-top"></ion-img>
        </div>
      </form>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonText, 
  IonImg 
} from '@ionic/vue';
</script>

<style scoped>
.domain-input-container {
  --padding-start: 0;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.domain-input {
  --padding-start: 8px;
  --padding-end: 8px;
  border: 1px solid var(--ion-color-medium);
  border-radius: 4px;
  margin: 0 8px;
}

.example-images {
  margin-top: 16px;
  max-width: 100%;
}

ion-img {
  max-width: 100%;
}
</style>