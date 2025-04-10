<template>
    <div>
      <!-- lista de empleados que realizan la venta -->
      <salesListe />
      <br>

      <!-- comporbante de pago -->
      <proofPayment />
      <br>

      <!-- tipos de metodo de pago  -->
       <typePayments />
    </div>
  </template>
  
  <script setup lang="ts">
  import typePayments from "@/components/common/steps/dataSales/sub-step2/components/typePayments.vue"
  import proofPayment from "@/components/common/steps/dataSales/sub-step2/components/proofPayment.vue"
  import salesListe from "@/components/common/steps/dataSales/sub-step2/components/salesList.vue"

  </script>
  
  