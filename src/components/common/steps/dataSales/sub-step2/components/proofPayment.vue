<template>
  <ion-item lines="none" class="ion-margin-vertical">
    <ion-label position="stacked">
      Ingresa el número de referencia del comprobante de pago
    </ion-label> <br>
    <ion-input
      v-model="proofPaymentValue"
      placeholder="Nro. comprobante pago"
      type="text"
      fill="outline"
    ></ion-input>
  </ion-item>

  <div class="ion-padding-top">
    <ion-button expand="block" color="primary" @click="updateProofPayment">
      <ion-icon slot="start" :icon="saveOutline"></ion-icon>
      Guardar comprobante
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/vue'
import { saveOutline } from 'ionicons/icons'
import { wizardService } from '@/services/api.ts'

const proofPaymentValue = ref('')

// Cargar el valor inicial al montar
onMounted(async () => {
  try {
    const data = await wizardService.getProofPayment()
    proofPaymentValue.value = data
  } catch (error) {
    console.log('Error al cargar datos')
  }
})

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