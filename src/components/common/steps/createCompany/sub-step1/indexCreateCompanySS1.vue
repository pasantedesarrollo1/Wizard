<template>
  <div class="w-full h-screen flex">
    <!-- Columna 1 -->
    <div class="flex-1 border m-1 h-full">
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
          <!-- Dirección de la Empresa -->
          <div>
    <label>Dirección de tu Empresa</label>
    <br />
    <input type="text" class="border border-black px-2 py-1 rounded w-full" placeholder="Dirección de tu empresa"/>
  </div>

  <!-- Teléfonos -->
  <div>
    <label>Teléfonos de tu empresa</label>
    <br />
    <input type="tel" class="border border-black px-2 py-1 rounded w-full"/>
  </div>
        <!-- Correo Electrónico -->
<div>
  <label>Correo Electrónico Empresarial</label>
  <br />
  <input type="email" class="border border-black px-2 py-1 rounded w-full"/>
</div>
</form>
    </div>

    <!-- Columna 2 -->
    <div class="flex-1 flex flex-col m-1">
      <!-- Fila 1 -->
      <div class="flex-1 border mb-1">
        <companyPOS />
      </div>
      <!-- Fila 2 -->
      <div class="flex-1 border mt-1">
        <companySucursal />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import companyPOS from "@/components/common/steps/createCompany/sub-step1/components/companyPOS.vue"
import companySucursal from "@/components/common/steps/createCompany/sub-step1/components/companySucursal.vue"

</script>
