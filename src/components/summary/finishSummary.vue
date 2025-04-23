<template>
  <div class="sales-summary">    
    <!-- Cabecera con estilo de salesSummary pero manteniendo el logo -->
    <div class="summary-header">
      <h2 class="header-title">Resumen de Configuración</h2>
      <div class="header-info">
        <ion-icon :icon="informationCircle" class="info-icon"></ion-icon>
        <span>Verifique que todos los datos sean correctos antes de finalizar</span>
      </div>
    </div>
    <img v-if="hasLogo" :src="logoUrl" alt="Logo" class="company-logo" />

    <!-- Tabs para navegar entre secciones -->
    <div class="tabs-container">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="['tab', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        {{ tab }}
      </div>
    </div>
    
    <!-- Contenido de las pestañas -->
    <div class="tab-content">
      <!-- Tab 1: Datos Personales y Empresa -->
      <div v-if="activeTab === 0" class="tab-pane">
        <!-- Datos Personales - Formato compacto -->
        <div class="summary-section">
          <h4 class="section-title">Datos Personales</h4>
          <div class="compact-grid">
            <div class="info-pair" v-if="personalInfo.identification.type">
              <span class="label">ID:</span>
              <span class="value">{{ getIdentificationType(personalInfo.identification.type) }}</span>
            </div>
            <div class="info-pair" v-if="personalInfo.identification.number">
              <span class="label">Número:</span>
              <span class="value">{{ personalInfo.identification.number }}</span>
            </div>
            <div class="info-pair" v-if="personalInfo.name.first || personalInfo.name.last">
              <span class="label">Nombre:</span>
              <span class="value">{{ personalInfo.name.first }} {{ personalInfo.name.last }}</span>
            </div>
            <div class="info-pair" v-if="personalInfo.contact.email">
              <span class="label">Email:</span>
              <span class="value truncate" :title="personalInfo.contact.email">{{ personalInfo.contact.email }}</span>
            </div>
            <div class="info-pair" v-if="personalInfo.contact.phone">
              <span class="label">Teléfono:</span>
              <span class="value">{{ personalInfo.contact.phone }}</span>
            </div>
          </div>
        </div>
        
        <!-- Datos de la Empresa - Formato compacto -->
        <div class="summary-section">
          <h4 class="section-title">Datos de la Empresa</h4>
          <div class="compact-grid">
            <div class="info-pair" v-if="companyCreation.ruc">
              <span class="label">RUC:</span>
              <span class="value">{{ companyCreation.ruc }}</span>
            </div>
            <div class="info-pair" v-if="companyCreation.legalName">
              <span class="label">Razón Social:</span>
              <span class="value truncate" :title="companyCreation.legalName">{{ companyCreation.legalName }}</span>
            </div>
            <div class="info-pair" v-if="companyCreation.name">
              <span class="label">Nombre:</span>
              <span class="value truncate" :title="companyCreation.name">{{ companyCreation.name }}</span>
            </div>
            <div class="info-pair" v-if="companyCreation.domain">
              <span class="label">Dominio:</span>
              <span class="value">{{ companyCreation.domain }}</span>
            </div>
            <div class="info-pair" v-if="companyCreation.address">
              <span class="label">Dirección:</span>
              <span class="value truncate" :title="companyCreation.address">{{ companyCreation.address }}</span>
            </div>
            <div class="info-pair" v-if="companyCreation.phone">
              <span class="label">Teléfono:</span>
              <span class="value">{{ companyCreation.phone }}</span>
            </div>
            <div class="info-pair" v-if="companyCreation.businessEmail">
              <span class="label">Email:</span>
              <span class="value truncate" :title="companyCreation.businessEmail">{{ companyCreation.businessEmail }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab 2: Configuración de la Empresa -->
      <div v-if="activeTab === 1" class="tab-pane">
        <div class="summary-section">
          <h4 class="section-title">Configuración de la Empresa</h4>
          <div class="compact-grid">
            <div class="info-pair">
              <span class="label">Agente Retención:</span>
              <span class="value">{{ companyConfig.taxAgent?.isAgent ? 'Sí' : 'No' }}</span>
            </div>
            <div class="info-pair">
              <span class="label">Contabilidad:</span>
              <span class="value">{{ companyConfig.taxAgent?.accountingRequired ? 'Obligatoria' : 'No obligatoria' }}</span>
            </div>
            <div class="info-pair">
              <span class="label">Artesano:</span>
              <span class="value">{{ artisanText }}</span>
            </div>
            <div class="info-pair" v-if="companyConfig.artisan?.isArtisan && companyConfig.artisan?.artisanNumber">
              <span class="label">Nº Artesano:</span>
              <span class="value">{{ companyConfig.artisan.artisanNumber }}</span>
            </div>
            <div class="info-pair" v-if="companyConfig.defaultDocument">
              <span class="label">Doc. Defecto:</span>
              <span class="value">{{ getDocumentType(companyConfig.defaultDocument) }}</span>
            </div>
            <div class="info-pair" v-if="companyConfig.searchParameter">
              <span class="label">Búsqueda:</span>
              <span class="value">{{ getSearchParameter(companyConfig.searchParameter) }}</span>
            </div>
            <div class="info-pair" v-if="companyConfig.taxes && companyConfig.taxes.length > 0">
              <span class="label">Impuestos:</span>
              <span class="value">{{ formatTaxes(companyConfig.taxes) }}</span>
            </div>
            <div class="info-pair" v-if="companyConfig.taxesFiveNumber">
              <span class="label">Código 5%:</span>
              <span class="value">{{ companyConfig.taxesFiveNumber }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab 3: Sucursal y Punto de Venta -->
      <div v-if="activeTab === 2" class="tab-pane">
        <div class="summary-section">
          <h4 class="section-title">Sucursal y Punto de Venta</h4>
          <div class="compact-grid">
            <div class="info-pair" v-if="branchAndPOS.branch.idBranch">
              <span class="label">Cód. Sucursal:</span>
              <span class="value">{{ branchAndPOS.branch.idBranch }}</span>
            </div>
            <div class="info-pair" v-if="branchAndPOS.branch.commercialName">
              <span class="label">Nombre Comercial:</span>
              <span class="value truncate" :title="branchAndPOS.branch.commercialName">{{ branchAndPOS.branch.commercialName }}</span>
            </div>
            <div class="info-pair" v-if="branchAndPOS.branch.name">
              <span class="label">Nombre Sucursal:</span>
              <span class="value truncate" :title="branchAndPOS.branch.name">{{ branchAndPOS.branch.name }}</span>
            </div>
            <div class="info-pair" v-if="branchAndPOS.pointOfSale.idPos">
              <span class="label">Cód. Punto Emisión:</span>
              <span class="value">{{ branchAndPOS.pointOfSale.idPos }}</span>
            </div>
            <div class="info-pair" v-if="branchAndPOS.pointOfSale.name">
              <span class="label">Nombre P. Emisión:</span>
              <span class="value truncate" :title="branchAndPOS.pointOfSale.name">{{ branchAndPOS.pointOfSale.name }}</span>
            </div>
            <div class="info-pair">
              <span class="label">Despacho Posterior:</span>
              <span class="value">{{ branchAndPOS.branch.delayedDispatch ? 'Sí' : 'No' }}</span>
            </div>
            <div class="info-pair">
              <span class="label">Est. Turístico:</span>
              <span class="value">{{ branchAndPOS.branch.isTouristEstablishment ? 'Sí' : 'No' }}</span>
            </div>
            <div class="info-pair" v-if="branchAndPOS.branch.address">
              <span class="label">Dirección:</span>
              <span class="value truncate" :title="branchAndPOS.branch.address">{{ branchAndPOS.branch.address }}</span>
            </div>
            <div class="info-pair" v-if="branchAndPOS.branch.phone">
              <span class="label">Teléfono:</span>
              <span class="value">{{ branchAndPOS.branch.phone }}</span>
            </div>
            <div class="info-pair" v-if="branchAndPOS.branch.email">
              <span class="label">Email:</span>
              <span class="value truncate" :title="branchAndPOS.branch.email">{{ branchAndPOS.branch.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWizardStore } from "@/stores/wizardStore";
import { informationCircle } from 'ionicons/icons'; // Importar el icono de información
import { onMounted } from 'vue';

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Estado para las pestañas
const activeTab = ref(0);
const tabs = ['Datos', 'Configuración', 'Sucursal'];

// Obtener los datos del store
const personalInfo = computed(() => {
  return wizardStore.getStepData("personalInfo") || {
    identification: { type: "", number: "" },
    name: { first: "", last: "" },
    contact: { email: "", phone: "" }
  };
});

const companyCreation = computed(() => {
  return wizardStore.getStepData("companyCreation") || {
    ruc: "",
    name: "",
    legalName: "",
    domain: "",
    address: "",
    phone: "",
    businessEmail: ""
  };
});

const companyConfig = computed(() => {
  return wizardStore.getStepData("companyConfig") || {
    defaultDocument: "",
    searchParameter: "",
    regimeRUC: "",
    categoryRUC: "",
    taxAgent: { isAgent: false, accountingRequired: false },
    artisan: { isArtisan: false, artisanNumber: "" },
    taxes: [],
    taxesFiveNumber: "",
    logo: { url: "", fileName: "" }
  };
});

const branchAndPOS = computed(() => {
  return wizardStore.getStepData("branchAndPOS") || {
    branch: {
      idBranch: "",
      name: "",
      commercialName: "",
      address: "",
      phone: "",
      email: "",
      delayedDispatch: false,
      isTouristEstablishment: false,
      logo: { url: "", fileName: "" }
    },
    pointOfSale: {
      idPos: "",
      name: ""
    }
  };
});

// Computed para verificar si hay un logo disponible
const hasLogo = computed(() => {
  // Verificar primero en companyConfig
  if (companyConfig.value.logo && companyConfig.value.logo.url) {
    return true;
  }
  
  // Verificar en branchAndPOS.branch
  if (branchAndPOS.value.branch.logo && branchAndPOS.value.branch.logo.url) {
    return true;
  }
  
  return false;
});

// Computed para obtener la URL del logo
const logoUrl = computed(() => {
  // Priorizar el logo en companyConfig
  if (companyConfig.value.logo && companyConfig.value.logo.url) {
    return companyConfig.value.logo.url;
  }
  
  // Si no existe, usar el logo en branchAndPOS.branch
  if (branchAndPOS.value.branch.logo && branchAndPOS.value.branch.logo.url) {
    return branchAndPOS.value.branch.logo.url;
  }
  
  // Valor por defecto
  return '';
});

// Funciones de utilidad para formatear datos
const getIdentificationType = (type: string): string => {
  const types: Record<string, string> = {
    'cedula': 'Cédula',
    'ruc': 'RUC'
  };
  return types[type] || type;
};

const getDocumentType = (type: string): string => {
  const types: Record<string, string> = {
    'facturas': 'Facturas',
    'recibos': 'Recibos'
  };
  return types[type] || type;
};

const getSearchParameter = (param: string): string => {
  const params: Record<string, string> = {
    'nombre': 'Nombre',
    'codigo': 'Código'
  };
  return params[param] || param;
};

// Función para formatear los impuestos con tipado correcto
const formatTaxes = (taxes: string[]): string => {
  if (!taxes || !Array.isArray(taxes) || taxes.length === 0) {
    return '';
  }
  return taxes.map((tax: string) => `${tax}%`).join(', ');
};

const artisanText = computed(() => {
  return companyConfig.value.artisan?.isArtisan ? 'Sí' : 'No';
});

onMounted(() => {
  // This will run when the component is mounted
});
</script>

<style scoped>
.sales-summary {
  width: 100%;
  background-color: #f8fafc;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  font-size: 0.8125rem;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

/* Estilos para el nuevo encabezado */
.summary-header {
  background-color: #003cff;
  padding: 10px;
  border-radius: 0.5rem 0.5rem 0 0;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.header-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.info-icon {
  font-size: 1.2rem;
}

/* Ajuste para el logo en el nuevo encabezado */
.company-logo {
  max-width: 40px;
  max-height: 40px;
  object-fit: contain;
  border-radius: 4px;
  margin-top: 0.5rem;
  background-color: white;
  padding: 2px;
}

/* Tabs de navegación */
.tabs-container {
  display: flex;
  background-color: #f0f7ff;
  border-bottom: 1px solid #e1effe;
}

.tab {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab.active {
  color: #1a56db;
  border-bottom-color: #1a56db;
  background-color: rgba(26, 86, 219, 0.05);
}

.tab:hover:not(.active) {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Contenido de las pestañas */
.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.tab-pane {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-section {
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a56db;
  padding: 0.5rem 0.75rem;
  margin: 0;
  border-bottom: 1px solid #e1effe;
  background-color: #f8fafc;
  border-radius: 0.375rem 0.375rem 0 0;
}

/* Grid compacto para la información */
.compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.25rem;
  padding: 0.5rem;
}

.info-pair {
  display: flex;
  flex-direction: row; /* Cambiado de column a row */
  align-items: center; /* Alinear verticalmente */
  justify-content: space-between; /* Distribuir espacio */
  background-color: #f9fafb;
  padding: 0.375rem 0.5rem;
  border-radius: 0.25rem;
  min-width: 0; /* Para que funcione truncate */
}

.label {
  font-size: 0.6875rem;
  font-weight: 500;
  color: #6b7280;
  margin-right: 0.375rem; /* Espacio entre label y value */
  white-space: nowrap; /* Evitar que el label se rompa */
}

.value {
  font-size: 0.75rem;
  font-weight: 600;
  color: #1f2937;
  text-align: left; /* Alinear a la derecha */
  flex: 1; /* Tomar el espacio restante */
  min-width: 0; /* Necesario para que truncate funcione */
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>