<template>
    <div>
      <form>
        <!-- Vendedor que atendio al cliente/consultor (central y sistema.illarli)-->
        <div>
          <label>Selecciona tu Nombre para registrar tu venta</label>
          <br />
          <select v-model="VendedorSeleccionado" class="border border-black px-2 py-1 rounded w-full">
            <option v-for="opcion in opcionesVendedor" :key="opcion.value" :value="opcion.value" >
              {{ opcion.label }}
            </option>
          </select>
        </div>
        <!-- Nombre (sistema.illarli)-->
      <div>
        <label>Ingresa el número de referencia del comprobante de pago</label>
        <br />
        <input type="text" class="border border-black px-2 py-1 rounded w-full" placeholder="Nro. comprobante pago"/>
      </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Definimos la interfaz para las opciones de Vendedor
  interface VendedorOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  
  const opcionesVendedor = ref<VendedorOpcion[]>([
    { label: 'Vendedor 1', value: 'vendedor1' },
    { label: 'Vendedor 2', value: 'vendedor2' },
    { label: 'Vendedor 3', value: 'vendedor3' },
    { label: 'Vendedor 4', value: 'vendedor4' },
  ]);
  // Variable para almacenar los vendedores
  const VendedorSeleccionado = ref('');
  
  
  // El resto del formulario sigue siendo simple sin validaciones ni estilos adicionales
  </script>
  
  