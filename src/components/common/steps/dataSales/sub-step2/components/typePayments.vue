<template>
  <div class="payment-methods-container">
    <!-- Título con mejor estilo y animación -->
    <div class="title-container">
      <ion-text color="dark">
        <h4 class="title-heading">Seleccione el método de pago del Servicio</h4>
      </ion-text>
    </div>

    <!-- Grid mejorado con animaciones y efectos -->
    <ion-grid class="payment-grid">
      <ion-row class="ion-justify-content-center">
        <ion-col
          size="12"
          size-sm="6"
          size-md="3"
          v-for="opcion in opcionesTipoPago"
          :key="opcion.value"
        >
          <!-- Card exterior con gradiente (card) -->
          <div 
            class="card"
            :class="{ 'selected-outer-card': TipoPagoSeleccionado === opcion.value }"
          >
            <!-- Card interior con contenido (card2) -->
            <div 
              class="card2"
              :class="{ 'selected-inner-card': TipoPagoSeleccionado === opcion.value }"
              @click="seleccionarTipoCompania(opcion.value)"
            >
              <div class="payment-card-content">
                <!-- Contenedor mejorado para los iconos -->
                <div class="payment-icon-wrapper">
                  <div class="payment-icon-container">
                    <img 
                      :src="getImageForPaymentType(opcion.value)" 
                      :alt="opcion.label" 
                      class="payment-icon" 
                    />
                  </div>
                </div>
                
                <!-- Texto del método de pago con mejor estilo -->
                <ion-text class="payment-label">
                  <p>{{ opcion.label }}</p>
                </ion-text>
              </div>
            </div>
          </div>
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
  IonCol
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
/* Contenedor principal con mejor espaciado */
.payment-methods-container {
  padding: 1.5rem 0.5rem;
  background-color: white;
  border-radius: 12px;
}

/* Estilos para el título */
.title-container {
  margin-bottom: 1.5rem;
  text-align: center;
}

.title-heading {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ion-color-dark);
  margin: 0;
  position: relative;
  display: inline-block;
}

.title-heading::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: var(--ion-color-primary);
  border-radius: 3px;
}

/* Grid con mejor espaciado */
.payment-grid {
  --ion-grid-padding: 0.5rem;
}

/* Implementación de los nuevos estilos de card */
.card {
  width: 100%;
  height: 220px;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all .3s;
  margin: 0.5rem auto;
  cursor: pointer;
}

.card2 {
  width: 100%;
  height: 100%;
  background-color: white; /* Fondo blanco */
  border-radius: 18px;
  transition: all .2s;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0; /* Borde sutil y delgado para las cards no seleccionadas */
}

.card2:hover {
  transform: scale(0.98);
  border-radius: 20px;
  border-color: transparent; /* Eliminar borde al hacer hover */
}

.card:hover {
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
}

/* Estilos para cards seleccionadas */
.selected-outer-card {
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.50);
}

.selected-inner-card {
  transform: scale(0.98);
  border-radius: 20px;
  background-color: #0052cc; /* Azul cuando está seleccionado */
  border-color: transparent; /* Eliminar borde cuando está seleccionado */
}

/* Contenido de la tarjeta */
.payment-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  height: 100%;
  width: 100%;
}

/* Contenedor mejorado para los iconos */
.payment-icon-wrapper {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.payment-icon-container {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1); /* Fondo gris claro para el círculo */
  border-radius: 50%;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.selected-inner-card .payment-icon-container {
  background-color: rgba(0, 0, 0, 0.3); /* Fondo más oscuro para el círculo cuando está seleccionado */
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Iconos más grandes y destacados - sin filtro para mantener colores originales */
.payment-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
  /* Sin filtro para mantener los colores originales de los iconos */
}

/* Etiqueta del método de pago */
.payment-label {
  text-align: center;
  width: 100%;
}

.payment-label p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #333; /* Texto oscuro para contraste con fondo blanco */
  transition: all 0.3s ease;
}

/* Solo cambiamos el color del texto a blanco cuando está seleccionado */
.selected-inner-card .payment-label p {
  color: white; /* Texto blanco cuando está seleccionado */
  font-weight: 600;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .card {
    height: 200px;
  }
  
  .payment-icon-container {
    width: 56px;
    height: 56px;
  }
  
  .payment-label p {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .payment-methods-container {
    padding: 1rem 0.25rem;
  }
  
  .card {
    height: 180px;
    margin: 0.25rem auto;
  }
  
  .payment-card-content {
    padding: 1rem 0.5rem;
  }
  
  .payment-icon-container {
    width: 48px;
    height: 48px;
    padding: 10px;
  }
}
</style>