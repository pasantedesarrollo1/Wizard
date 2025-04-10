<template>
  <ion-page>
    <ion-content class="ion-content">
      <!-- Contenedor principal con animaciones y estilos similares a welcomeGeneral.vue -->
      <div class="finished-container">
        <!-- Fondo animado -->
        <div class="animated-background">
          <!-- Ondas animadas -->
          <div class="wave-container">
            <div class="wave wave1"></div>
            <div class="wave wave2"></div>
            <div class="wave wave3"></div>
          </div>
          
          <!-- Círculos flotantes -->
          <div v-for="n in 20" :key="`circle-${n}`" class="floating-circle" :style="{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            opacity: 0.03 + Math.random() * 0.07
          }"></div>
          
          <!-- Partículas -->
          <div v-for="n in 40" :key="`particle-${n}`" class="particle" :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            opacity: 0.2 + Math.random() * 0.4
          }"></div>
        </div>

        <!-- Contenido principal -->
        <div class="content">
          <ion-card class="success-card">
            <!-- Animación de éxito -->
            <div class="success-icon-container">
              <div class="success-icon">
                <ion-icon :icon="checkmarkCircleOutline" size="large"></ion-icon>
              </div>
            </div>
            
            <!-- Título principal con animación de letras -->
            <ion-card-header>
              <ion-card-title class="success-title">
                <span 
                  v-for="(letter, index) in '¡Felicitaciones has creado tu nueva empresa!'" 
                  :key="`title-${index}`"
                  class="animated-letter"
                  :style="{ 
                    animationDelay: `${0.5 + index * 0.04}s`
                  }"
                >
                  {{ letter === ' ' ? '\u00A0' : letter }}
                </span>
              </ion-card-title>
            </ion-card-header>
            
            <ion-card-content>
              <!-- Texto descriptivo -->
              <div class="description-container">
                <ion-text class="description-text">
                  <span 
                    v-for="(letter, index) in 'Tu empresa ha sido creada exitosamente. Ahora puedes comenzar a utilizarla.'" 
                    :key="`desc-${index}`"
                    class="animated-letter-desc"
                    :style="{ 
                      animationDelay: `${1.5 + index * 0.01}s`
                    }"
                  >
                    {{ letter === ' ' ? '\u00A0' : letter }}
                  </span>
                </ion-text>
              </div>
              
              <!-- URL de acceso -->
              <ion-item lines="none" class="domain-url-container">
                <ion-label class="domain-url-label">Accede a tu empresa en:</ion-label>
                <ion-button 
                  fill="clear"
                  href="https://tudominio.wanqara.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="domain-link"
                >
                  https://tudominio.wanqara.com
                </ion-button>
              </ion-item>
              
              <!-- Elementos decorativos -->
              <div class="confetti-container">
                <div v-for="n in 30" :key="`confetti-${n}`" class="confetti" :style="{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${1 + Math.random() * 3}s`,
                  backgroundColor: getRandomColor()
                }"></div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/vue';
import { checkmarkCircleOutline } from 'ionicons/icons';

// Función para generar colores aleatorios para los confetis
const getRandomColor = () => {
  const colors = ['#003cff', '#4d7fff', '#66a3ff', '#99c2ff', '#cce0ff'];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>

<style scoped>
/* Estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ion-content {
  --background: transparent;
}

.finished-container {
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

/* Fondo animado */
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

/* Animación de ondas */
.wave-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18.17 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" fill="%23003cff" fill-opacity=".05"/></svg>') repeat-x;
  background-size: 1200px 100%;
  animation: wave 20s linear infinite;
  transform-origin: center bottom;
}

.wave1 {
  animation: wave 20s linear infinite;
  z-index: 1;
  opacity: 0.3;
  animation-delay: 0s;
  bottom: 0;
}

.wave2 {
  animation: wave 25s linear infinite;
  z-index: 2;
  opacity: 0.2;
  animation-delay: -5s;
  bottom: 10px;
}

.wave3 {
  animation: wave 30s linear infinite;
  z-index: 3;
  opacity: 0.1;
  animation-delay: -2s;
  bottom: 20px;
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Círculos flotantes */
.floating-circle {
  position: absolute;
  border-radius: 50%;
  background-color: var(--ion-color-primary);
  animation: float 20s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) scale(1.1) rotate(5deg);
  }
  50% {
    transform: translateY(20px) scale(0.9) rotate(-5deg);
  }
  75% {
    transform: translateY(-25px) scale(1.05) rotate(3deg);
  }
}

/* Partículas */
.particle {
  position: absolute;
  border-radius: 50%;
  background-color: var(--ion-color-primary);
  animation: floatParticle 10s infinite ease-in-out;
}

@keyframes floatParticle {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    transform: translateY(-100px) translateX(50px);
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
}

/* Estilos del contenido */
.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
}

/* Tarjeta de éxito */
.success-card {
  position: relative;
  padding: 3rem 2rem;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 80px rgba(var(--ion-color-primary-rgb), 0.15);
  overflow: hidden;
  animation: cardAppear 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform: translateY(30px);
  opacity: 0;
}

@keyframes cardAppear {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Animación del icono de éxito */
.success-icon-container {
  margin-bottom: 2rem;
  perspective: 1000px;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-primary-tint));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(var(--ion-color-primary-rgb), 0.3);
  animation: iconAppear 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform: scale(0.5);
  opacity: 0;
  color: white;
}

@keyframes iconAppear {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Título de éxito */
.success-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--ion-color-primary);
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Texto descriptivo */
.description-container {
  margin-bottom: 2rem;
}

.description-text {
  font-size: 1.2rem;
  color: var(--ion-color-medium);
  line-height: 1.6;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Animaciones de letras */
.animated-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: letterFadeIn 0.5s ease forwards;
}

.animated-letter-desc {
  display: inline-block;
  opacity: 0;
  transform: translateY(10px);
  animation: letterFadeIn 0.3s ease forwards;
}

@keyframes letterFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Confeti */
.confetti-container {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -20px;
  opacity: 0;
  animation: confettiFall linear forwards;
}

@keyframes confettiFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(1000px) rotate(720deg);
    opacity: 0;
  }
}

/* Estilos para el contenedor de la URL del dominio */
.domain-url-container {
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: rgba(var(--ion-color-primary-rgb), 0.05);
  border-radius: 12px;
  border: 1px dashed var(--ion-color-primary);
  max-width: 90%;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: 2.5s;
  opacity: 0;
  position: relative;
  z-index: 5; /* Asegura que esté por encima del confeti */
  --background: transparent;
}

.domain-url-label {
  font-size: 1rem;
  color: var(--ion-color-medium);
  margin-bottom: 0.5rem;
}

.domain-link {
  --color: var(--ion-color-primary);
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  --padding-top: 0.5rem;
  --padding-bottom: 0.5rem;
  --border-radius: 8px;
  --background: rgba(var(--ion-color-primary-rgb), 0.1);
  transition: all 0.3s ease;
}

.domain-link:hover {
  --background: rgba(var(--ion-color-primary-rgb), 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(var(--ion-color-primary-rgb), 0.2);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ajustes responsivos */
@media (max-width: 768px) {
  .success-title {
    font-size: 2rem;
  }
  
  .description-text {
    font-size: 1rem;
  }
  
  .success-card {
    padding: 2rem 1.5rem;
  }
  
  .success-icon {
    width: 60px;
    height: 60px;
  }
  
  .domain-link {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .success-title {
    font-size: 1.5rem;
  }
  
  .description-text {
    font-size: 0.9rem;
  }
  
  .success-card {
    padding: 1.5rem 1rem;
  }
  
  .success-icon {
    width: 50px;
    height: 50px;
  }
  
  .domain-link {
    font-size: 0.9rem;
    --padding-start: 0.4rem;
    --padding-end: 0.4rem;
    --padding-top: 0.4rem;
    --padding-bottom: 0.4rem;
  }
}
</style>