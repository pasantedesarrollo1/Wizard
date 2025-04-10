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
          <div v-if="isLoading" class="loading-indicator">Cargando...</div>
          <div v-if="isError" class="error-message">Error al cargar datos</div>
          <div v-if="isSuccess && !isLoading" class="success-message">Datos cargados correctamente</div>
        </div>
        <div class="button-container">
          <button 
            type="submit" 
            class="save-button"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { wizardService } from '@/services/api';
import { onMounted } from 'vue';

// Estado local para el valor del comprobante de pago
const proofPaymentValue = ref('');

// Obtener el cliente de consulta
const queryClient = useQueryClient();

// Consulta para obtener el comprobante de pago
const { isLoading, isError, isSuccess, data } = useQuery({
  queryKey: ['proofPayment'],
  queryFn: wizardService.getProofPayment,
  initialData: ''
});

onMounted(() => {
  // Observar cambios en los datos y actualizar el valor local
  if (data.value) {
    proofPaymentValue.value = data.value;
  }
})


// Mutación para actualizar el comprobante de pago
const { mutate, isPending: isSaving } = useMutation({
  mutationFn: (newValue: string) => wizardService.updateProofPayment(newValue),
  onSuccess: () => {
    // Invalidar la consulta para refrescar los datos
    queryClient.invalidateQueries({ queryKey: ['proofPayment'] });
  }
});

// Función para actualizar el comprobante de pago
const updateProofPayment = () => {
  mutate(proofPaymentValue.value);
};
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