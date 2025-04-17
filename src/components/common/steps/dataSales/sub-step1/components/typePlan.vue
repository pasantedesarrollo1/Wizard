<template>
  <div class="plan-selector">
    <ion-text color="medium" class="text-center">
      <h4 class="title-heading">Selecciona el plan y la frecuencia de pago</h4>
    </ion-text>
    
    <!-- Switch personalizado para alternar entre Mensual y Anual -->
    <div class="period-toggle-container">
      <div class="period-toggle">
        <span :class="{ 
          'period-active': salesData.billingFrequency === 'mensual', 
          'period-inactive': salesData.billingFrequency !== 'mensual' 
        }">
          Mensual
        </span>
        <div class="switch-container">
          <div id="button-3" class="button r">
            <input 
              class="checkbox" 
              type="checkbox" 
              :checked="salesData.billingFrequency === 'anual'"
              @change="togglePeriodo"
            >
            <div class="knobs"></div>
            <div class="layer"></div>
          </div>
        </div>
        <span :class="{ 
          'period-active': salesData.billingFrequency === 'anual', 
          'period-inactive': salesData.billingFrequency !== 'anual' 
        }">
          Anual
          <ion-badge v-if="salesData.billingFrequency === 'anual'" class="savings-badge">
            Ahorro 20%
          </ion-badge>
        </span>
      </div>
    </div>
    
    <!-- Contenedor de cards con ion-grid para mejor control responsivo -->
    <ion-grid class="plans-grid">
      <ion-row>
        <ion-col 
          size="12" 
          size-sm="6" 
          size-md="3" 
          v-for="opcion in opcionesTipoPlanes" 
          :key="opcion.value"
        >
          <!-- Usando el componente SelectableCard para los planes -->
          <div class="plan-card-wrapper">
            <SelectableCard
              v-model="selectedPlan"
              :value="opcion.value"
              :label="opcion.label"
              :is-popular="opcion.value === 'pymeplan'"
              popular-label="Popular"
              height="auto"
              class="plan-card-custom"
              @update:modelValue="seleccionarPlan"
            >
              <!-- Contenido personalizado dentro del SelectableCard -->
              <div class="price-container">
                <div class="price-tag">
                  <span class="currency">$</span>
                  <span class="amount">{{ getPlanPrice(opcion) }}</span>
                  <span class="period">/{{ salesData.billingFrequency === 'anual' ? 'año' : 'mes' }}</span>
                </div>
                
                <div v-if="salesData.billingFrequency === 'anual' && opcion.value !== 'freeplan'" class="savings-text">
                  <span class="original-price">{{ opcion.precioMensual }}×12</span>
                </div>
              </div>
              
              <!-- Características del plan -->
              <div class="features-list">
                <div v-for="(caracteristica, index) in opcion.caracteristicas" :key="index" class="feature-item">
                  <ion-icon :icon="checkmarkCircle" class="feature-icon"></ion-icon>
                  <span>{{ caracteristica }}</span>
                </div>
              </div>
              
              <!-- Etiquetas adicionales -->
              <div class="badges-container">
                <ion-badge 
                  v-if="opcion.value === 'freeplan'" 
                  color="success"
                  class="plan-badge"
                >
                  Gratis
                </ion-badge>
                <ion-badge 
                  v-if="salesData.billingFrequency === 'anual' && opcion.value !== 'freeplan'" 
                  color="tertiary"
                  class="plan-badge annual-badge"
                >
                  Ahorro anual
                </ion-badge>
              </div>
            </SelectableCard>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>
  
<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import {
  IonText,
  IonBadge,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue"
import { checkmarkCircle } from "ionicons/icons"
import { useInitialData } from "@/composables/useInitialData"
import SelectableCard from "@/components/ui/selectableCard.vue"

// Definimos la interfaz para las opciones de tipo de plan con precios
interface TipoPlanesOpcion {
  label: string
  value: string
  precioMensual: string
  precioAnual: string
  caracteristicas?: string[]
}

// Utilizamos el composable useInitialData para manejar los datos de salesData
const { data: salesData, updateField } = useInitialData('salesData', {
  plan: '',
  billingFrequency: 'mensual',
  payment: {
    amount: 0,
    date: ''
  }
}, {
  debug: false // Activar para depuración si es necesario
});

// Estado local para el plan seleccionado
const selectedPlan = ref(salesData.value.plan || "");

// Sincronizar el estado local con el store cuando cambia
onMounted(() => {
  // Inicializar el estado local con el valor del store
  selectedPlan.value = salesData.value.plan || "";
  
  // Observar cambios en el store para actualizar el estado local
  watch(() => salesData.value.plan, (newValue) => {
    if (newValue && newValue !== selectedPlan.value) {
      selectedPlan.value = newValue;
    }
  });
});

// Array con las opciones de tipo de plan incluyendo precios
const opcionesTipoPlanes = ref<TipoPlanesOpcion[]>([
  {
    label: "Plan Gratuito",
    value: "freeplan",
    precioMensual: "0",
    precioAnual: "0",
    caracteristicas: ["Acceso básico", "Funciones limitadas", "Soporte por email"],
  },
  {
    label: "Plan Lite",
    value: "liteplan",
    precioMensual: "10",
    precioAnual: "96",
    caracteristicas: [
      "Todo lo del plan gratuito",
      "Funciones adicionales",
      "Soporte prioritario",
      "Acceso a API básica",
    ],
  },
  {
    label: "Plan Básico",
    value: "basicplan",
    precioMensual: "20",
    precioAnual: "192",
    caracteristicas: [
      "Todo lo del plan Lite",
      "Características avanzadas",
      "Soporte telefónico",
      "Reportes personalizados",
      "API completa",
    ],
  },
  {
    label: "Plan Pyme",
    value: "pymeplan",
    precioMensual: "30",
    precioAnual: "288",
    caracteristicas: [
      "Todo lo del plan Básico",
      "Funciones empresariales",
      "Soporte 24/7",
      "Integraciones avanzadas",
      "Usuarios ilimitados",
      "Personalización completa",
    ],
  },
])

// Función para obtener el precio según el periodo seleccionado
const getPlanPrice = (plan: TipoPlanesOpcion): string => {
  return salesData.value.billingFrequency === "anual" ? plan.precioAnual : plan.precioMensual
}

// Función para seleccionar un plan
const seleccionarPlan = (value: string) => {
  updateField('plan', value);
}

// Función para alternar entre periodos (mensual/anual)
const togglePeriodo = (event: Event) => {
  const target = event.target as HTMLInputElement
  const nuevoPeriodo = target.checked ? "anual" : "mensual"
  updateField('billingFrequency', nuevoPeriodo);
}
</script>
  
<style lang="scss" src="@/components/common/steps/dataSales/sub-step1/styles/typePlan.scss" scoped></style>

<style lang="scss" scoped>
/* Estilos adicionales para integrar SelectableCard con los estilos existentes */
.plan-card-wrapper {
  height: 100%;
}

.plan-card-custom {
  height: 100% !important;
  min-height: 400px;
  
  &:deep(.selectable-card) {
    height: 100% !important;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    
    &.popular-card {
      transform: scale(1.03);
      
      @media (max-width: 768px) {
        transform: scale(1);
      }
    }
  }
  
  &:deep(.card-label) {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  &:deep(.label-text) {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
}

/* Mantener los estilos específicos de las características y precios */
.price-container, .features-list, .badges-container {
  width: 100%;
}

.feature-item {
  text-align: left;
}
</style>