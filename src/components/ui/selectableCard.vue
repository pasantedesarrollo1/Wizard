<template>
    <div 
      class="selectable-card"
      :class="{ 
        'selected-card': isSelected, 
        'popular-card': isPopular 
      }"
      @click="selectCard"
    >
      <!-- Etiqueta de popular si corresponde -->
      <div v-if="isPopular" class="popular-tag">
        <ion-icon :icon="star" class="popular-icon"></ion-icon>
        {{ popularLabel }}
      </div>
      
      <!-- Contenedor del icono -->
      <div class="icon-container">
        <Icon 
          v-if="icon" 
          :icon="icon" 
          class="card-icon"
          :class="{ 'text-white': isSelected }"
        />
      </div>
      
      <!-- Texto de la tarjeta -->
      <div class="card-label">
        <p class="label-text" :class="{ 'text-white': isSelected }">
          {{ label }}
        </p>
        <!-- Slot para contenido adicional -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { Icon } from "@iconify/vue";
  import { IonIcon } from "@ionic/vue";
  import { star } from "ionicons/icons";
  
  interface Props {
    modelValue: string;
    value: string;
    label?: string;
    icon?: string;
    isPopular?: boolean;
    popularLabel?: string;
    height?: string;
    width?: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    label: "",
    icon: "",
    isPopular: false,
    popularLabel: "Popular",
    height: "130px",
    width: "100%"
  });
  
  const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
  }>();
  
  // Computed para determinar si la tarjeta está seleccionada
  const isSelected = computed(() => props.modelValue === props.value);
  
  // Función para seleccionar la tarjeta
  const selectCard = () => {
    emit("update:modelValue", props.value);
  };
  </script>
  
  <style lang="scss" scoped>
  // Variables
  $primary-color: var(--ion-color-primary, rgb(0, 60, 255));
  $primary-light: rgba(var(--ion-color-primary-rgb, 0, 60, 255), 0.1);
  $primary-lighter: rgba(var(--ion-color-primary-rgb, 0, 60, 255), 0.05);
  $warning-color: var(--ion-color-warning, #ffce00);
  $border-radius: 20px;
  
  .selectable-card {
    position: relative;
    width: v-bind('props.width');
    height: v-bind('props.height');
    border-radius: $border-radius;
    border: 1px solid #e5e7eb;
    background-color: white;
    transition: all 0.3s ease;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    
    &:hover {
      box-shadow: 0px 0px 30px 1px rgba($primary-color, 0.30);
      transform: scale(0.98);
      border-color: transparent;
    }
    
    &.selected-card {
      box-shadow: 0px 0px 30px 1px rgba($primary-color, 0.50);
      transform: scale(0.98);
      background-color: $primary-color !important;
      border-color: transparent !important;
    }
    
    &.popular-card {
      border-color: $warning-color;
      
      &:not(.selected-card) {
        box-shadow: 0px 0px 15px rgba($warning-color, 0.3);
      }
    }
  }
  
  .popular-tag {
    position: absolute;
    top: 0;
    right: 1.5rem;
    background-color: $warning-color;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0 0 12px 12px;
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  
  .popular-icon {
    font-size: 1rem;
  }
  
  .icon-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  
  .card-icon {
    width: 5rem;
    height: 5rem;
    transition: all 0.3s ease;
  }
  
  .card-label {
    text-align: center;
    width: 100%;
    margin-top: auto;
  }
  
  .label-text {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  // Estilos responsivos
  @media (max-width: 768px) {
    .selectable-card {
      height: 160px;
    }
    
    .card-icon {
      width: 4rem;
      height: 4rem;
    }
    
    .label-text {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 576px) {
    .selectable-card {
      height: 140px;
    }
    
    .card-icon {
      width: 3.5rem;
      height: 3.5rem;
    }
    
    .label-text {
      font-size: 0.9rem;
    }
  }
  </style>