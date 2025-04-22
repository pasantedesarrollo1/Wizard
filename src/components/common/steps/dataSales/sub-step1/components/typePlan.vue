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
const selectedPlan = ref("");

// Sincronizar el estado local con el store cuando cambia
// Inicializar con valores predeterminados
onMounted(() => {
  // Inicializar el estado local con el valor del store
  selectedPlan.value = salesData.value.plan || "";
  
  // IMPORTANTE: Establecer el valor predeterminado para billingFrequency si no existe
  if (!salesData.value.billingFrequency) {
    updateField('billingFrequency', 'mensual');
  }
  
  // Observar cambios en el store para actualizar el estado local
  watch(() => salesData.value.plan, (newValue) => {
    if (newValue && newValue !== selectedPlan.value) {
      selectedPlan.value = newValue;
      
      // IMPORTANTE: Asegurar que billingFrequency tenga un valor cuando se selecciona un plan
      if (!salesData.value.billingFrequency) {
        updateField('billingFrequency', 'mensual');
      }
    }
  }, { immediate: true });
});

// Array con las opciones de tipo de plan incluyendo precios
const opcionesTipoPlanes = ref<TipoPlanesOpcion[]>([
  {
    label: "Plan Gratuito",
    value: "freeplan",
    precioMensual: "0",
    precioAnual: "0",
    caracteristicas: [
    "1 Usuario Simultaneo",
    "1 Establecimiento Matriz",
    "12 Facturas electrónicas", 
    "Emisión ilimitada de recibos",
    

  ],
  },
  {
    label: "Plan Lite",
    value: "liteplan",
    precioMensual: "",
    precioAnual: "49.99",
    caracteristicas: [
      "2 Usuarios Simultaneaos",
      "1 Establecimiento Matriz",
      "Comprobantes electrónicos: facturas, notas de crédito",
      "Plan Anual: 240 comprobantes anuales no acumulables",
    ],
  },
  {
    label: "Plan Básico",
    value: "basicplan",
    precioMensual: "20",
    precioAnual: "168",
    caracteristicas: [
      "4 Usuaiors Simultaneos",
      "1 Establecimiento Matriz",
      "Gestion de 3 bodegas adicionales",
      "Comprobantes electrónicos: facturas, notas de crédito",
      "Plan Anual: 1200 comprobantes anuales, no acumulables",
      "Plan Mensual: 50 comprobantes mensuales, no acumulables",
    ],
  },
  {
    label: "Plan Pyme",
    value: "pymeplan",
    precioMensual: "28",
    precioAnual: "235.20",
    caracteristicas: [
      "Usuarios simultaneos ilimitados",
      "1 Establecimineto Matriz",
      "Sucursales ilimitadas",
      "Gestión de bodegas ilimitadas",
      "Usuarios ilimitados",
      "Comprobantes electrónicos ilimitados",
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
  
  // IMPORTANTE: Asegurar que billingFrequency tenga un valor cuando se selecciona un plan
  if (!salesData.value.billingFrequency) {
    updateField('billingFrequency', 'mensual');
  }
}

// Función para alternar entre periodos (mensual/anual)
const togglePeriodo = (event: Event) => {
  const target = event.target as HTMLInputElement
  const nuevoPeriodo = target.checked ? "anual" : "mensual"
  updateField('billingFrequency', nuevoPeriodo);
}
</script>
  
<style scoped>
/* Estilos generales */
.plan-selector {
  max-width: 1200px;
  margin: 0 auto;
}

.title-heading {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

/* Estilos para el toggle de periodo */
.period-toggle-container {
  display: flex;
  justify-content: center;
}

.period-toggle {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f5f7fa;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.period-active {
  font-weight: 600;
  color: #333;
}

.period-inactive {
  color: #777;
}

.savings-badge {
  margin-left: 0.5rem;
  font-size: 0.7rem;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: rgba(var(--ion-color-tertiary-rgb), 0.15);
  color: var(--ion-color-tertiary);
}

/* Estilos para el switch */
.switch-container {
  position: relative;
  width: 74px;
  height: 36px;
}

.button {
  position: relative;
  width: 74px;
  height: 36px;
  overflow: hidden;
}

.button.r,
.button.r .layer {
  border-radius: 100px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}

.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ebf7fc;
  transition: 0.3s ease all;
  z-index: 1;
}

#button-3 .knobs:before {
  content: "";
  position: absolute;
  top: 3px;
  left: 4px;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 9px 4px;
  background-color: #03a9f4;
  border-radius: 50%;
  transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
}

#button-3 .checkbox:active + .knobs:before {
  width: 46px;
  border-radius: 100px;
}

#button-3 .checkbox:checked:active + .knobs:before {
  margin-left: -26px;
}

#button-3 .checkbox:checked + .knobs:before {
  content: "";
  left: 42px;
  background-color: #f44336;
}

#button-3 .checkbox:checked ~ .layer {
  background-color: #fcebeb;
}

/* Configuración del grid de Ionic */
.plans-grid {
  --ion-grid-padding: 0;
  --ion-grid-column-padding: 10px;
  width: 100%;
  margin: 1.5rem 0;
}

/* Estilos para las tarjetas de planes */
.plan-card-wrapper {
  height: 100%;
}

.plan-card-custom {
  height: 100% !important;
  min-height: 400px;
}

.plan-card-custom :deep(.selectable-card) {
  height: 100% !important;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.plan-card-custom :deep(.selectable-card.popular-card) {
  transform: scale(1.03);
}

.plan-card-custom :deep(.card-label) {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.plan-card-custom :deep(.label-text) {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

/* Contenedor de precio */
.price-container {
  text-align: center;
  margin: 1rem 0 1.5rem;
  width: 100%;
}

.price-tag {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.price-tag .currency {
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
}

.price-tag .amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin: 0 0.2rem;
}

.price-tag .period {
  font-size: 0.9rem;
  color: #777;
}

.savings-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #777;
}

.savings-text .original-price {
  text-decoration: line-through;
  opacity: 0.7;
}

/* Lista de características */
.features-list {
  margin: 1.5rem 0;
  width: 100%;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #555;
  text-align: left;
}

.feature-item .feature-icon {
  color: var(--ion-color-primary);
  font-size: 1.2rem;
  flex-shrink: 0;
}

/* Contenedor de badges */
.badges-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;
}

.plan-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

/* Ajustes responsivos */
@media (max-width: 992px) {
  ion-col[size-md="3"] {
    --ion-grid-column-size: 6;
    --ion-grid-column: 6;
  }
}

@media (max-width: 768px) {
  .period-toggle {
    padding: 0.4rem 0.8rem;
    gap: 0.5rem;
  }
  
  .plan-card-custom :deep(.selectable-card.popular-card) {
    transform: scale(1);
  }
  
  .price-tag .amount {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  ion-col {
    --ion-grid-column-size: 12;
    --ion-grid-column: 12;
  }
  
  .title-heading {
    font-size: 1.2rem;
  }
}
</style>