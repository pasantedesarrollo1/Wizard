<template>
  <ion-content class="ion-padding">
    <div class="welcome-container">
      <!-- Fondo minimalista con gradiente sutil -->
      <div class="minimal-background">
        <div class="gradient-overlay"></div>
      </div>
  
      <!-- Contenido principal -->
      <div class="content">
        <div class="welcome-card">
          <!-- Logo con soporte para src -->
          <div class="logo-container">
            <div class="logo-rectangle">
              <img src="@\assets\icons\logo-horizontal.png" alt="Logo" class="logo-image" />
            </div>
          </div>
          
          <!-- Título principal -->
          <h1 class="welcome-title">¡Wanqara te da la bienvenida!</h1>
          
          <!-- Descripción -->
          <div class="description-container">
            <p class="description-text">
              Este asistente te guiará paso a paso para configurar
              lo que necesitas de forma rápida y sencilla. ¡Empecemos!
            </p>
          </div>
          
          <!-- Indicación para continuar -->
          <div class="cta-container">
            <p class="cta-text">
              Haz clic en el siguiente botón para comenzar
            </p>
          </div>

          <!-- Botón Comenzar -->
          <div class="button-container">
            <ion-button 
              expand="block"
              class="start-button" 
              @click="onStartClick"
            >
              Comenzar
            </ion-button>
          </div>
        </div>
      </div>
    </div>
  </ion-content>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { 
  IonContent, 
  IonButton 
} from '@ionic/vue';

// Definimos el evento que emitirá este componente cuando se haga clic en "Comenzar"
const emit = defineEmits(['start']);

onMounted(() => {
  // Añadimos la clase para iniciar las animaciones cuando el componente está montado
  document.querySelector('.welcome-container')?.classList.add('animate');
});

// Función que se ejecuta cuando se hace clic en el botón "Comenzar"
const onStartClick = () => {
  // Emitimos el evento 'start' para notificar al componente padre
  emit('start');
};
</script>
  
<style scoped>
/* Estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  
.welcome-container {
  font-family: var(--ion-font-family);
  min-height: 100vh;
  background-color: white;
  color: var(--ion-color-dark);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Fondo minimalista */
.minimal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #f9f9f9;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(var(--ion-color-primary-rgb), 0.03) 0%, rgba(var(--ion-color-primary-rgb), 0.01) 100%);
}
  
/* Contenido principal */
.content {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
  max-width: 600px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.welcome-container.animate .content {
  opacity: 1;
  transform: translateY(0);
}
  
/* Tarjeta de bienvenida */
.welcome-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
  
/* Logo */
.logo-container {
  margin-bottom: 2.5rem;
  width: 100%;
}
  
.logo-rectangle {
  width: 100%;
  height: 80px;
  background: white;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(var(--ion-color-primary-rgb), 0.15);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.2s;
}

.welcome-container.animate .logo-rectangle {
  opacity: 1;
  transform: scale(1);
}

.logo-image {
  height: 60%;
  object-fit: contain;
}
  
.logo-placeholder {
  color: var(--ion-color-primary);
  font-size: 2rem;
  font-weight: 700;
}
  
/* Título */
.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--ion-color-primary);
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.4s;
}

.welcome-container.animate .welcome-title {
  opacity: 1;
  transform: translateY(0);
}
  
/* Descripción */
.description-container {
  margin-bottom: 2.5rem;
}
  
.description-text {
  font-size: 1.1rem;
  color: var(--ion-color-medium);
  line-height: 1.6;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.6s;
}

.welcome-container.animate .description-text {
  opacity: 1;
  transform: translateY(0);
}
  
/* Sección de llamada a la acción */
.cta-container {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: rgba(var(--ion-color-primary-rgb), 0.03);
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.8s;
}

.welcome-container.animate .cta-container {
  opacity: 1;
  transform: translateY(0);
}
  
.cta-text {
  font-size: 1rem;
  color: var(--ion-color-primary);
  font-weight: 500;
}

/* Indicador visual minimalista */
.indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
}

.indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--ion-color-primary);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.welcome-container.animate .indicator span:nth-child(1) {
  opacity: 0.7;
  transform: scale(1);
  transition-delay: 1s;
}

.welcome-container.animate .indicator span:nth-child(2) {
  opacity: 0.7;
  transform: scale(1);
  transition-delay: 1.2s;
}

.welcome-container.animate .indicator span:nth-child(3) {
  opacity: 0.7;
  transform: scale(1);
  transition-delay: 1.4s;
}
  
/* Botón de comenzar */
.button-container {
  margin-top: 2.5rem;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 1.6s;
}

.welcome-container.animate .button-container {
  opacity: 1;
  transform: translateY(0);
}
  
.start-button {
  --background: var(--ion-color-primary);
  --color: white;
  --border-radius: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 40px;
  --padding-end: 40px;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 auto;
  box-shadow: 0 8px 16px rgba(var(--ion-color-primary-rgb), 0.15);
  transition: all 0.3s ease;
}
  
.start-button:hover {
  --background: var(--ion-color-primary-shade);
  box-shadow: 0 10px 20px rgba(var(--ion-color-primary-rgb), 0.2);
}
  
/* Ajustes responsivos */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 1.8rem;
  }
    
  .description-text {
    font-size: 1rem;
  }
    
  .cta-text {
    font-size: 0.9rem;
  }
    
  .welcome-card {
    padding: 2rem 1.5rem;
  }
    
  .logo-rectangle {
    height: 70px;
  }
}
  
@media (max-width: 480px) {
  .welcome-title {
    font-size: 1.5rem;
  }
    
  .description-text {
    font-size: 0.9rem;
  }
    
  .welcome-card {
    padding: 1.5rem 1rem;
  }
    
  .logo-rectangle {
    height: 60px;
  }
    
  .logo-placeholder {
    font-size: 1.5rem;
  }
}
</style>