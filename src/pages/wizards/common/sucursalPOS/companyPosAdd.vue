<template>
    <div class="w-full">
      <div v-if="!mostrarOtroPOS" class="flex flex-col items-center">
        <h2 class="text-xl font-bold mb-4">Tu POS</h2>
        <form class="w-full max-w-md">
          <!-- Nombre Comercial-->
          <div class="mb-4">
            <label>Nombre del Punto de Venta</label>
            <br />
            <input
              type="text"
              class="border border-black px-2 py-1 rounded w-full"
              value="Tienda Central"
              readonly
            />
          </div>
  
          <!-- Codigo de la sucursal -->
          <div class="mb-4">
            <label>Codigo del Punto de Venta</label>
            <br />
            <input
              type="text"
              class="border border-black px-2 py-1 rounded w-full"
              value="001-A"
              readonly
            />
          </div>
        </form>
  
        <button
          class="mt-4 border border-black px-4 py-2 rounded"
          @click="mostrarOtroPOS = true"
        >
          Crear otro POS
        </button>
      </div>
  
      <div v-else class="flex flex-col md:flex-row gap-4">
        <!-- Tu POS -->
        <div class="w-full md:w-1/2">
          <h2 class="text-xl font-bold mb-4">Tu POS</h2>
          <form class="w-full">
            <div class="mb-4">
              <label>Nombre del Punto de Venta</label>
              <br />
              <input
                type="text"
                class="border border-black px-2 py-1 rounded w-full"
                value="Tienda Central"
                readonly
              />
            </div>
  
            <div class="mb-4">
              <label>Codigo del Punto de Venta</label>
              <br />
              <input
                type="text"
                class="border border-black px-2 py-1 rounded w-full"
                value="001-A"
                readonly
              />
            </div>
          </form>
        </div>
  
        <!-- POS Adicional -->
        <div class="w-full md:w-1/2">
          <h2 class="text-xl font-bold mb-4">POS Adicional</h2>
          <form class="w-full">
            <div class="mb-4">
              <label>Nombre del Punto de Venta</label>
              <br />
              <input
                type="text"
                class="border border-black px-2 py-1 rounded w-full"
                placeholder="Nombre del punto de venta"
              />
            </div>
  
            <div class="mb-4">
              <label>Codigo del Punto de Venta</label>
              <br />
              <input
                type="text"
                class="border border-black px-2 py-1 rounded w-full"
                placeholder="Código del punto de venta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const mostrarOtroPOS = ref(false)
  </script>
  