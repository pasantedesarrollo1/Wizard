<template>
  <ion-card class="w-full">
    <ion-card-content>
      <!-- lista de empleados que realizan la venta -->
      <ion-item-divider>  <salesListe /> </ion-item-divider>
      
      <!-- comporbante de pago -->
      
      <ion-item-divider><proofPayment /></ion-item-divider>
      
      <!-- tipos de metodo de pago  -->
      <ion-item-divider ><typePayments class="w-full"/></ion-item-divider>
      
    </ion-card-content>
  </ion-card>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent, IonItemDivider } from '@ionic/vue'
import typePayments from "@/components/common/steps/dataSales/sub-step2/components/typePayments.vue"
import proofPayment from "@/components/common/steps/dataSales/sub-step2/components/proofPayment.vue"
import salesListe from "@/components/common/steps/dataSales/sub-step2/components/salesList.vue"
</script>