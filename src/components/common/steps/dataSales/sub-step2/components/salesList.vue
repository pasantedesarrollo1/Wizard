<template>
  <ion-item lines="none" class="ion-margin-vertical">
    <ion-label position="stacked">
      Selecciona tu Nombre para registrar tu venta
    </ion-label> <br>
    <ion-select 
      v-model="vendedorSeleccionado" 
      interface="popover" 
      placeholder="Selecciona un vendedor"
      fill="outline"
      @ionFocus="cargarVendedores"
    >
      <ion-select-option
        v-for="vendedor in vendedores"
        :key="vendedor.id"
        :value="vendedor.id"
      >
        {{ vendedor.nombre }}
      </ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption
} from '@ionic/vue'
import { salesService } from '@/services/salesService'

// Estado para almacenar los vendedores
const vendedores = ref<{ id: number, nombre: string }[]>([])

// Vendedor seleccionado
const vendedorSeleccionado = ref<number | null>(null)

// Función para cargar los vendedores cuando se hace clic en el dropdown
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
</script>
