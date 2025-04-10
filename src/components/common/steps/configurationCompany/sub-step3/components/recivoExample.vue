<template>
    <ion-card class="ticket-card">
      <!-- Encabezado del ticket con el nombre de la empresa -->
      <ion-card-header class="ticket-header">
        <ion-card-title>{{ empresa.nombre }}</ion-card-title>
        <p><strong>Correo electrónico:</strong> {{ empresa.correo }}</p>
      </ion-card-header>
      
      <!-- Cuerpo del ticket con la información de la transacción -->
      <ion-card-content class="ticket-body">
        <!-- Información básica de la transacción -->
        <ion-list lines="none" class="ticket-info">
          <ion-item>
            <ion-label>
              <strong>Fecha:</strong> {{ ticket.fecha }}
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <strong>No. Ticket:</strong> {{ ticket.numero }}
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <strong>Cliente:</strong> {{ ticket.cliente }}
            </ion-label>
          </ion-item>
        </ion-list>
        
        <!-- Detalles de los conceptos pagados -->
        <div class="ticket-details">
          <ion-list-header>
            <ion-label>Detalle de pago</ion-label>
          </ion-list-header>
          
          <ion-list lines="none">
            <ion-item v-for="(item, index) in ticket.conceptos" :key="index" class="ticket-item">
              <ion-label>
                {{ item.descripcion }} - ${{ item.monto.toFixed(2) }}
              </ion-label>
            </ion-item>
          </ion-list>
          
          <!-- Totales del ticket -->
          <ion-list lines="none" class="ticket-totals">
            <ion-item>
              <ion-label>
                <strong>Subtotal:</strong> ${{ ticket.subtotal.toFixed(2) }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <strong>IVA (16%):</strong> ${{ ticket.iva.toFixed(2) }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <strong>Total:</strong> ${{ ticket.total.toFixed(2) }}
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
        
        <!-- Método de pago utilizado -->
        <ion-item lines="none" class="payment-method">
          <ion-label>
            <strong>Método de pago:</strong> {{ ticket.metodoPago }}
          </ion-label>
        </ion-item>
        
        <!-- Pie del ticket con información de contacto -->
        <div class="ticket-footer">
          <ion-text>
            
            <p><strong>Teléfono:</strong> {{ empresa.telefono }}</p>
            <p>¡Gracias por su compra!</p>
          </ion-text>
        </div>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonList, 
    IonListHeader,
    IonItem, 
    IonLabel, 
    IonText 
  } from '@ionic/vue';
  
  // Recibimos el correo como prop
  const props = defineProps<{
    correo?: string
  }>();
  
  // Datos constantes de la empresa
  const empresa = ref({
    nombre: 'Illarli Comercios S.A. de C.V.',
    correo: props.correo || 'contacto@illarli.com', // Usamos el correo recibido como prop
    telefono: '(55) 1234-5678',
    direccion: 'Av. Ejemplo 123, Col. Centro, Ciudad de México'
  });
  
  // Actualizamos el correo cuando cambia la prop
  watch(() => props.correo, (newValue) => {
    if (newValue) {
      empresa.value.correo = newValue;
    }
  }, { immediate: true });
  
  // Datos constantes del ticket de pago
  const ticket = ref({
    numero: 'TK-20240406-001',
    fecha: '06/04/2024',
    cliente: 'Cliente Ejemplo',
    conceptos: [
      { descripcion: 'Plan Illarli Comercios Básico', monto: 1200.00 },
      { descripcion: 'Servicio adicional', monto: 300.00 }
    ],
    subtotal: 1500.00,
    iva: 240.00,
    total: 1740.00,
    metodoPago: 'Tarjeta de crédito **** 1234'
  });
  </script>
  
  <style scoped>
  /* Estilos para la card del ticket */
  .ticket-card {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
  }
  
  /* Estilos para el encabezado del ticket */
  .ticket-header {
    text-align: center;
    border-bottom: 1px dashed var(--ion-color-light-shade);
  }
  
  /* Estilos para los detalles de los conceptos */
  .ticket-details {
    margin: 15px 0;
    padding: 10px 0;
    border-top: 1px dashed var(--ion-color-light-shade);
    border-bottom: 1px dashed var(--ion-color-light-shade);
  }
  
  /* Estilos para los totales */
  .ticket-totals {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--ion-color-light);
  }
  
  /* Estilos para el pie del ticket */
  .ticket-footer {
    text-align: center;
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px dashed var(--ion-color-light-shade);
    font-size: 0.9em;
  }
  </style>