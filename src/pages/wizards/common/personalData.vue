<template>
  <div class="ion-padding">
    <form @submit.prevent="handleSubmit">
      <IonItem>
        <IonLabel position="floating">Nombre</IonLabel>
        <IonInput v-model="formData.name" type="text" required />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Correo Electrónico</IonLabel>
        <IonInput v-model="formData.email" type="email" required />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Contraseña</IonLabel>
        <IonInput v-model="formData.password" type="password" required />
      </IonItem>
      <div class="ion-padding-top">
        <IonButton expand="full" type="submit" :disabled="!isValidForm">Enviar</IonButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';

const formData = ref({
  name: '',
  email: '',
  password: ''
});

const isValidForm = computed(() => {
  return formData.value.name !== '' &&
         formData.value.email.includes('@') &&
         formData.value.password.length >= 6;
});

const handleSubmit = () => {
  alert(`Nombre: ${formData.value.name}\nEmail: ${formData.value.email}`);
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>