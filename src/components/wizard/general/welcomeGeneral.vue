<template>
    <div class="welcome-container">
      <!-- Animated background elements -->
      <div class="animated-background">
        <!-- Animated waves -->
        <div class="wave-container">
          <div class="wave wave1"></div>
          <div class="wave wave2"></div>
          <div class="wave wave3"></div>
        </div>
        
        <!-- Floating circles -->
        <div v-for="n in 20" :key="`circle-${n}`" class="floating-circle" :style="{ 
          left: `${Math.random() * 100}%`, 
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          width: `${Math.random() * 150 + 50}px`,
          height: `${Math.random() * 150 + 50}px`,
          opacity: 0.03 + Math.random() * 0.07
        }"></div>
        
        <!-- Particles -->
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
  
      <!-- Main content -->
      <div class="content">
        <div class="welcome-card">
          <!-- Logo animation -->
          <div class="logo-container">
            <div class="logo-circle">
              <div class="logo-inner">W</div>
            </div>
          </div>
          
          <!-- Main title with letter animation -->
          <h1 class="welcome-title">
            <span 
              v-for="(letter, index) in '¡Wanqara te da la bienvenida!'" 
              :key="`title-${index}`"
              class="animated-letter"
              :style="{ 
                animationDelay: `${0.5 + index * 0.04}s`
              }"
            >
              {{ letter === ' ' ? '\u00A0' : letter }}
            </span>
          </h1>
          
          <!-- Description text with line animation -->
          <div class="description-container">
            <p class="description-text first-line">
              <span 
                v-for="(letter, index) in 'Este asistente te guiará paso a paso para configurar'" 
                :key="`desc1-${index}`"
                class="animated-letter-desc"
                :style="{ 
                  animationDelay: `${1.5 + index * 0.01}s`
                }"
              >
                {{ letter === ' ' ? '\u00A0' : letter }}
              </span>
            </p>
            <p class="description-text second-line">
              <span 
                v-for="(letter, index) in 'lo que necesitas de forma rápida y sencilla. ¡Empecemos!'" 
                :key="`desc2-${index}`"
                class="animated-letter-desc"
                :style="{ 
                  animationDelay: `${2.3 + index * 0.01}s`
                }"
              >
                {{ letter === ' ' ? '\u00A0' : letter }}
              </span>
            </p>
          </div>
          
          <!-- Call to action text -->
          <div class="cta-text-container">
            <p class="cta-text">
              <span 
                v-for="(letter, index) in 'Haz clic en el botón de siguiente para comenzar'" 
                :key="`cta-${index}`"
                class="animated-letter-cta"
                :style="{ 
                  animationDelay: `${3.2 + index * 0.02}s`
                }"
              >
                {{ letter === ' ' ? '\u00A0' : letter }}
              </span>
            </p>
          </div>
          
          <!-- Decorative elements -->
          <div class="decorative-dots">
            <div v-for="n in 5" :key="`dot-${n}`" class="dot" :style="{
              animationDelay: `${3.5 + n * 0.2}s`
            }"></div>
          </div>

          <!-- Botón Comenzar (Nuevo) -->
                    <div class="start-button-container">
            <button 
              class="start-button" 
              @click="onStartClick"
              :style="{ animationDelay: '4.5s' }"
            >
              Comenzar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { onMounted, ref } from 'vue';

// Definimos el evento que emitirá este componente cuando se haga clic en "Comenzar"
const emit = defineEmits(['start']);

const animationComplete = ref(false);

onMounted(() => {
  setTimeout(() => {
    animationComplete.value = true;
  }, 4000);
});

// Función que se ejecuta cuando se hace clic en el botón "Comenzar"
const onStartClick = () => {
  // Emitimos el evento 'start' para notificar al componente padre
  emit('start');
};

  </script>
  
  <style>
  /* Base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .welcome-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-height: 100vh;
    background-color: white;
    color: #333;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Animated background */
  .animated-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
  }
  
  /* Wave animation */
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
  
  /* Floating circles */
  .floating-circle {
    position: absolute;
    border-radius: 50%;
    background-color: #003cff;
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
  
  /* Particles */
  .particle {
    position: absolute;
    border-radius: 50%;
    background-color: #003cff;
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
  
  /* Content styles */
  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 2rem;
    width: 100%;
    max-width: 800px;
  }
  
  /* Welcome card */
  .welcome-card {
    position: relative;
    padding: 3rem 2rem;
    border-radius: 24px;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 80px rgba(0, 60, 255, 0.15);
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
  
  /* Logo animation */
  .logo-container {
    margin-bottom: 2rem;
    perspective: 1000px;
  }
  
  .logo-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #003cff, #0080ff);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(0, 60, 255, 0.3);
    animation: logoRotate 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transform: rotateY(90deg) scale(0.5);
    opacity: 0;
  }
  
  .logo-inner {
    color: white;
    font-size: 2.5rem;
    font-weight: 800;
    animation: logoInnerPulse 3s 1s ease-in-out infinite;
  }
  
  @keyframes logoRotate {
    0% {
      transform: rotateY(90deg) scale(0.5);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotateY(0) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes logoInnerPulse {
    0%, 100% {
      transform: scale(1);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    50% {
      transform: scale(1.1);
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    }
  }
  
  /* Welcome title */
  .welcome-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #003cff;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  /* Description text */
  .description-container {
    margin-bottom: 2rem;
  }
  
  .description-text {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  /* CTA text */
  .cta-text-container {
    margin-top: 2.5rem;
    padding: 1rem;
    border-radius: 12px;
    background-color: rgba(0, 60, 255, 0.05);
  }
  
  .cta-text {
    font-size: 1.1rem;
    color: #003cff;
    font-weight: 600;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  /* Letter animations */
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
  
  .animated-letter-cta {
    display: inline-block;
    opacity: 0;
    transform: translateY(5px);
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
  
  /* Decorative dots */
  .decorative-dots {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 2rem;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #003cff;
    opacity: 0;
    transform: scale(0);
    animation: dotAppear 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  @keyframes dotAppear {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
  }
  
    /* Nuevo: Estilos para el botón de comenzar */
    .start-button-container {
    margin-top: 2.5rem;
    opacity: 0;
    animation: fadeIn 0.5s ease-in-out forwards;
    animation-delay: 4.5s;
  }
  
  .start-button {
    background: linear-gradient(135deg, #003cff, #0080ff);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 40px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0, 60, 255, 0.2);
    transition: all 0.3s ease;
    transform: scale(0.95);
  }
  
  .start-button:hover {
    transform: scale(1);
    box-shadow: 0 15px 25px rgba(0, 60, 255, 0.3);
  }
  
  .start-button:active {
    transform: scale(0.98);
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
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .welcome-title {
      font-size: 2rem;
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
    
    .logo-circle {
      width: 60px;
      height: 60px;
    }
    
    .logo-inner {
      font-size: 2rem;
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
    
    .logo-circle {
      width: 50px;
      height: 50px;
    }
    
    .logo-inner {
      font-size: 1.5rem;
    }
  }
  </style>