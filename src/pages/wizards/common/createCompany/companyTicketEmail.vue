<template>
    <div>
      <!-- Card contenedora del ticket de pago -->
       <label>Email que aparecer en el ticket</label> <br>
      <!-- Modificación: Agregado v-model para vincular el input con empresa.correo -->
      <input 
        type="email" 
        class="border border-black px-2 py-1 rounded" 
        placeholder="ingresa el correo" 
        v-model="empresa.correo" 
      /> 
      <br>
      <div class="ticket-card">
        <!-- Encabezado del ticket con el nombre de la empresa -->
        <div class="ticket-header">
          <h2>{{ empresa.nombre }}</h2>
        </div>
        
        <!-- Cuerpo del ticket con la información de la transacción -->
        <div class="ticket-body">
          <!-- Información básica de la transacción -->
          <div class="ticket-info">
            <p><strong>Fecha:</strong> {{ ticket.fecha }}</p>
            <p><strong>No. Ticket:</strong> {{ ticket.numero }}</p>
            <p><strong>Cliente:</strong> {{ ticket.cliente }}</p>
          </div>
          
          <!-- Detalles de los conceptos pagados -->
          <div class="ticket-details">
            <h3>Detalle de pago</h3>
            <div v-for="(item, index) in ticket.conceptos" :key="index" class="ticket-item">
              <p>{{ item.descripcion }} - ${{ item.monto.toFixed(2) }}</p>
            </div>
            
            <!-- Totales del ticket -->
            <div class="ticket-totals">
              <p><strong>Subtotal:</strong> ${{ ticket.subtotal.toFixed(2) }}</p>
              <p><strong>IVA (16%):</strong> ${{ ticket.iva.toFixed(2) }}</p>
              <p><strong>Total:</strong> ${{ ticket.total.toFixed(2) }}</p>
            </div>
          </div>
          
          <!-- Método de pago utilizado -->
          <div class="payment-method">
            <p><strong>Método de pago:</strong> {{ ticket.metodoPago }}</p>
          </div>
        </div>
        
        <!-- Pie del ticket con información de contacto -->
        <div class="ticket-footer">
          <p><strong>Correo electrónico:</strong> {{ empresa.correo }}</p>
          <p><strong>Teléfono:</strong> {{ empresa.telefono }}</p>
          <p>¡Gracias por su compra!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Datos constantes de la empresa
  const empresa = ref({
    nombre: 'Illarli Comercios S.A. de C.V.',
    correo: 'contacto@illarli.com', // Este valor ahora será actualizado dinámicamente por el input
    telefono: '(55) 1234-5678',
    direccion: 'Av. Ejemplo 123, Col. Centro, Ciudad de México'
  });
  
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
  /* Estilos básicos para la card del ticket */
  .ticket-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  /* Estilos para el encabezado del ticket */
  .ticket-header {
    text-align: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
  }
  
  /* Estilos para el cuerpo del ticket */
  .ticket-body {
    margin-bottom: 15px;
  }
  
  /* Estilos para los detalles de los conceptos */
  .ticket-details {
    margin: 15px 0;
    padding: 10px 0;
    border-top: 1px dashed #ccc;
    border-bottom: 1px dashed #ccc;
  }
  
  /* Estilos para los totales */
  .ticket-totals {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
  
  /* Estilos para el pie del ticket */
  .ticket-footer {
    text-align: center;
    margin-top: 15px;
    padding-top: 10px;
    border-top: 1px dashed #ccc;
    font-size: 0.9em;
  }
  </style>