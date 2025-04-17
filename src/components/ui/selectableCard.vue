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

<style scoped>
.selectable-card {
  position: relative;
  width: v-bind('props.width');
  height: v-bind('props.height');
  border-radius: var(--border-radius-lg);
  border: 1px solid #e5e7eb;
  background-color: white;
  transition: var(--transition-normal);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.selectable-card:hover {
  box-shadow: 0px 0px 30px 1px rgba(var(--ion-color-primary-rgb), 0.30);
  transform: scale(0.98);
  border-color: transparent;
}

.selectable-card.selected-card {
  box-shadow: 0px 0px 30px 1px rgba(var(--ion-color-primary-rgb), 0.50);
  transform: scale(0.98);
  background-color: var(--ion-color-primary) !important;
  border-color: transparent !important;
}

.selectable-card.popular-card {
  border-color: var(--ion-color-warning);
}

.selectable-card.popular-card:not(.selected-card) {
  box-shadow: 0px 0px 15px rgba(var(--ion-color-warning-rgb), 0.3);
}

.popular-tag {
  position: absolute;
  top: 0;
  right: 1.5rem;
  background-color: var(--ion-color-warning);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0 0 12px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: var(--shadow-sm);
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
  transition: var(--transition-normal);
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
  transition: var(--transition-normal);
}

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