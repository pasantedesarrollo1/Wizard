<template>
    <div class="sales-summary">
      <h3 class="summary-title">Resumen de la Venta</h3>
      
      <!-- Datos generales -->
      <div class="summary-section">
        <h4 class="section-title">Datos Generales</h4>
        <div class="summary-item">
          <span class="item-label">Plan:</span>
          <span class="item-value">{{ getPlanName(salesData.plan) }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Frecuencia de Pago:</span>
          <span class="item-value">{{ capitalizeFirst(salesData.billingFrequency) }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Método de Pago:</span>
          <span class="item-value">{{ getPaymentMethodName(salesData.paymentMethod) }}</span>
        </div>
      </div>
      
      <!-- Datos de pago comunes -->
      <div class="summary-section">
        <h4 class="section-title">Datos de Pago</h4>
        <div class="summary-item">
          <span class="item-label">Monto:</span>
          <span class="item-value">${{ formatAmount(salesData.payment.amount) }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Fecha:</span>
          <span class="item-value">{{ formatDate(salesData.payment.date) }}</span>
        </div>
        
        <!-- Datos específicos según método de pago -->
        <template v-if="salesData.paymentMethod === 'transferencia'">
          <div class="summary-item">
            <span class="item-label">Institución Financiera:</span>
            <span class="item-value">{{ salesData.payment.transferData.financialInstitution }}</span>
          </div>
          <div class="summary-item">
            <span class="item-label">Comprobante de Pago:</span>
            <span class="item-value">{{ salesData.payment.transferData.proofPayment }}</span>
          </div>
        </template>
        
        <template v-else-if="salesData.paymentMethod === 'datafast-voucher'">
          <div class="summary-item">
            <span class="item-label">Tipo de Tarjeta:</span>
            <span class="item-value">{{ salesData.payment.datafastData.typeCard }}</span>
          </div>
          <div class="summary-item">
            <span class="item-label">Número de Lote:</span>
            <span class="item-value">{{ salesData.payment.datafastData.numberLote }}</span>
          </div>
        </template>
      </div>
      
      <!-- Datos del vendedor -->
      <div class="summary-section" v-if="consultantData && consultantData.sellerName">
        <h4 class="section-title">Datos del Vendedor</h4>
        <div class="summary-item">
          <span class="item-label">Vendedor:</span>
          <span class="item-value">{{ consultantData.sellerName }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useWizardStore } from "@/stores/wizardStore";
  
  // Obtener la instancia del store
  const wizardStore = useWizardStore();
  
  // Obtener los datos de venta y consultor del store
  const salesData = computed(() => {
    return wizardStore.getStepData("salesData") || {
      plan: "",
      billingFrequency: "",
      paymentMethod: "",
      payment: {
        amount: 0,
        date: "",
        transferData: {
          financialInstitution: "",
          proofPayment: ""
        },
        datafastData: {
          typeCard: "",
          numberLote: ""
        }
      }
    };
  });
  
  const consultantData = computed(() => {
    return wizardStore.getStepData("consultant") || {
      sellerId: "",
      sellerName: ""
    };
  });
  
  // Funciones de utilidad para formatear datos
  const formatAmount = (amount: number): string => {
    return amount.toFixed(2);
  };
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const capitalizeFirst = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Función para obtener el nombre del plan
  const getPlanName = (planValue: string): string => {
    const planMap: Record<string, string> = {
      'freeplan': 'Plan Gratuito',
      'liteplan': 'Plan Lite',
      'basicplan': 'Plan Básico',
      'pymeplan': 'Plan Pyme'
    };
    
    return planMap[planValue] || planValue;
  };
  
  // Función para obtener el nombre del método de pago
  const getPaymentMethodName = (methodValue: string): string => {
    const methodMap: Record<string, string> = {
      'transferencia': 'Transferencia Bancaria',
      'datafast-voucher': 'Datafast Voucher'
    };
    
    return methodMap[methodValue] || methodValue;
  };
  </script>
  
  <style scoped>
  .sales-summary {
    width: 100%;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .summary-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--ion-color-primary);
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .summary-section {
    margin-bottom: 1.25rem;
    padding: 0.75rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.25rem 0;
  }
  
  .item-label {
    font-weight: 500;
    color: #4b5563;
  }
  
  .item-value {
    font-weight: 600;
    color: #1f2937;
  }
  </style>