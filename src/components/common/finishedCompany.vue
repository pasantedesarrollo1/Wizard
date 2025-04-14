<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Empresa Creada Exitosamente</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-content">
      <div class="domain-container">
        <h3 class="section-title">¿Cómo acceder a mi empresa?</h3>
        <p class="section-description">Este será el enlace donde podrás acceder a tu sistema</p>
        
        <!-- Texto concatenado de la URL -->
        <div class="domain-url-container">
          <div class="domain-url-text">
            <span class="domain-prefix">https://</span>
            <span class="domain-value">{{ domainValue }}</span>
            <span class="domain-suffix">.illarli.net</span>
          </div>
        </div>
        
        <!-- Vista previa del dominio -->
        <div class="domain-preview" v-if="domainValue.length > 0">
          <h4 class="preview-title">Vista previa</h4>
          <div class="preview-box">
            <div class="preview-browser">
              <div class="browser-dots">
                <span class="browser-dot"></span>
                <span class="browser-dot"></span>
                <span class="browser-dot"></span>
              </div>
              <div class="browser-address">
                <ion-icon :icon="lockClosed" class="lock-icon"></ion-icon>
                <span class="domain-url">{{ fullDomainUrl }}</span>
              </div>
            </div>
            <div class="preview-content">
              <div class="preview-logo">
                <ion-icon :icon="storefront" class="preview-icon"></ion-icon>
              </div>
              <div class="preview-text">{{ domainValue }}</div>
            </div>
          </div>
        </div>
        
        <!-- Botón de acción único -->
        <div class="action-buttons">
          <ion-button expand="block" color="primary" @click="goToCompany" class="action-button">
            IR A MI EMPRESA
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from "@ionic/vue";
import { lockClosed, storefront } from "ionicons/icons";
import { useWizardStore } from "@/stores/wizardStore";


// Obtener la instancia del store
const wizardStore = useWizardStore();

// Estados reactivos
const domainValue = ref("");
const companyCreation = ref({});
const initialDomainValue = ref("");

// Computar la URL completa del dominio
const fullDomainUrl = computed(() => {
  return `https://${domainValue.value}.illarli.net`;
});

// Función para ir a la empresa
const goToCompany = () => {
  // Abrir la URL completa en una nueva ventana
  window.open(fullDomainUrl.value, "_blank");
};

// Cargar datos del store si existen
onMounted(() => {
  const storedCompanyCreation = wizardStore.getStepData("companyCreation");
  companyCreation.value = storedCompanyCreation || {};

  let initialValue = "";
  if (companyCreation.value?.domain) {
    initialValue = companyCreation.value.domain;
  } else if (companyCreation.value?.ruc) {
    // Si no hay dominio pero sí RUC, usamos el RUC como dominio
    initialValue = companyCreation.value.ruc;
  }
  domainValue.value = initialValue;
  initialDomainValue.value = initialValue;
});

// Actualizar el store cuando cambie el valor del dominio
watch(domainValue, (newValue) => {
  if (newValue !== initialDomainValue.value) {
    wizardStore.updateFormSection("companyCreation", {
      domain: newValue,
    });
  }
});
</script>

<style scoped>
.ion-content {
  --background: transparent;
}

.domain-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.section-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

/* Nuevo estilo para el texto de la URL */
.domain-url-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.domain-url-text {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #0066ff;
  border-radius: 8px;
  background-color: white;
  max-width: 100%;
  overflow: hidden;
}

.domain-prefix {
  color: #666;
  font-size: 0.95rem;
}

.domain-value {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
  padding: 0 4px;
}

.domain-suffix {
  color: #666;
  font-size: 0.95rem;
}

.domain-preview {
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.preview-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
}

.preview-box {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.preview-browser {
  background-color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.browser-dots {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.browser-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #d1d5db;
}

.browser-dot:nth-child(1) {
  background-color: #ef4444;
}

.browser-dot:nth-child(2) {
  background-color: #f59e0b;
}

.browser-dot:nth-child(3) {
  background-color: #10b981;
}

.browser-address {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  color: #4b5563;
}

.lock-icon {
  font-size: 12px;
  color: #10b981;
}

.domain-url {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preview-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  min-height: 150px;
}

.preview-logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background-color: #003cff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.preview-icon {
  font-size: 32px;
  color: white;
}

.preview-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

/* Estilos para el botón de acción */
.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.action-button {
  margin: 0;
  height: 48px;
  font-weight: 600;
  --border-radius: 8px;
  width: 100%;
  max-width: 300px;
  font-size: 1rem;
  letter-spacing: 0.5px;
}

/* Estilos responsivos */
@media (max-width: 640px) {
  .domain-container {
    padding: 1.5rem 1rem;
  }
  
  .domain-url-text {
    padding: 10px 12px;
  }
  
  .domain-prefix, .domain-suffix {
    font-size: 0.85rem;
  }
  
  .domain-value {
    font-size: 0.9rem;
  }
  
  .preview-content {
    padding: 1.5rem;
    min-height: 120px;
  }
  
  .preview-logo {
    width: 48px;
    height: 48px;
  }
  
  .preview-icon {
    font-size: 24px;
  }
  
  .preview-text {
    font-size: 1.1rem;
  }
}
</style>