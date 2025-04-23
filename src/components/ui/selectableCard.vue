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
    
    <!-- Contenedor del icono (NUEVO) -->
    <div class="icon-container">
      <Icon 
        v-if="icon" 
        :icon="icon" 
        class="card-icon"
        :class="{ 'text-white': isSelected }"
      />
    </div>
    
    <!-- CORRECCIÓN: Contenedor del título con altura fija y sin espacio excesivo -->
    <div class="card-label" :class="{ 'text-white': isSelected }">
      <p class="label-text">
        {{ label }}
      </p>
    </div>
    
    <!-- Slot para contenido adicional -->
    <div class="selectable-card-content" :class="{ 'text-white': isSelected }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonIcon } from "@ionic/vue";
import { star } from "ionicons/icons";
import { Icon } from "@iconify/vue"; // NUEVO: Importación del componente Icon

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
.card-label {
  height: auto; /* Cambia de 50px a auto */
  min-height: 60px; /* Define una altura mínima en lugar de fija */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Asegurar que el contenido tenga margen superior adecuado */
.selectable-card-content {
  margin-top: 0; /* Eliminar margen superior si existe */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* Opcional: Hacer ajustes en la card completa para mejor distribución */
.selectable-card {
  padding: 0.75rem 0.5rem; /* Reducir el padding */
  gap: 0; /* Eliminar espacio entre elementos */
}
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

/* CORRECCIÓN: Asegurar que el contenido sea blanco cuando está seleccionado */
.selectable-card-content.text-white * {
  color: white !important;
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

/* NUEVO: Estilos para el contenedor del icono */
.icon-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* NUEVO: Estilos para el icono */
.card-icon {
  width: 5rem;
  height: 5rem;
  transition: var(--transition-normal);
}

.label-text {
  font-size: 1rem;
  font-weight: 500;
  transition: var(--transition-normal);
  margin: 0; /* AÑADIDO: Eliminar todos los márgenes */
}

@media (max-width: 768px) {
  .selectable-card {
    height: 160px;
  }
  
  /* NUEVO: Media query para el icono */
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
  
  /* NUEVO: Media query para el icono */
  .card-icon {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .label-text {
    font-size: 0.9rem;
  }
}
</style>