<template>
    <!-- Modificación: Contenedor principal con flexbox para dividir en dos secciones -->
    <div class="container-flex">
      <!-- Sección izquierda: label e input del email -->
      <div class="left-section">
        <div class="email-input-container">
          <label class="email-label">Email que aparecerá en el ticket</label>
          <input 
            type="email" 
            class="border border-black px-2 py-1 rounded email-input" 
            placeholder="ingresa el correo" 
            v-model="empresa.correo" 
          />
        </div>
      </div>
      
      <!-- Sección derecha: card del ticket -->
      <div class="right-section">
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Datos constantes de la empresa
  const empresa = ref({
    nombre: 'Illarli Comercios S.A. de C.V.',
    correo: 'contacto@illarli.com', // Este valor será actualizado dinámicamente por el input
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
  /* Nuevo: Contenedor principal con flexbox para dividir en dos secciones */
  .container-flex {
    display: flex;
    flex-direction: row; /* Organiza las secciones en fila (horizontal) */
    gap: 20px; /* Espacio entre las secciones */
    padding: 20px;
    width: 100%;
    min-height: 100vh; /* Altura mínima para ocupar toda la pantalla */
  }

  /* Nuevo: Estilos para la sección izquierda */
  .left-section {
    flex: 1; /* Toma 1 parte del espacio disponible */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
  }

  /* Nuevo: Estilos para la sección derecha */
  .right-section {
    flex: 2; /* Toma 2 partes del espacio disponible (el doble que la izquierda) */
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  /* Nuevo: Contenedor para el input y label de email */
  .email-input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 300px;
  }

  /* Nuevo: Estilos para el label del email */
  .email-label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  /* Nuevo: Estilos para el input del email */
  .email-input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
  }
  
  /* Estilos básicos para la card del ticket */
  .ticket-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    max-width: 400px;
    width: 100%; /* Modificado: para que ocupe el ancho disponible */
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

  /* Nuevo: Media query para hacer el diseño responsivo */
  @media (max-width: 768px) {
    .container-flex {
      flex-direction: column; /* En pantallas pequeñas, las secciones se apilan verticalmente */
    }
    
    .left-section, .right-section {
      flex: none;
      width: 100%;
    }
  }
  </style>