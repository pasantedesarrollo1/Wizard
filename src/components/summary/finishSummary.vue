<template>
    <div class="wizard-summary">
      <h3 class="summary-title">Resumen de Configuración</h3>
      
      <!-- Logo de la empresa (si existe) -->
      <div class="logo-container" v-if="hasLogo">
        <img :src="logoUrl" alt="Logo de la empresa" class="company-logo" />
      </div>
      
      <!-- Datos Personales -->
      <div class="summary-section">
        <h4 class="section-title">Datos Personales</h4>
        <div class="summary-item" v-if="personalInfo.identification.type">
          <span class="item-label">Tipo de Identificación:</span>
          <span class="item-value">{{ getIdentificationType(personalInfo.identification.type) }}</span>
        </div>
        <div class="summary-item" v-if="personalInfo.identification.number">
          <span class="item-label">Número de Identificación:</span>
          <span class="item-value">{{ personalInfo.identification.number }}</span>
        </div>
        <div class="summary-item" v-if="personalInfo.name.first || personalInfo.name.last">
          <span class="item-label">Nombre Completo:</span>
          <span class="item-value">{{ personalInfo.name.first }} {{ personalInfo.name.last }}</span>
        </div>
        <div class="summary-item" v-if="personalInfo.contact.email">
          <span class="item-label">Correo Electrónico:</span>
          <span class="item-value">{{ personalInfo.contact.email }}</span>
        </div>
        <div class="summary-item" v-if="personalInfo.contact.phone">
          <span class="item-label">Teléfono:</span>
          <span class="item-value">{{ personalInfo.contact.phone }}</span>
        </div>
      </div>
      
      <!-- Datos de la Empresa -->
      <div class="summary-section">
        <h4 class="section-title">Datos de la Empresa</h4>
        <div class="summary-item" v-if="companyCreation.ruc">
          <span class="item-label">RUC:</span>
          <span class="item-value">{{ companyCreation.ruc }}</span>
        </div>
        <div class="summary-item" v-if="companyCreation.legalName">
          <span class="item-label">Razón Social:</span>
          <span class="item-value">{{ companyCreation.legalName }}</span>
        </div>
        <div class="summary-item" v-if="companyCreation.name">
          <span class="item-label">Nombre de la Empresa:</span>
          <span class="item-value">{{ companyCreation.name }}</span>
        </div>
        <div class="summary-item" v-if="companyCreation.domain">
          <span class="item-label">Dominio:</span>
          <span class="item-value">{{ companyCreation.domain }}</span>
        </div>
        <div class="summary-item" v-if="companyCreation.address">
          <span class="item-label">Dirección:</span>
          <span class="item-value">{{ companyCreation.address }}</span>
        </div>
        <div class="summary-item" v-if="companyCreation.phone">
          <span class="item-label">Teléfono:</span>
          <span class="item-value">{{ companyCreation.phone }}</span>
        </div>
        <div class="summary-item" v-if="companyCreation.businessEmail">
          <span class="item-label">Correo Empresarial:</span>
          <span class="item-value">{{ companyCreation.businessEmail }}</span>
        </div>
      </div>
      
      <!-- Configuración de la Empresa -->
      <div class="summary-section">
        <h4 class="section-title">Configuración de la Empresa</h4>
        <div class="summary-item" v-if="companyConfig.regimeRUC">
          <span class="item-label">Régimen RUC:</span>
          <span class="item-value">{{ companyConfig.regimeRUC }}</span>
        </div>
        <div class="summary-item" v-if="companyConfig.categoryRUC">
          <span class="item-label">Categoría RUC:</span>
          <span class="item-value">{{ companyConfig.categoryRUC }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Agente de Retención:</span>
          <span class="item-value">{{ companyConfig.taxAgent?.isAgent ? 'Sí' : 'No' }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Contabilidad Obligatoria:</span>
          <span class="item-value">{{ companyConfig.taxAgent?.accountingRequired ? 'Sí' : 'No' }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Artesano:</span>
          <span class="item-value">{{ companyConfig.artisan?.isArtisan ? 'Sí' : 'No' }}</span>
        </div>
        <div class="summary-item" v-if="companyConfig.artisan?.isArtisan && companyConfig.artisan?.artisanNumber">
          <span class="item-label">Número de Artesano:</span>
          <span class="item-value">{{ companyConfig.artisan.artisanNumber }}</span>
        </div>
        <div class="summary-item" v-if="companyConfig.defaultDocument">
          <span class="item-label">Documento por Defecto:</span>
          <span class="item-value">{{ getDocumentType(companyConfig.defaultDocument) }}</span>
        </div>
        <div class="summary-item" v-if="companyConfig.searchParameter">
          <span class="item-label">Parámetro de Búsqueda:</span>
          <span class="item-value">{{ getSearchParameter(companyConfig.searchParameter) }}</span>
        </div>
        <div class="summary-item" v-if="companyConfig.taxes && companyConfig.taxes.length > 0">
          <span class="item-label">Impuestos:</span>
          <span class="item-value">{{ formatTaxes(companyConfig.taxes) }}</span>
        </div>
        <!-- Nuevo: Mostrar taxesFiveNumber -->
        <div class="summary-item" v-if="companyConfig.taxesFiveNumber">
          <span class="item-label">Código para Impuesto 5%:</span>
          <span class="item-value">{{ companyConfig.taxesFiveNumber }}</span>
        </div>
      </div>
      
      <!-- Sucursal y Punto de Venta -->
      <div class="summary-section">
        <h4 class="section-title">Sucursal y Punto de Venta</h4>
        <div class="summary-item" v-if="branchAndPOS.branch.idBranch">
          <span class="item-label">Código de Sucursal:</span>
          <span class="item-value">{{ branchAndPOS.branch.idBranch }}</span>
        </div>
        <div class="summary-item" v-if="branchAndPOS.branch.commercialName">
          <span class="item-label">Nombre Comercial:</span>
          <span class="item-value">{{ branchAndPOS.branch.commercialName }}</span>
        </div>
        <div class="summary-item" v-if="branchAndPOS.branch.name">
          <span class="item-label">Nombre de Sucursal:</span>
          <span class="item-value">{{ branchAndPOS.branch.name }}</span>
        </div>
        <div class="summary-item" v-if="branchAndPOS.branch.address">
          <span class="item-label">Dirección de Sucursal:</span>
          <span class="item-value">{{ branchAndPOS.branch.address }}</span>
        </div>
        <div class="summary-item" v-if="branchAndPOS.branch.phone">
          <span class="item-label">Teléfono de Sucursal:</span>
          <span class="item-value">{{ branchAndPOS.branch.phone }}</span>
        </div>
        <div class="summary-item" v-if="branchAndPOS.branch.email">
          <span class="item-label">Correo de Sucursal:</span>
          <span class="item-value">{{ branchAndPOS.branch.email }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Despacho Posterior:</span>
          <span class="item-value">{{ branchAndPOS.branch.delayedDispatch ? 'Sí' : 'No' }}</span>
        </div>
        <div class="summary-item">
          <span class="item-label">Establecimiento Turístico:</span>
          <span class="item-value">{{ branchAndPOS.branch.isTouristEstablishment ? 'Sí' : 'No' }}</span>
        </div>
        <div class="summary-item" v-if="branchAndPOS.pointOfSale.idPos">
          <span class="item-label">Código de Punto de Emisión:</span>
          <span class="item-value">{{ branchAndPOS.pointOfSale.idPos }}</span>
        </div>
        <div class="summary-item" v-if="branchAndPOS.pointOfSale.name">
          <span class="item-label">Nombre de Punto de Emisión:</span>
          <span class="item-value">{{ branchAndPOS.pointOfSale.name }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useWizardStore } from "@/stores/wizardStore";
  
  // Obtener la instancia del store
  const wizardStore = useWizardStore();
  
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
      'facturas': 'Facturas electrónicas',
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
  </script>
  
  <style scoped>
  .wizard-summary {
    width: 100%;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
  }
  
  .summary-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--ion-color-primary);
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  /* Estilos para el contenedor del logo */
  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .company-logo {
    max-width: 200px;
    max-height: 200px;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    background-color: white;
  }
  
  .summary-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding: 0.5rem 0;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.05);
  }
  
  .summary-item:last-child {
    border-bottom: none;
  }
  
  .item-label {
    font-weight: 500;
    color: #4b5563;
  }
  
  .item-value {
    font-weight: 600;
    color: #1f2937;
    text-align: right;
    max-width: 60%;
    word-break: break-word;
  }
  
  @media (max-width: 640px) {
    .summary-item {
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .item-value {
      max-width: 100%;
      text-align: left;
    }
    
    .company-logo {
      max-width: 150px;
      max-height: 150px;
    }
  }
  </style>