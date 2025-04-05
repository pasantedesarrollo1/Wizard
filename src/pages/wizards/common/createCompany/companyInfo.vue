<template>
    <div>
      <form>
  
        <!-- Nombre empresa -->
        <div>
          <label>Nombre de tu Empresa</label>
          <br />
          <input type="text" class="border border-black px-2 py-1 rounded w-full" placeholder="Nombre de tu empresa"/>
        </div>
        <!-- RUC -->
                <div>
          <label>RUC</label>
          <br />
          <input type="text" class="border border-black px-2 py-1 rounded w-full"/>
        </div>

        <!-- Tipo de empresa-->
        <div>
          <label>Tipo Compania</label>
          <br />
          <select v-model="TipoCompnaySeleccionado" class="border border-black px-2 py-1 rounded w-full">
            <option v-for="opcion in opcionesTipoCompnay" :key="opcion.value" :value="opcion.value" >
              {{ opcion.label }}
            </option>
          </select>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Definimos la interfaz para las opciones de tipo de ID
  interface TipoCompnayOpcion {
    label: string;
    value: string;
  }
  
  // Array con las opciones de tipo de identificación
  const opcionesTipoCompnay = ref<TipoCompnayOpcion[]>([
    { label: 'Comercios', value: 'comercios' },
    { label: 'Restaurante', value: 'restaurante' },
  ]);
  
  // Variable para almacenar el tipo de ID seleccionado
  const TipoCompnaySeleccionado = ref('');
  
  // El resto del formulario sigue siendo simple sin validaciones ni estilos adicionales
  </script>
  
  