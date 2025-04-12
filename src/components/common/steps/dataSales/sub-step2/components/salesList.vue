<template>
  <div class="p-2 relative">
    <!-- Contenedor del selector con Tailwind -->
    <div class="relative mb-2" :class="{ 'opacity-80': isLoading }">
      <!-- Botón mejorado con Tailwind -->
      <ion-button 
        expand="block" 
        :fill="vendedorSeleccionado ? 'solid' : 'outline'" 
        @click="abrirPopover($event)" 
        class="select-button"
        :class="{ 'has-selection': vendedorSeleccionado }"
      >
        <div class="w-full flex justify-between items-center">
          <div class="text-left normal-case font-normal whitespace-nowrap overflow-hidden text-ellipsis">
            <span v-if="vendedorSeleccionadoNombre">{{ vendedorSeleccionadoNombre }}</span>
            <span v-else class="text-gray-500 opacity-80">Identifícate y registra la venta</span>
          </div>
          <div class="flex items-center">
            <ion-icon 
              :icon="chevronDownOutline" 
              class="text-lg transition-transform duration-300"
              :class="{ 'rotate-180': popoverAbierto }"
            ></ion-icon>
          </div>
        </div>
      </ion-button>
      
      <!-- Indicador de carga con Tailwind -->
      <div v-if="isLoading" class="absolute top-1/2 right-10 -translate-y-1/2 z-2">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
    </div>
    
    <!-- Mensaje de error con Tailwind -->
    <div v-if="error" class="flex items-center gap-2 text-red-500 text-sm mt-2 animate-fade-in">
      <ion-icon :icon="alertCircleOutline" color="danger"></ion-icon>
      <span>{{ error }}</span>
    </div>
    
    <!-- Popover mejorado -->
    <ion-popover
      :is-open="popoverAbierto"
      :event="popoverEvent"
      @didDismiss="cerrarPopover"
      class="vendedor-popover"
      :arrow="false"
      side="bottom"
      alignment="start"
    >
      <ion-content>
        <div class="flex flex-col max-h-[350px]">
          <!-- Buscador mejorado con Tailwind -->
          <div class="p-2 border-b border-solid border-gray-200 bg-white sticky top-0 z-10">
            <ion-searchbar
              v-model="terminoBusqueda"
              placeholder="Buscar vendedor..."
              class="vendedor-searchbar"
              :debounce="300"
              animated
              show-clear-button="focus"
            >
            </ion-searchbar>
          </div>
          
          <!-- Lista de vendedores con Tailwind -->
          <div class="flex-1 overflow-y-auto relative">
            <!-- Estado de carga dentro del popover -->
            <div v-if="isLoadingPopover" class="flex flex-col items-center justify-center p-8 text-gray-500 gap-3">
              <ion-spinner name="dots" color="primary" class="w-7 h-7"></ion-spinner>
              <span>Cargando vendedores...</span>
            </div>
            
            <!-- Lista vacía -->
            <div v-else-if="vendedoresFiltrados.length === 0" class="flex flex-col items-center justify-center p-8 text-gray-500 text-center">
              <ion-icon :icon="personOutline" class="text-6xl mb-3 opacity-50"></ion-icon>
              <p class="m-0 text-sm">No se encontraron vendedores{{ terminoBusqueda ? ' con ese nombre' : '' }}</p>
            </div>
            
            <!-- Lista de vendedores -->
            <ion-list v-else class="bg-transparent p-0">
              <ion-item
                v-for="vendedor in vendedoresFiltrados"
                :key="vendedor.id"
                button
                @click="seleccionarVendedor(vendedor)"
                class="vendedor-item"
                :class="{ 'selected': vendedor.id === vendedorSeleccionado }"
              >
                <div class="w-full flex items-center gap-3">
                  <div class="flex items-center justify-center">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold avatar-circle">
                      {{ getInitials(vendedor.nombre) }}
                    </div>
                  </div>
                  <ion-label class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {{ vendedor.nombre }}
                  </ion-label>
                  <ion-icon 
                    v-if="vendedor.id === vendedorSeleccionado" 
                    :icon="checkmarkCircle" 
                    class="text-lg"
                    color="primary"
                  ></ion-icon>
                </div>
              </ion-item>
            </ion-list>
          </div>
        </div>
      </ion-content>
    </ion-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import {
  IonLabel,
  IonButton,
  IonIcon,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonSearchbar,
  IonSpinner,
} from "@ionic/vue"
import { chevronDownOutline, checkmarkCircle, personOutline, alertCircleOutline } from "ionicons/icons"

// Datos de vendedores implementados directamente desde dbSales.json
const vendedoresData = [
  { id: 1, nombre: "Carlos Gómez" },
  { id: 2, nombre: "María Rodríguez" },
  { id: 3, nombre: "Luis Fernández" },
  { id: 4, nombre: "Ana Torres" },
  { id: 5, nombre: "Jorge Ramírez" },
  { id: 6, nombre: "Elena Martínez" },
  { id: 7, nombre: "Pedro Sánchez" },
  { id: 8, nombre: "Laura Morales" },
  { id: 9, nombre: "Andrés Herrera" },
  { id: 10, nombre: "Sofía Castro" }
]

// Estado para almacenar los vendedores
const vendedores = ref(vendedoresData)

// Vendedor seleccionado
const vendedorSeleccionado = ref<number | null>(null)

// Estado para el popover
const popoverAbierto = ref(false)
const popoverEvent = ref<Event | null>(null)
const terminoBusqueda = ref("")

// Estados de carga y error
const isLoading = ref(false)
const isLoadingPopover = ref(false)
const error = ref("")

// Computar el nombre del vendedor seleccionado
const vendedorSeleccionadoNombre = computed(() => {
  const vendedor = vendedores.value.find((v) => v.id === vendedorSeleccionado.value)
  return vendedor ? vendedor.nombre : ""
})

// Vendedores filtrados basados en el término de búsqueda
const vendedoresFiltrados = computed(() => {
  if (!terminoBusqueda.value) {
    return vendedores.value
  }
  const busqueda = terminoBusqueda.value.toLowerCase()
  return vendedores.value.filter((vendedor) => vendedor.nombre.toLowerCase().includes(busqueda))
})

// Función para obtener las iniciales del nombre
const getInitials = (nombre: string): string => {
  return nombre
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

// Simulación de carga para mantener la experiencia de usuario consistente
const simularCarga = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

// Abrir el popover
const abrirPopover = async (event: Event) => {
  popoverEvent.value = event
  popoverAbierto.value = true

  // Simulamos brevemente la carga para mantener la experiencia de usuario
  isLoadingPopover.value = true
  setTimeout(() => {
    isLoadingPopover.value = false
  }, 300)
}

// Cerrar el popover
const cerrarPopover = () => {
  popoverAbierto.value = false
  terminoBusqueda.value = "" // Limpiar búsqueda al cerrar
}

// Seleccionar un vendedor
const seleccionarVendedor = (vendedor: { id: number; nombre: string }) => {
  vendedorSeleccionado.value = vendedor.id
  cerrarPopover()
}

// Función para manejar el cambio de tamaño de la ventana
const handleResize = () => {
  if (popoverAbierto.value) {
    cerrarPopover()
  }
}

// Simulamos la carga inicial al montar el componente
onMounted(() => {
  simularCarga()
  window.addEventListener("resize", handleResize)
})

// Limpiar event listeners al desmontar
onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
})
</script>

<style lang="scss" src="@/components/common/steps/dataSales/sub-step2/styles/salesList.scss" scoped></style>