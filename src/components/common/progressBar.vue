<template>
    <div class="progress-bar">
      <div 
        v-for="(step, index) in steps" 
        :key="index" 
        class="step"
        :class="{ active: index <= currentStep }"
      >
        {{ step.label }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  defineProps({
    steps: Array,        // Lista de pasos a mostrar
    currentStep: Number  // Paso actual
  });
  </script>
  
  <style scoped>
  .progress-bar {
    display: flex;
    gap: 10px;
  }
  .step {
    padding: 5px 10px;
    border-radius: 5px;
    background: #ddd;
  }
  .step.active {
    background: #4CAF50;
    color: white;
  }
  </style>
  