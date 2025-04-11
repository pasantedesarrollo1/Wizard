<template>
  <ion-card>
    <ion-card-content>
      <searchRUC @ruc-searched="handleRucSearched" />
    </ion-card-content>
  </ion-card>
  <ion-card v-if="showRucInfo">
    <ion-card-content>
      <informationRUC :ruc-data="rucData" />
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonCard, IonCardContent } from '@ionic/vue'
import searchRUC from "@/components/common/steps/configurationCompany/sub-step1/components/searchRUC.vue";
import informationRUC from "@/components/common/steps/configurationCompany/sub-step1/components/informationRUC.vue";

// Estado para controlar la visibilidad del componente informationRUC
const showRucInfo = ref(false);

// Datos del RUC que se pasarán al componente informationRUC
const rucData = ref({
  ruc: '',
  razonSocial: '',
  estado: ''
});

// Función que se ejecuta cuando se busca un RUC
const handleRucSearched = (data: any) => {
  // Actualizar los datos del RUC
  rucData.value = data;
  // Mostrar el componente informationRUC
  showRucInfo.value = true;
};
</script>