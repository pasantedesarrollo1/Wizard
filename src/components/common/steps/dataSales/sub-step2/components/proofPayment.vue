<template>
  <!-- Contenedor principal con clases para mejor posicionamiento -->
  <div class="input-container">
    <!-- Input con clases condicionales para aplicar estilos cuando tiene valor -->
    <input 
      :required="true" 
      id="inputField" 
      placeholder="Comprobante de pago" 
      type="text"
      v-model="proofPaymentValue"
      class="custom-input select-style"
      :class="{ 'has-value': proofPaymentValue.length > 0 }"
    >
    <label class="usernameLabel" for="inputField">Ingresa el número del comprobante</label>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

// Variable reactiva para almacenar el valor del comprobante
const proofPaymentValue = ref('')


</script>

<style lang="scss" src="@/components/common/steps/dataSales/sub-step2/styles/proofPayment.scss" scoped></style>