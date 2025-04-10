<template>
  <div class="input-container">
    <input 
      required="required" 
      id="inputField" 
      placeholder="Comprobante de pago" 
      type="text"
      v-model="proofPaymentValue"
      class="custom-input"
    >
    <label class="usernameLabel" for="inputField">Comprobante de pago</label>
  </div>

  <div class="ion-padding-top">
    <ion-button expand="block" color="primary" @click="updateProofPayment">
      <ion-icon slot="start" :icon="saveOutline"></ion-icon>
      Guardar comprobante
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonButton, IonIcon } from '@ionic/vue'
import { saveOutline } from 'ionicons/icons'
import { wizardService } from '@/services/api.ts'

const proofPaymentValue = ref('')

// Función para guardar comprobante
const updateProofPayment = async () => {
  try {
    await wizardService.updateProofPayment(proofPaymentValue.value)
    console.log('Comprobante actualizado correctamente')
  } catch (error) {
    console.log('Error al actualizar')
  }
}
</script>

<style scoped>
/* Variables - mismos colores que typePlan.scss */
:root {
  --primary-color: #003cff;
  --primary-light: rgba(0, 60, 255, 0.1);
  --primary-dark: #0035e0;
  --border-radius: 16px;
}

.input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}

.custom-input {
  border: 2px solid #e0e0e0; /* Borde gris delineado como en typePlan */
  background-color: transparent;
  border-radius: var(--border-radius);
  padding: 12px 15px;
  color: #333;
  font-weight: 500;
  outline: none;
  caret-color: var(--primary-color);
  transition-duration: .3s;
  font-family: Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.custom-input:focus,
.custom-input:valid {
  border-color: var(--primary-color); /* Cambia a azul cuando está enfocado */
  box-shadow: 0 4px 12px rgba(0, 60, 255, 0.15);
}

.usernameLabel {
  position: absolute;
  top: -25px;
  left: 5px;
  color: #555;
  font-size: 14px;
  font-weight: 400;
  font-family: Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
  transition: .2s linear;
  opacity: 0;
}

.custom-input:focus ~ .usernameLabel,
.custom-input:valid ~ .usernameLabel {
  transform: translateX(20px);
  opacity: 1;
  color: var(--primary-color);
}
</style>