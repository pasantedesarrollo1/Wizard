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
        
        <div class="domain-input-wrapper">
          <div class="domain-input-container" :class="{ 'is-focused': isFocused, 'has-value': domainValue.length > 0 }">
            <div class="prefix">https://</div>
            <input 
              type="text" 
              v-model="domainValue" 
              readonly
              class="domain-input"
              @focus="isFocused = true"
              @blur="handleBlur"
              maxlength="30"
            />
            <div class="suffix">.wanqara.app</div>
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
                <span class="domain-url">https://{{ domainValue }}.wanqara.app</span>
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
        
        <!-- Botones de acción -->
        <div class="action-buttons">
          <ion-button expand="block" color="primary" @click="goToDashboard" class="action-button">
            Ir al Dashboard
          </ion-button>
          <ion-button expand="block" fill="outline" @click="startNewWizard" class="action-button">
            Crear otra empresa
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from "@ionic/vue";
import { lockClosed, storefront } from "ionicons/icons";
import { useWizardStore } from "@/stores/wizardStore";

// Obtener el router para la navegación
const router = useRouter();

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Estados reactivos
const domainValue = ref("");
const isFocused = ref(false);
const companyCreation = ref(wizardStore.getStepData("companyCreation"));
const initialDomainValue = ref("");

// Función para manejar el evento blur del input
const handleBlur = () => {
  isFocused.value = false;
};

// Función para ir al dashboard
const goToDashboard = () => {
  // Aquí se implementaría la navegación al dashboard
  window.open(`https://${domainValue.value}.wanqara.app`, "_blank");
};

// Función para iniciar un nuevo wizard
const startNewWizard = () => {
  // Resetear el store
  wizardStore.resetState();
  // Navegar al inicio del wizard
  router.push("/wizard/sales");
};

// Cargar datos del store si existen
onMounted(() => {
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

.domain-input-wrapper {
  margin-bottom: 1.5rem;
}

.domain-input-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  transition: all 0.3s ease;
}

.domain-input-container:hover {
  border-color: #9ca3af;
}

.domain-input-container.is-focused {
  border-color: #003cff;
  box-shadow: 0 0 0 3px rgba(0, 60, 255, 0.1);
}

.domain-input-container.has-value {
  border-color: #003cff;
  background-color: rgba(0, 60, 255, 0.03);
}

.prefix, .suffix {
  padding: 0 0.75rem;
  font-size: 0.9rem;
  color: #6b7280;
  background-color: #f3f4f6;
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 1px solid #e5e7eb;
}

.suffix {
  border-right: none;
  border-left: 1px solid #e5e7eb;
}

.domain-input {
  flex: 1;
  height: 100%;
  padding: 0 0.75rem;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333;
  background-color: transparent;
}

.domain-input::placeholder {
  color: #9ca3af;
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

/* Estilos para los botones de acción */
.action-buttons {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-button {
  margin: 0;
  height: 48px;
  font-weight: 500;
  --border-radius: 8px;
}

/* Estilos responsivos */
@media (max-width: 640px) {
  .domain-container {
    padding: 1.5rem 1rem;
  }
  
  .domain-input-container {
    height: 42px;
  }
  
  .prefix, .suffix {
    padding: 0 0.5rem;
    font-size: 0.8rem;
  }
  
  .domain-input {
    padding: 0 0.5rem;
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

@media (min-width: 768px) {
  .action-buttons {
    flex-direction: row;
    justify-content: center;
  }
  
  .action-button {
    width: 250px;
  }
}
</style>