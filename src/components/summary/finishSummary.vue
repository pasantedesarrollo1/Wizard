<template>
  <div class="finish-summary">
    <!-- Cabecera con título claro y mensaje informativo -->
    <div class="summary-header">
      <div class="header-left">
        <h2 class="header-title">Resumen de Configuración</h2>
        <div class="header-info">
          <ion-icon :icon="informationCircle" class="info-icon"></ion-icon>
          <span>Verifique que todos los datos sean correctos antes de finalizar</span>
        </div>
      </div>
      <!-- Logo de la empresa (si existe) posicionado a la derecha -->
      <div class="header-right">
        <img v-if="hasLogo" :src="logoUrl" alt="Logo de la empresa" class="company-logo" />
      </div>
    </div>

    <!-- Contenedor principal con diseño de factura -->
    <div class="summary-content">
      <!-- Sección de Datos Personales y de la Empresa -->
      <section class="summary-section">
        <h3 class="section-title">Datos Generales</h3>
        <div class="data-grid">
          <!-- Datos Personales -->
          <div class="data-column">
            <h4 class="data-title">Datos Personales</h4>
            <div class="data-item" v-if="personalInfo.identification.type">
              <span class="data-label">Tipo de ID:</span>
              <span class="data-value">{{ getIdentificationType(personalInfo.identification.type) }}</span>
            </div>
            <div class="data-item" v-if="personalInfo.identification.number">
              <span class="data-label">Número:</span>
              <span class="data-value">{{ personalInfo.identification.number }}</span>
            </div>
            <div class="data-item" v-if="personalInfo.name.first || personalInfo.name.last">
              <span class="data-label">Nombre:</span>
              <span class="data-value">{{ personalInfo.name.first }} {{ personalInfo.name.last }}</span>
            </div>
            <div class="data-item" v-if="personalInfo.contact.email">
              <span class="data-label">Email:</span>
              <span class="data-value" :title="personalInfo.contact.email">{{ personalInfo.contact.email }}</span>
            </div>
            <div class="data-item" v-if="personalInfo.contact.phone">
              <span class="data-label">Teléfono:</span>
              <span class="data-value">{{ personalInfo.contact.phone }}</span>
            </div>
          </div>

          <!-- Datos de la Empresa -->
          <div class="data-column">
            <h4 class="data-title">Datos de la Empresa</h4>
            <div class="data-item" v-if="companyCreation.ruc">
              <span class="data-label">RUC:</span>
              <span class="data-value">{{ companyCreation.ruc }}</span>
            </div>
            <div class="data-item" v-if="companyCreation.legalName">
              <span class="data-label">Razón Social:</span>
              <span class="data-value" :title="companyCreation.legalName">{{ companyCreation.legalName }}</span>
            </div>
            <div class="data-item" v-if="companyCreation.name">
              <span class="data-label">Nombre:</span>
              <span class="data-value" :title="companyCreation.name">{{ companyCreation.name }}</span>
            </div>
            <div class="data-item" v-if="companyCreation.address">
              <span class="data-label">Dirección:</span>
              <span class="data-value" :title="companyCreation.address">{{ companyCreation.address }}</span>
            </div>
             <div class="data-item" v-if="companyCreation.phone">
              <span class="data-label">Teléfono:</span>
              <span class="data-value">{{ companyCreation.phone }}</span>
            </div>
            <div class="data-item" v-if="companyCreation.businessEmail">
              <span class="data-label">Email:</span>
              <span class="data-value" :title="companyCreation.businessEmail">{{ companyCreation.businessEmail }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Configuración de la Empresa -->
      <section class="summary-section">
        <h3 class="section-title">Configuración de la Empresa</h3>
        <div class="data-grid">
          <div class="data-column">
            <div class="data-item">
              <span class="data-label">Agente Retención:</span>
              <span class="data-value">{{ companyConfig.taxAgent?.isAgent ? 'Sí' : 'No' }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Contabilidad:</span>
              <span class="data-value">{{ companyConfig.taxAgent?.accountingRequired ? 'Obligatoria' : 'No obligatoria' }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Artesano:</span>
              <span class="data-value">{{ artisanText }}</span>
            </div>
            <div class="data-item" v-if="companyConfig.artisan?.isArtisan && companyConfig.artisan?.artisanNumber">
              <span class="data-label">Nº Artesano:</span>
              <span class="data-value">{{ companyConfig.artisan.artisanNumber }}</span>
            </div>
          </div>
          <div class="data-column">
            <div class="data-item" v-if="companyConfig.defaultDocument">
              <span class="data-label">Doc. Defecto:</span>
              <span class="data-value">{{ getDocumentType(companyConfig.defaultDocument) }}</span>
            </div>
            <div class="data-item" v-if="companyConfig.searchParameter">
              <span class="data-label">Búsqueda:</span>
              <span class="data-value">{{ getSearchParameter(companyConfig.searchParameter) }}</span>
            </div>
            <div class="data-item" v-if="companyConfig.taxes && companyConfig.taxes.length > 0">
              <span class="data-label">Impuestos:</span>
              <span class="data-value">{{ formatTaxes(companyConfig.taxes) }}</span>
            </div>
            <div class="data-item" v-if="companyConfig.taxesFiveNumber">
              <span class="data-label">Código 5%:</span>
              <span class="data-value">{{ companyConfig.taxesFiveNumber }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Sucursal y Punto de Venta -->
      <section class="summary-section">
        <h3 class="section-title">Matriz y Punto de Emisión</h3>
        <div class="data-grid">
          <div class="data-column">
            <div class="data-item" v-if="branchAndPOS.branch.idBranch">
              <span class="data-label">Cód. Matriz:</span>
              <span class="data-value">{{ branchAndPOS.branch.idBranch }}</span>
            </div>
            <div class="data-item" v-if="branchAndPOS.branch.commercialName">
              <span class="data-label">Nombre Comercial:</span>
              <span class="data-value" :title="branchAndPOS.branch.commercialName">{{ branchAndPOS.branch.commercialName }}</span>
            </div>
            <div class="data-item" v-if="branchAndPOS.branch.name">
              <span class="data-label">Nombre Matriz:</span>
              <span class="data-value" :title="branchAndPOS.branch.name">{{ branchAndPOS.branch.name }}</span>
            </div>
            <div class="data-item" v-if="branchAndPOS.branch.address">
              <span class="data-label">Dirección:</span>
              <span class="data-value" :title="branchAndPOS.branch.address">{{ branchAndPOS.branch.address }}</span>
            </div>
             <div class="data-item" v-if="branchAndPOS.branch.phone">
              <span class="data-label">Teléfono:</span>
              <span class="data-value">{{ branchAndPOS.branch.phone }}</span>
            </div>
            <div class="data-item" v-if="branchAndPOS.branch.email">
              <span class="data-label">Email:</span>
              <span class="data-value" :title="branchAndPOS.branch.email">{{ branchAndPOS.branch.email }}</span>
            </div>
          </div>
          <div class="data-column">
            <div class="data-item" v-if="branchAndPOS.pointOfSale.idPos">
              <span class="data-label">Cód. Punto Emisión:</span>
              <span class="data-value">{{ branchAndPOS.pointOfSale.idPos }}</span>
            </div>
            <div class="data-item" v-if="branchAndPOS.pointOfSale.name">
              <span class="data-label">Nombre P. Emisión:</span>
              <span class="data-value" :title="branchAndPOS.pointOfSale.name">{{ branchAndPOS.pointOfSale.name }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Despacho Posterior:</span>
              <span class="data-value">{{ branchAndPOS.branch.delayedDispatch ? 'Sí' : 'No' }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Est. Turístico:</span>
              <span class="data-value">{{ branchAndPOS.branch.isTouristEstablishment ? 'Sí' : 'No' }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useWizardStore } from "@/stores/wizardStore";
import { informationCircle } from 'ionicons/icons';

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Inicializar los datos del store al montar el componente
onMounted(() => {
  personalInfo.value;
  companyCreation.value;
  companyConfig.value;
  branchAndPOS.value;
  hasLogo.value;
  logoUrl.value;
  artisanText.value;
});

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
      isTouristEstablishment: false,
      delayedDispatch: false,
      logo: {
        url: "",
        fileName: ""
      }
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
    'facturas': 'Facturas Electrónicas',
    'recibos': 'Recibos'
  };
  return types[type] || type;
};

const getSearchParameter = (param: string): string => {
  const params: Record<string, string> = {
    'nombre': 'Por Nombre',
    'codigo': 'Por Código'
  };
  return params[param] || param;
};

// Función para formatear los impuestos con tipado correcto
const formatTaxes = (taxes: string[]): string => {
  if (!taxes || !Array.isArray(taxes) || taxes.length === 0) {
    return 'Ninguno';
  }
  return taxes.map((tax: string) => `${tax}%`).join(', ');
};

const artisanText = computed(() => {
  return companyConfig.value.artisan?.isArtisan ? 'Sí' : 'No';
});
</script>

<style scoped>
.finish-summary {
  width: 100%;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Cabecera mejorada con flexbox para alinear elementos */
.summary-header {
  background: linear-gradient(135deg, #003cff, #0035e0);
  padding: 16px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Contenedor izquierdo para título e información */
.header-left {
  flex: 1;
}

/* Contenedor derecho para el logo */
.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.info-icon {
  font-size: 1.2rem;
}

/* Estilos del logo */
.company-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  padding: 4px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Contenedor principal del contenido */
.summary-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Estilos para las secciones */
.summary-section {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  padding: 16px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
}

/* Grid para organizar los datos en dos columnas */
.data-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.data-column {
  flex: 1 1 300px; /* Cada columna ocupa al menos 300px o 1fr del espacio disponible */
  min-width: 300px;
}

.data-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 8px;
}

/* Estilos para cada item de datos */
.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
}

.data-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
}

.data-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
  text-align: right;
  word-break: break-word;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .summary-header {
    flex-direction: row;
    align-items: center;
  }
  
  .header-left {
    flex: 1;
  }
  
  .header-title {
    font-size: 1.3rem;
    margin-bottom: 4px;
  }
  
  .header-info {
    font-size: 0.8rem;
  }
  
  .company-logo {
    width: 60px;
    height: 60px;
  }
  
  .data-grid {
    flex-direction: column;
  }
  
  .data-column {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .summary-header {
    padding: 12px;
  }
  
  .header-title {
    font-size: 1.1rem;
  }
  
  .company-logo {
    width: 50px;
    height: 50px;
  }
}
</style>