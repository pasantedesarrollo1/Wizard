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
              <ion-icon
                :icon="getIconForPaymentType(opcion.value)"
                size="large"
                class="ion-margin-bottom"
              ></ion-icon>
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
  IonCardContent,
  IonIcon
} from '@ionic/vue'
import { 
  cardOutline, 
  receiptOutline, 
  cashOutline, 
  swapHorizontalOutline 
} from 'ionicons/icons'

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

// Función para obtener el icono según el tipo de pago
const getIconForPaymentType = (paymentType: string) => {
  switch (paymentType) {
    case 'tarjeta-nuevi':
    case 'datafast-voucher':
      return cardOutline
    case 'transferencia':
      return swapHorizontalOutline
    case 'efectivo':
      return cashOutline
    default:
      return receiptOutline
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
</style>