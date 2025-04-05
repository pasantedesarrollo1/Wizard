<template>
  <div>
    <form>
      <!-- Tipo de identificación -->
      <div>
        <label>Tipo de identificación</label>
        <br />
        <select v-model="tipoIDSeleccionado" class="border border-black px-2 py-1 rounded w-full">
          <option v-for="opcion in opcionesTipoID" :key="opcion.value" :value="opcion.value" >
            {{ opcion.label }}
          </option>
        </select>
      </div>

      <!-- Dirección -->
      <div>
        <label>Dirección</label>
        <br />
        <input type="text" class="border border-black px-2 py-1 rounded w-full"/>
      </div>

      <!-- Correo Electrónico -->
      <div>
        <label>Correo Electrónico</label>
        <br />
        <input type="email" class="border border-black px-2 py-1 rounded w-full"/>
      </div>

      <!-- Teléfonos -->
      <div>
        <label>Teléfonos</label>
        <br />
        <input type="tel" class="border border-black px-2 py-1 rounded w-full"/>
      </div>
      <br>
      <!-- Botón de enviar -->
      <div class="flex justify-center border border-black px-2 py-1 rounded w-full" >
        <button type="submit" >ENVIAR</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Definimos la interfaz para las opciones de tipo de ID
interface TipoIDOpcion {
  label: string;
  value: string;
}

// Array con las opciones de tipo de identificación
const opcionesTipoID = ref<TipoIDOpcion[]>([
  { label: 'Cédula', value: 'cedula' },
  { label: 'Consumidor Final', value: 'cf' },
  { label: 'Pasaporte/Identificación tributaria del exterior', value: 'pasaporte' },
  { label: 'Placa o RAMV/CPM', value: 'placa' },
  { label: 'RUC', value: 'ruc' }
]);

// Variable para almacenar el tipo de ID seleccionado
const tipoIDSeleccionado = ref('');

// El resto del formulario sigue siendo simple sin validaciones ni estilos adicionales
</script>

