<template>
    <div>
      <form>
  
        <!-- Nombre empresa (central.illarli)-->
        <div>
          <label>Nombre de tu Empresa</label>
          <br />
          <input type="text" class="border border-black px-2 py-1 rounded w-full" placeholder="Nombre de tu empresa"/>
        </div>

        <!-- RUC (central y sistema .illarli)-->
        <div>
          <label>RUC</label>
          <br />
          <input type="text" class="border border-black px-2 py-1 rounded w-full"/>
        </div>

        <!-- Razon social (sistema.illarli)-->
        <div>
          <label>Razon social</label>
          <br />
          <input type="text" class="border border-black px-2 py-1 rounded w-full"/>
        </div>
      <!-- Miembros en la empresa (sistema.illarli)-->
      <div>
        <label>Miembros en la empresa</label>
        <br />
        <select v-model="CantEmpleadosSeleccionado" class="border border-black px-2 py-1 rounded w-full">
          <option v-for="opcion in opcionesCantEmpleados" :key="opcion.value" :value="opcion.value" >
            {{ opcion.label }}
          </option>
        </select>
      </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  // Definimos la interfaz para las opciones de rol
  interface CantEmpleadosOpcion {
    label: string;
    value: string;
  }
  const opcionesCantEmpleados = ref<CantEmpleadosOpcion[]>([
    { label: 'de 1 a 5', value: '1-5' },
    { label: 'de 6 a 20', value: '6-20' },
    { label: 'de 21 a 50', value: '21-50' },
    { label: 'de 51 a 100', value: '51-100' },
  ]);
  const CantEmpleadosSeleccionado = ref('');
  </script>
  
  