<template>
  <div class="w-full h-screen flex">
    <!-- Columna 1 -->
    <div class="flex-1 border m-1 h-full">
      <createCompany />
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
import companyPOS from "@/components/common/steps/createCompany/sub-step1/components/createPOS.vue"
import companySucursal from "@/components/common/steps/createCompany/sub-step1/components/createSucursal.vue"
import createCompany from "@/components/common/steps/createCompany/sub-step1/components/createCompany.vue"


</script>
