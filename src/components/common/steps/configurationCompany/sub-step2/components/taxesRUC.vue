<template>
  <span>Selecciona <b>los impuestos</b> a aplicar en tus ventas</span>

  <div class="p-2 py-2 bg-white rounded-xl">
    <!-- Contenedor centrado para las tarjetas -->
    <div class="flex justify-center items-center gap-4 mt-3">
      <div
        v-for="opcion in opcionesImpuesto"
        :key="opcion.value"
        class="unified-card w-[90px] h-[70px] rounded-[16px] transition-all duration-300 cursor-pointer p-2 flex items-center justify-center border border-gray-200 bg-white hover:shadow-blue-300 hover:shadow-md hover:scale-[0.98] hover:border-transparent sm:w-[80px] sm:h-[60px]"
        :class="{ 'selected-card': isSelected(opcion.value) }"
        @click="toggleImpuesto(opcion.value)"
      >
        <div
          class="text-3xl font-bold transition-all duration-300 leading-none sm:text-2xl"
          :class="{
            'text-white': isSelected(opcion.value),
            'text-blue-600': !isSelected(opcion.value),
          }"
        >
          {{ opcion.label }}
        </div>
      </div>
    </div>

    <!-- Campo de entrada simplificado para el código de 5% -->
    <div v-if="isSelected('5')" class="mt-4">
      <div class="text-sm text-gray-700 mb-1">
        Ingresa el código proporcionado por el SRI para activar el 5% de
        impuestos
      </div>
      <div class="relative">
        <span
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <Icon icon="lsicon:number-filled" width="18" height="18" />
        </span>
        <input
          type="text"
          placeholder="Ingresa tu código para 5%"
          v-model="taxesFiveNumberLocal"
          class="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-base transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          @input="updateTaxesFiveNumber"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Icon } from "@iconify/vue";
import { allowOnlyNumericCharacters } from "@/utils/input-controls"; // Importamos la función de validación

// Definir props para recibir datos del componente padre
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

// Definir eventos para comunicarse con el componente padre
const emit = defineEmits(["update"]);

interface ImpuestoOpcion {
  label: string;
  value: string;
}

const opcionesImpuesto = ref<ImpuestoOpcion[]>([
  { label: "15%", value: "15" },
  { label: "5%", value: "5" },
  { label: "0%", value: "0" },
]);

// Estado local para los impuestos seleccionados
const selectedTaxes = ref<string[]>([]);

// Estado local para el código de 5%
const taxesFiveNumberLocal = ref("");

// Inicializar el componente
onMounted(() => {
  // Asegurarse de que el estado local esté sincronizado con los props
  initializeFromProps();
});

// Función para inicializar el estado local desde los props
const initializeFromProps = () => {
  if (props.formData && props.formData.taxes) {
    selectedTaxes.value =
      Array.isArray(props.formData.taxes) && props.formData.taxes.length > 0
        ? [...props.formData.taxes]
        : ["15"]; // Establecer '15' como valor predeterminado si no hay impuestos seleccionados
  } else {
    selectedTaxes.value = ["15"]; // Establecer '15' como valor predeterminado si no hay datos
  }

  // Inicializar código de 5%
  if (props.formData && props.formData.taxesFiveNumber !== undefined) {
    taxesFiveNumberLocal.value = props.formData.taxesFiveNumber;
  } else {
    taxesFiveNumberLocal.value = "";
  }
};

// Sincronizar el estado local con los props cuando cambian
watch(
  () => props.formData,
  () => {
    initializeFromProps();
  },
  { deep: true }
);

// Verificar si un impuesto está seleccionado
const isSelected = (value: string): boolean => {
  return selectedTaxes.value.includes(value);
};

// Alternar la selección de un impuesto
const toggleImpuesto = (value: string) => {
  const currentTaxes = [...selectedTaxes.value];
  const index = currentTaxes.indexOf(value);

  if (index === -1) {
    // Si no está seleccionado, lo añadimos
    currentTaxes.push(value);
  } else {
    // Si ya está seleccionado, lo quitamos
    // No permitimos quitar cualquier impuesto si es el único seleccionado
    if (currentTaxes.length > 1) {
      currentTaxes.splice(index, 1);
    } else {
      console.log(
        `No se puede deseleccionar ${value}% cuando es el único impuesto seleccionado`
      );
      return; // Salir de la función sin hacer cambios
    }
  }

  // Actualizar el estado local
  selectedTaxes.value = currentTaxes;

  // Emitir evento al componente padre
  emit("update", "root", { taxes: currentTaxes });

  console.log("Impuestos seleccionados:", currentTaxes);

  // Si se deselecciona 5%, limpiar el código
  if (!currentTaxes.includes("5")) {
    taxesFiveNumberLocal.value = "";
    emit("update", "root", { taxesFiveNumber: "" });
  }
};

// Actualizar el código de 5% con validación numérica
const updateTaxesFiveNumber = (event: Event) => {
  // Aplicar la validación para permitir solo caracteres numéricos
  taxesFiveNumberLocal.value = allowOnlyNumericCharacters(event);
  
  // Emitir evento al componente padre con el valor validado
  emit("update", "root", { taxesFiveNumber: taxesFiveNumberLocal.value });
};
</script>

<style scoped>
/* Estilos para cards seleccionadas que no se pueden lograr fácilmente con Tailwind */
.selected-card {
  box-shadow: 0px 0px 15px 1px rgba(0, 60, 255, 0.4);
  transform: scale(0.98);
  background-color: rgb(0, 60, 255) !important;
  border-color: transparent !important;
}
</style>