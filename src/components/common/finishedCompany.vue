<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="success-container">
        
        <!-- Tarjeta de éxito con diseño mejorado -->
        <div class="access-card">
          <h2 class="access-title">¡Empresa Creada Exitosamente!</h2>
          
          <!-- URL de acceso mejorada con mejor visibilidad y feedback -->
          <div class="domain-display">
            <div class="domain-label">Copia el siguiente enlace que te permitirá acceder a tu empresa:</div>
            <div class="domain-url-wrapper">
              <div class="domain-url-display">
                <span class="domain-prefix">https://</span>
                <span class="domain-value">{{ domainValue }}</span>
                <span class="domain-suffix">.illarli.net</span>
              </div>
              <button 
                class="copy-button" 
                @click="copyToClipboard" 
                title="Copiar al portapapeles"
                aria-label="Copiar URL al portapapeles"
              >
                <ion-icon :icon="copy" class="copy-icon"></ion-icon>
              </button>
            </div>
          </div>
          
          <!-- Vista previa del navegador para mejor reconocimiento -->
          <div class="browser-preview" v-if="domainValue.length > 0">
            <div class="browser-chrome">
              <div class="browser-actions">
                <span class="browser-dot red"></span>
                <span class="browser-dot yellow"></span>
                <span class="browser-dot green"></span>
              </div>
              <div class="browser-address-bar">
                <ion-icon :icon="lockClosed" class="secure-icon"></ion-icon>
                <span class="browser-url">{{ fullDomainUrl }}</span>
              </div>
            </div>
            <div class="browser-content">
              <div class="site-preview">
                <div class="site-logo">
                  <ion-icon :icon="storefront" class="site-icon"></ion-icon>
                </div>
                <p class="site-welcome">¡Bienvenido a tu nueva plataforma empresarial!</p>
              </div>
            </div>
          </div>
          
          <!-- Botón de acción principal con etiqueta clara -->
          <div class="action-area">
            <ion-button 
              expand="block" 
              color="primary" 
              @click="goToCompany" 
              class="main-button"
              aria-label="Acceder a mi empresa"
            >
              <ion-icon :icon="open" slot="start"></ion-icon>
              ACCEDER A MI EMPRESA
            </ion-button>
          </div>
        </div>
        
        <!-- Mensaje de confirmación de copiado -->
        <div class="copy-toast" :class="{ 'show-toast': showCopyToast }">
          URL copiada al portapapeles
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/vue";
import { 
  lockClosed, 
  storefront, 
  copy, 
  open
} from "ionicons/icons";
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Estados reactivos
const domainValue = ref("");
const showCopyToast = ref(false);

// Computar la URL completa del dominio
const fullDomainUrl = computed(() => {
  return `https://${domainValue.value}.illarli.net`;
});

// Función para ir a la empresa
const goToCompany = () => {
  // Abrir la URL completa en una nueva ventana
  window.open(fullDomainUrl.value, "_blank", "noopener,noreferrer");
};

// Función para copiar al portapapeles con feedback
const copyToClipboard = () => {
  navigator.clipboard.writeText(fullDomainUrl.value)
    .then(() => {
      showCopyToast.value = true;
      setTimeout(() => {
        showCopyToast.value = false;
      }, 2000);
    })
    .catch(err => {
      console.error('Error al copiar: ', err);
      // Proporcionar feedback alternativo en caso de error
      alert('No se pudo copiar automáticamente. Por favor, copia manualmente la URL: ' + fullDomainUrl.value);
    });
};

// Cargar datos del store si existen
onMounted(() => {
  // Obtener los datos de companyCreation del store
  let companyCreation;
  try {
    companyCreation = wizardStore.getStepData("companyCreation");
  } catch (error) {
    console.error("Error al obtener datos del store:", error);
    companyCreation = null;
  }
  
  // Verificar si existe companyCreation y si tiene la propiedad domain
  if (companyCreation && companyCreation.domain) {
    // Asignar el valor del dominio
    domainValue.value = companyCreation.domain;
  }
});
</script>

<style scoped>
/* Contenedor principal con animación de entrada */
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 1rem;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Tarjeta de acceso */
.access-card {
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.access-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ion-color-primary);
  margin: 0;
  text-align: center;
}

/* URL de acceso mejorada */
.domain-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.domain-label {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 0.25rem;
}

.domain-url-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.domain-url-display {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background-color: #f0f4ff;
  border-radius: 12px;
  font-family: 'SF Mono', 'Consolas', monospace;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.domain-prefix {
  color: #6b7280;
  font-size: 0.95rem;
}

.domain-value {
  font-weight: 600;
  color: #2563eb;
  font-size: 1.05rem;
  padding: 0 0.25rem;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.domain-suffix {
  color: #6b7280;
  font-size: 0.95rem;
}

.copy-button {
  min-width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: #2563eb;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);
}

.copy-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.copy-button:active {
  transform: translateY(1px);
}

.copy-button:focus {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
}

.copy-icon {
  font-size: 20px;
  color: white;
}

/* Vista previa del navegador */
.browser-preview {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  animation: slideUp 0.6s ease-out 0.3s both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.browser-chrome {
  background-color: #f3f4f6;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.browser-actions {
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}

.browser-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.browser-dot.red {
  background-color: #ef4444;
}

.browser-dot.yellow {
  background-color: #f59e0b;
}

.browser-dot.green {
  background-color: #10b981;
}

.browser-address-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-radius: 4px;
  padding: 0.375rem 0.75rem;
  font-size: 0.8rem;
  color: #4b5563;
}

.secure-icon {
  font-size: 14px;
  color: #10b981;
}

.browser-url {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.browser-content {
  background-color: white;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.site-preview {
  text-align: center;
  padding: 1.5rem;
}

.site-logo {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background-color: var(--ion-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.site-icon {
  font-size: 32px;
  color: white;
}

.site-welcome {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0;
}

/* Botón de acción */
.action-area {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: fadeIn 0.6s ease-out 0.6s both;
}

.main-button {
  --border-radius: 10px;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
  font-weight: 600;
  margin: 0;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transition: all 0.3s ease;
}

.main-button:hover {
  --background: var(--ion-color-primary-shade);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
  transform: translateY(-2px);
}

.main-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

/* Toast de copiado */
.copy-toast {
  position: fixed;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: bottom 0.3s ease;
  z-index: 1000;
}

.show-toast {
  bottom: 20px;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .access-card {
    padding: 1.5rem;
  }
  
  .access-title {
    font-size: 1.3rem;
  }
  
  .domain-url-display {
    padding: 0.6rem 1rem;
  }
  
  .domain-value {
    max-width: 150px;
  }
}

@media (max-width: 480px) {
  .access-card {
    padding: 1.25rem;
  }
  
  .domain-url-wrapper {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .domain-url-display {
    width: 100%;
  }
  
  .copy-button {
    align-self: flex-end;
  }
  
  .domain-value {
    max-width: 120px;
  }
  
  .site-logo {
    width: 50px;
    height: 50px;
  }
  
  .site-icon {
    font-size: 24px;
  }
  
  .site-welcome {
    font-size: 0.85rem;
  }
}
</style>