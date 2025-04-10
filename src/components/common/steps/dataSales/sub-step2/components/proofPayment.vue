<template>
  <div>
    <form @submit.prevent="updateProofPayment">
      <div>
        <label>Ingresa el número de referencia del comprobante de pago</label>
        <br />
        <div class="input-container">
          <input 
            type="text" 
            class="border border-black px-2 py-1 rounded w-full" 
            placeholder="Nro. comprobante pago"
            v-model="proofPaymentValue"
          />
        </div>
        <div class="button-container">
          <button 
            type="submit" 
            class="save-button"
          >
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { wizardService } from "@/services/api.ts"

// Estado local para el valor del comprobante de pago
const proofPaymentValue = ref("")

// Cargar el valor inicial
onMounted(async () => {
  try {
    const data = await wizardService.getProofPayment()
    proofPaymentValue.value = data
  } catch (error) {
    console.log("Error al cargar datos")
  }
})

// Función para actualizar el comprobante de pago
const updateProofPayment = async () => {
  try {
    await wizardService.updateProofPayment(proofPaymentValue.value)
    console.log("Comprobante actualizado correctamente")
  } catch (error) {
    console.log("Error al actualizar")
  }
}

</script>

<style scoped>
.input-container {
  position: relative;
  margin-bottom: 1rem;
}

.loading-indicator, .error-message, .success-message {
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.loading-indicator {
  color: #666;
}

.error-message {
  color: #e53e3e;
}

.success-message {
  color: #38a169;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.save-button {
  background-color: #003cff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
}

.save-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}
</style>