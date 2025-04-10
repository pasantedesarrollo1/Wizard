<template>
  <!-- Contenedor principal con flexbox para dividir en dos secciones -->
  <div class="container-flex">
    <!-- Sección izquierda: label e input del email -->
    <div class="left-section">
      <email-recivo @update:email="updateEmail" />
    </div>
    
    <!-- Sección derecha: card del ticket -->
    <div class="right-section">
      <recivo-example :correo="correoElectronico" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RecivoExample from "@/components/common/steps/configurationCompany/sub-step3/components/recivoExample.vue";
import EmailRecivo from "@/components/common/steps/configurationCompany/sub-step3/components/emailRecivo.vue";

// Variable reactiva para almacenar el correo electrónico
const correoElectronico = ref('contacto@illarli.com');

// Función para actualizar el correo electrónico
const updateEmail = (nuevoEmail: string) => {
  correoElectronico.value = nuevoEmail || 'contacto@illarli.com';
};
</script>

<style scoped>
/* Contenedor principal con flexbox para dividir en dos secciones */
.container-flex {
  display: flex;
  flex-direction: row; /* Organiza las secciones en fila (horizontal) */
  gap: 20px; /* Espacio entre las secciones */
  padding: 20px;
  width: 100%;
  min-height: 100vh; /* Altura mínima para ocupar toda la pantalla */
}

/* Estilos para la sección izquierda */
.left-section {
  flex: 1; /* Toma 1 parte del espacio disponible */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

/* Estilos para la sección derecha */
.right-section {
  flex: 2; /* Toma 2 partes del espacio disponible (el doble que la izquierda) */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Media query para hacer el diseño responsivo */
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