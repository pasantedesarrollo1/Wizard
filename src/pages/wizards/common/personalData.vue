<template>
  <div>
    <form>
      <!-- Tipo de identificación (central.illarli)-->
      <div>
        <label>Tipo de identificación</label>
        <br />
        <select v-model="tipoIDSeleccionado" class="border border-black px-2 py-1 rounded w-full">
          <option v-for="opcion in opcionesTipoID" :key="opcion.value" :value="opcion.value" >
            {{ opcion.label }}
          </option>
        </select>
        <input type="text" class="border border-black px-2 py-1 rounded w-full" placeholder="ingresa tu identifiacion"/>
      </div>
      <!-- Nombre (sistema.illarli)-->
      <div>
        <label>Nombre</label>
        <br />
        <input type="text" class="border border-black px-2 py-1 rounded w-full" placeholder="ingresa tu nombre"/>
      </div>

      <!-- Apellido (sistema.illarli)-->
      <div>
        <label>Apellido</label>
        <br />
        <input type="text" class="border border-black px-2 py-1 rounded w-full" placeholder="ingresa tu apellido"/>
      </div>

      <!-- Correo Electrónico (sistema y central .illarli)-->
      <div>
        <label>Correo Electrónico</label>
        <br />
        <input type="email" class="border border-black px-2 py-1 rounded w-full"/>
      </div>

      <!-- Teléfonos -->
       <!-- Teléfono convencional (central.illarli)-->
      <div>
        <label>Teléfono convencional</label>
        <br />
        <input type="tel" class="border border-black px-2 py-1 rounded w-full"/>
      </div>
       <!-- whatsapp (sistema.illarli) -->
       <div>
        <label>whatsapp</label>
        <br />
        <input type="tel" class="border border-black px-2 py-1 rounded w-full"/>
      </div>

      <!-- Rol en la empresa (sistema.illarli)-->
      <div>
        <label>Selecciona tu rol en la empresa</label>
        <br />
        <select v-model="RolSeleccionado" class="border border-black px-2 py-1 rounded w-full">
          <option v-for="opcion in opcionesRol" :key="opcion.value" :value="opcion.value" >
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
interface TipoIDOpcion {
  label: string;
  value: string;
}
// Definimos la interfaz para las opciones de rol
interface RolOpcion {
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

const opcionesRol = ref<RolOpcion[]>([
  { label: 'Gerente', value: 'gerente' },
  { label: 'Contador', value: 'contador' },
  { label: 'Dueño', value: 'dueno' },
  { label: 'Encargado', value: 'encargado' },
]);
// Variable para almacenar el tipo de ID seleccionado
const tipoIDSeleccionado = ref('');
const RolSeleccionado = ref('');


// El resto del formulario sigue siendo simple sin validaciones ni estilos adicionales
</script>

