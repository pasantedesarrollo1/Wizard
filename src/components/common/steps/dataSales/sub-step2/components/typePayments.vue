<template>
  <div class="ion-padding-vertical">
    <ion-text color="medium" class="ion-text-center">
      <h5>Seleccione el método de pago del Servicio</h5>
    </ion-text>

    <ion-grid>
      <ion-row class="ion-justify-content-center">
        <ion-col
          size="12"
          size-sm="6"
          size-md="3"
          v-for="opcion in opcionesTipoPago"
          :key="opcion.value"
        >
          <ion-card
            :class="{ 'selected-card': TipoPagoSeleccionado === opcion.value }"
            button
            @click="seleccionarTipoCompania(opcion.value)"
          >
            <ion-card-content class="ion-text-center">
              <!-- Mostrar imágenes PNG para todos los métodos de pago -->
              <div class="payment-icon-container">
                <img 
                  :src="getImageForPaymentType(opcion.value)" 
                  :alt="opcion.label" 
                  class="payment-icon" 
                />
              </div>
              <ion-text>
                <p>{{ opcion.label }}</p>
              </ion-text>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
} from '@ionic/vue'

interface TipoPagoOpcion {
  label: string
  value: string
}

const opcionesTipoPago = ref<TipoPagoOpcion[]>([
  { label: 'Tarjeta Nuevi', value: 'tarjeta-nuevi' },
  { label: 'Datafast Vouchet', value: 'datafast-voucher' },
  { label: 'Transferencia', value: 'transferencia' },
  { label: 'Efectivo', value: 'efectivo' }
])

const TipoPagoSeleccionado = ref('')

const seleccionarTipoCompania = (value: string) => {
  TipoPagoSeleccionado.value = value
  console.log('Tipo de Pago seleccionado:', value)
}

// Función para obtener la imagen según el tipo de pago
const getImageForPaymentType = (paymentType: string): string => {
  switch (paymentType) {
    case 'tarjeta-nuevi':
      return new URL('@/assets/icons/card.png', import.meta.url).href
    case 'datafast-voucher':
      return new URL('@/assets/icons/datafast.png', import.meta.url).href
    case 'transferencia':
      return new URL('@/assets/icons/transfer.png', import.meta.url).href
    case 'efectivo':
      return new URL('@/assets/icons/efectivo.png', import.meta.url).href
    default:
      return new URL('@/assets/icons/efectivo.png', import.meta.url).href
  }
}
</script>

<style scoped>
.selected-card {
  border: 2px solid var(--ion-color-primary);
  background-color: var(--ion-color-light);
}

ion-card {
  margin: 8px;
  transition: all 0.3s ease;
}

ion-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos para el contenedor de la imagen */
.payment-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  height: 32px; /* Altura fija para mantener consistencia */
}

/* Estilos para la imagen del ícono */
.payment-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>