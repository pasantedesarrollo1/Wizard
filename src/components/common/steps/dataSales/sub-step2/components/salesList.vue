<template>
  <ion-item lines="none" class="ion-margin-vertical">
    <ion-label position="stacked">
      Selecciona tu Nombre para registrar tu venta
    </ion-label> <br>
    
    <!-- Botón que abre el popover personalizado -->
    <ion-button 
      expand="block" 
      fill="outline" 
      @click="abrirPopover($event)" 
      class="select-button w-full text-left justify-between font-normal"
    >
      <span v-if="vendedorSeleccionadoNombre">{{ vendedorSeleccionadoNombre }}</span>
      <span v-else>Selecciona un vendedor</span>
      <ion-icon :icon="chevronDownOutline" slot="end"></ion-icon>
    </ion-button>
    
    <!-- Popover personalizado con buscador -->
    <ion-popover
      :is-open="popoverAbierto"
      :event="popoverEvent"
      @didDismiss="cerrarPopover"
      class="vendedor-popover"
    >
      <ion-content>
        <div class="flex flex-col max-h-[300px]">
          <!-- Buscador -->
          <div class="p-2 border-b border-gray-200">
            <ion-searchbar
              v-model="terminoBusqueda"
              placeholder="Buscar vendedor..."
              class="vendedor-searchbar m-0 p-0"
            ></ion-searchbar>
          </div>
          
          <!-- Lista de vendedores -->
          <ion-list class="overflow-y-auto max-h-[250px]">
            <ion-item
              v-for="vendedor in vendedoresFiltrados"
              :key="vendedor.id"
              button
              @click="seleccionarVendedor(vendedor)"
              class="px-4"
            >
              <ion-label>{{ vendedor.nombre }}</ion-label>
              <ion-icon 
                v-if="vendedor.id === vendedorSeleccionado" 
                :icon="checkmarkOutline" 
                slot="end"
                color="primary"
              ></ion-icon>
            </ion-item>
            <ion-item v-if="vendedoresFiltrados.length === 0" class="text-gray-500 italic">
              <ion-label>No se encontraron vendedores</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </ion-content>
    </ion-popover>
  </ion-item>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonPopover,
  IonContent,
  IonList,
  IonSearchbar
} from '@ionic/vue'
import { salesService } from '@/services/salesService'
import { chevronDownOutline, checkmarkOutline } from 'ionicons/icons'

// Estado para almacenar los vendedores
const vendedores = ref<{ id: number, nombre: string }[]>([])

// Vendedor seleccionado
const vendedorSeleccionado = ref<number | null>(null)

// Estado para el popover
const popoverAbierto = ref(false)
const popoverEvent = ref<Event | null>(null)
const terminoBusqueda = ref('')

// Computar el nombre del vendedor seleccionado
const vendedorSeleccionadoNombre = computed(() => {
  const vendedor = vendedores.value.find(v => v.id === vendedorSeleccionado.value)
  return vendedor ? vendedor.nombre : ''
})

// Vendedores filtrados basados en el término de búsqueda
const vendedoresFiltrados = computed(() => {
  if (!terminoBusqueda.value) {
    return vendedores.value
  }
  const busqueda = terminoBusqueda.value.toLowerCase()
  return vendedores.value.filter(vendedor => 
    vendedor.nombre.toLowerCase().includes(busqueda)
  )
})

// Función para cargar los vendedores
const cargarVendedores = async () => {
  try {
    // Solo cargamos los datos si aún no se han cargado
    if (vendedores.value.length === 0) {
      const data = await salesService.getVendedores()
      vendedores.value = data
    }
  } catch (error) {
    console.log('Error al cargar vendedores')
  }
}

// Abrir el popover
const abrirPopover = async (event: Event) => {
  await cargarVendedores()
  popoverEvent.value = event
  popoverAbierto.value = true
}

// Cerrar el popover
const cerrarPopover = () => {
  popoverAbierto.value = false
  terminoBusqueda.value = '' // Limpiar búsqueda al cerrar
}

// Seleccionar un vendedor
const seleccionarVendedor = (vendedor: { id: number, nombre: string }) => {
  vendedorSeleccionado.value = vendedor.id
  cerrarPopover()
}

// Cargar vendedores al montar el componente (opcional)
onMounted(() => {
  cargarVendedores()
})
</script>

<style lang="scss" scoped>
.select-button {
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 10px;
  --padding-bottom: 10px;
  margin: 0;
  text-transform: none;
}

.vendedor-popover {
  --width: 100%;
  --max-width: 300px;
}

.vendedor-searchbar {
  --background: #f5f5f5;
  --border-radius: 4px;
  --box-shadow: none;
}
</style>