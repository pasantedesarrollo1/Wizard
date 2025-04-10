<template>
  <ion-item lines="none" class="ion-margin-vertical">
    <ion-label position="stacked">
      Selecciona tu Nombre para registrar tu venta
    </ion-label> <br>
    <ion-select 
      v-model="VendedorSeleccionado" 
      interface="popover" 
      placeholder="Selecciona un vendedor"
      fill="outline"
    >
      <ion-select-option
        v-for="opcion in opcionesVendedor"
        :key="opcion.value"
        :value="opcion.value"
      >
        {{ opcion.label }}
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

// Interfaz para las opciones de vendedor
interface VendedorOpcion {
  label: string
  value: string
}

// Opciones de vendedores
const opcionesVendedor = ref<VendedorOpcion[]>([
  { label: 'Vendedor 1', value: 'vendedor1' },
  { label: 'Vendedor 2', value: 'vendedor2' },
  { label: 'Vendedor 3', value: 'vendedor3' },
  { label: 'Vendedor 4', value: 'vendedor4' }
])

// Vendedor seleccionado
const VendedorSeleccionado = ref('')
</script>