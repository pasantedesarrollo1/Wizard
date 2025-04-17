<template>
  <div class="p-2 py-2 bg-white rounded-xl">
    <!-- Grid modificado para ocupar todo el ancho -->
    <ion-grid class="payment-grid">
      <ion-row>
        <ion-col
          size="6"
          size-md="6"
          v-for="opcion in opcionesTipoPago"
          :key="opcion.value"
        >
          <!-- Usando el componente SelectableCard -->
          <SelectableCard
            v-model="selectedPaymentMethod"
            :value="opcion.value"
            :label="opcion.label"
            :icon="getIconForPaymentType(opcion.value)"
            height="130px"
            @update:modelValue="seleccionarTipoPago"
          />
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import { useInitialData } from "@/composables/useInitialData";
import SelectableCard from "@/components/ui/selectableCard.vue";

// Definir los eventos que emite este componente
const emit = defineEmits(['payment-method-changed']);

interface TipoPagoOpcion {
  label: string;
  value: string;
}

const opcionesTipoPago = ref<TipoPagoOpcion[]>([
  // { label: 'Tarjeta Nuevi', value: 'tarjeta-nuevi' },
  { label: 'Datafast Vouchet', value: 'datafast-voucher' },
  { label: 'Transferencia', value: 'transferencia' },
]);

// Valores iniciales para el formulario
const initialValues = {
  paymentMethod: '',
  payment: {
    date: '',
    amount: 0,
    transferData: {
      financialInstitution: '',
      proofPayment: ''
    },
    datafastData: {
      typeCard: '',
      numberLote: ''
    }
  }
};

// Usar el composable useInitialData para manejar los datos
const { data, updateFields } = useInitialData(
  "salesData",
  initialValues,
  {
    autoSave: true,
    debug: false
  }
);

// Estado local para el método de pago seleccionado
const selectedPaymentMethod = ref(data.value.paymentMethod || '');

// Sincronizar el estado local con el store cuando cambia
onMounted(() => {
  // Inicializar el estado local con el valor del store
  selectedPaymentMethod.value = data.value.paymentMethod || '';
});

// Observar cambios en el método de pago para emitir eventos
watch(() => data.value.paymentMethod, (newValue) => {
  if (newValue) {
    // Actualizar el estado local si cambia en el store
    if (selectedPaymentMethod.value !== newValue) {
      selectedPaymentMethod.value = newValue;
    }
    // Emitir el evento
    emit('payment-method-changed', newValue);
  }
}, { immediate: true });

// Función para seleccionar un tipo de pago
const seleccionarTipoPago = (value: string) => {
  // Actualizar el método de pago en el store
  updateFields({
    paymentMethod: value
  });
  
  console.log('Tipo de Pago seleccionado:', value);
};

// Función para obtener el icono según el tipo de pago
const getIconForPaymentType = (paymentType: string): string => {
  switch (paymentType) {
    case 'tarjeta-nuevi':
      return 'f7:creditcard';
    case 'datafast-voucher':
      return 'fontisto:shopping-pos-machine';
    case 'transferencia':
      return 'mdi:bank-transfer';
    default:
      return 'mdi:cash';
  }
};
</script>

<style lang="scss" scoped>
// Configuración del grid de Ionic para métodos de pago
.payment-grid {
  --ion-grid-padding: 0;
  --ion-grid-column-padding: 8px;
  width: 100%;
  margin: 0;
}

// Media queries para responsividad
@media (max-width: 576px) {
  ion-col {
    padding-bottom: 10px;
  }
}
</style>