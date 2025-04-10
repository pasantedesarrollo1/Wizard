<template>
  <ion-card>
    <ion-card-content>
      <!-- lista de empleados que realizan la venta -->
      <salesListe />
      
      <ion-item-divider></ion-item-divider>
      
      <!-- comporbante de pago -->
      <proofPayment />
      
      <ion-item-divider></ion-item-divider>
      
      <!-- tipos de metodo de pago  -->
      <typePayments />
    </ion-card-content>
  </ion-card>
</template>
  
<script setup lang="ts">
import { IonCard, IonCardContent, IonItemDivider } from '@ionic/vue'
import typePayments from "@/components/common/steps/dataSales/sub-step2/components/typePayments.vue"
import proofPayment from "@/components/common/steps/dataSales/sub-step2/components/proofPayment.vue"
import salesListe from "@/components/common/steps/dataSales/sub-step2/components/salesList.vue"
</script>