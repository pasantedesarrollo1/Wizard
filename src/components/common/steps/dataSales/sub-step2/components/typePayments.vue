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
          <!-- Card unificada -->
          <div 
            class="unified-card w-full h-[130px] rounded-[20px] transition-all duration-300 cursor-pointer p-2 flex flex-col justify-between items-center"
            :class="{ 'selected-card': tipoPagoSeleccionado === opcion.value }"
            @click="seleccionarTipoPago(opcion.value)"
          >
            <!-- Contenedor del icono grande -->
            <div class="flex-grow flex items-center justify-center w-full ">
              <Icon 
                  :icon="getIconForPaymentType(opcion.value)" 
                  class="w-20 h-20 pb-1 transition-all duration-300"
                  :class="{ 'text-white': tipoPagoSeleccionado === opcion.value }"
                />
            </div>
            
            <!-- Texto del método de pago con mejor estilo -->
            <div class="text-center w-full mt-auto">
              <p class="m-0 text-lg font-medium text-gray-800 transition-all duration-300"
                 :class="{ 'text-white font-semibold': tipoPagoSeleccionado === opcion.value }">
                {{ opcion.label }}
              </p>
            </div>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue'
import { Icon } from '@iconify/vue'
import { useWizardStore } from "@/stores/wizardStore";

// Definir los eventos que emite este componente
const emit = defineEmits(['payment-method-changed'])

// Obtener la instancia del store
const wizardStore = useWizardStore();

interface TipoPagoOpcion {
  label: string
  value: string
}

const opcionesTipoPago = ref<TipoPagoOpcion[]>([
  // { label: 'Tarjeta Nuevi', value: 'tarjeta-nuevi' },
  { label: 'Datafast Vouchet', value: 'datafast-voucher' },
  { label: 'Transferencia', value: 'transferencia' },
])

const tipoPagoSeleccionado = ref('')
const initialPaymentMethod = ref<string | null>(null);

// Cargar datos del store si existen
onMounted(() => {
  loadPaymentMethodFromStore();
});

const loadPaymentMethodFromStore = () => {
  const salesData = wizardStore.getStepData("salesData");
  initialPaymentMethod.value = salesData?.paymentMethod || null;
  tipoPagoSeleccionado.value = initialPaymentMethod.value || '';
  if (initialPaymentMethod.value) {
    emit('payment-method-changed', initialPaymentMethod.value);
  }
}

const seleccionarTipoPago = (value: string) => {
  // Actualizar el estado local
  tipoPagoSeleccionado.value = value;
  
  // Si seleccionamos un nuevo método de pago, debemos inicializar la estructura de datos correspondiente
  const salesData = wizardStore.getStepData("salesData") || {};
  const paymentData = salesData.payment || {};
  
  // Crear estructura básica de datos de pago según el método seleccionado
  const updatedPayment = { ...paymentData };
  
  // Asegurarse de que exista la estructura adecuada para el método de pago seleccionado
  if (value === 'transferencia' && !updatedPayment.transferData) {
    updatedPayment.transferData = {
      financialInstitution: '',
      proofPayment: ''
    };
  } else if (value === 'datafast-voucher' && !updatedPayment.datafastData) {
    updatedPayment.datafastData = {
      typeCard: '',
      numberLote: ''
    };
  }
  
  // Actualizar el store con el método de pago y la estructura de datos inicializada
  wizardStore.updateFormSection("salesData", {
    paymentMethod: value,
    payment: updatedPayment
  });
  
  // Emitir el evento con el método de pago seleccionado
  emit('payment-method-changed', value);
  console.log('Tipo de Pago seleccionado:', value);
}

// Función para obtener el icono según el tipo de pago
const getIconForPaymentType = (paymentType: string): string => {
  switch (paymentType) {
    case 'tarjeta-nuevi':
      return 'f7:creditcard'
    case 'datafast-voucher':
      return 'fontisto:shopping-pos-machine'
    case 'transferencia':
      return 'mdi:bank-transfer'
    default:
      return 'mdi:cash'
  }
}
</script>

<style lang="scss" scoped>
/* Estilos unificados para la tarjeta */
.unified-card {
  border: 1px solid #e5e7eb; /* Borde sutil por defecto */
  background-color: white;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 60, 255, 0.30);
    transform: scale(0.98);
    border-color: transparent;
  }
}

/* Estilos para cards seleccionadas */
.selected-card {
  box-shadow: 0px 0px 30px 1px rgba(0, 60, 255, 0.50);
  transform: scale(0.98);
  background-color: rgb(0, 60, 255) !important; /* Color azul específico */
  border-color: transparent !important;
}

/* Estilos para el contenedor de iconos */
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* Estilos responsivos adicionales */
@media (max-width: 768px) {
  .unified-card {
    height: 160px;
  }
  
  .icon-container svg {
    width: 5rem;
    height: 5rem;
  }
}
</style>