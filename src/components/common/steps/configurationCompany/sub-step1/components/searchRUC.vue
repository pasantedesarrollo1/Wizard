<template>
  <ion-item lines="none" class="custom-item">
    <div class="search-container">
      <div class="input-container" :class="{ 'input-focused': isFocused }" @click="focusInput">
        <Icon icon="material-symbols:search" class="search-icon" />
        <input
          id="ruc"
          type="text"
          placeholder="Ingresa tu RUC"
          v-model="rucValue"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="native-input"
          ref="rucInput"
          required
        />
      </div>
      <ion-button size="default" @click="searchRuc" class="consultar-button">
        Consultar
      </ion-button>
    </div>
  </ion-item>
</template>

<script setup lang="ts">
import { ref, defineEmits} from "vue"
import { IonItem, IonButton } from "@ionic/vue"
import { Icon } from "@iconify/vue"
import { useInitialData } from "@/composables/useInitialData"

// Datos simulados del SRI que se utilizarán para la consulta
const dataSRI = {
  ruc: "1792780241001",
  legalName: "TODONEG S.A.",
  status: "ACTIVO",
  regimeRUC: "General",
  isAgent: true,
  accountingRequired: true,
  categoryRUC: "Negocio Popular",
  idBranch: "001",
  commercialName: "Wanqara",
  address: "PICHINCHA / QUITO / IÑAQUITO / 10 DE AGOSTO N33-62 Y N33 GUAYANAS",
}

// Valores iniciales para los datos de la compañía
const companyCreationInitial = {
  ruc: "",
  legalName: "",
  domain: ""
}

// Inicializar los datos para branchAndPOS
const branchAndPOSInitial = {
  branch: {
    idBranch: "",
    commercialName: "",
    address: ""
  }
}

// Inicializar los datos para companyConfig
const companyConfigInitial = {
  regimeRUC: "",
  categoryRUC: "",
  taxAgent: {
    isAgent: false,
    accountingRequired: false
  }
}

// Usar el composable useInitialData para cada sección
const { data: companyCreationData, updateFields: updateCompanyCreation } = useInitialData(
  "companyCreation",
  companyCreationInitial,
  { autoSave: true }
)

const { data: branchAndPOSData, updateFields: updateBranchAndPOS } = useInitialData(
  "branchAndPOS",
  branchAndPOSInitial,
  { 
    autoSave: true,
    nestedFields: {
      branch: ["idBranch", "commercialName", "address"]
    }
  }
)

const { data: companyConfigData, updateFields: updateCompanyConfig } = useInitialData(
  "companyConfig",
  companyConfigInitial,
  { 
    autoSave: true,
    nestedFields: {
      taxAgent: ["isAgent", "accountingRequired"]
    }
  }
)

// Usar el valor del RUC desde el store o un valor vacío
const rucValue = ref(companyCreationData.value.ruc || "")
const isFocused = ref(false)
const rucInput = ref<HTMLInputElement | null>(null)

// Definir los eventos que este componente puede emitir
const emit = defineEmits(["ruc-searched"])

const focusInput = () => {
  if (rucInput.value) {
    rucInput.value.focus()
  }
}

// Actualizar el store con los datos del SRI
const updateStoreWithSRIData = () => {
  // Actualizar los datos de companyCreation
  updateCompanyCreation({
    ruc: dataSRI.ruc,
    legalName: dataSRI.legalName,
    domain: dataSRI.ruc
  })

  // Actualizar los datos de branchAndPOS
  updateBranchAndPOS({
    branch: {
      ...branchAndPOSData.value.branch,
      idBranch: dataSRI.idBranch,
      commercialName: dataSRI.commercialName,
      address: dataSRI.address
    }
  })

  // Actualizar los datos de companyConfig
  updateCompanyConfig({
    regimeRUC: dataSRI.regimeRUC,
    categoryRUC: dataSRI.categoryRUC,
    taxAgent: {
      ...companyConfigData.value.taxAgent,
      isAgent: dataSRI.isAgent,
      accountingRequired: dataSRI.accountingRequired
    }
  })

  // Mostrar en consola para debug
  console.log("Datos actualizados en el store desde searchRUC:", {
    companyCreation: {
      ruc: dataSRI.ruc,
      legalName: dataSRI.legalName,
    },
    branchAndPOS: {
      branch: {
        idBranch: dataSRI.idBranch,
        commercialName: dataSRI.commercialName,
        address: dataSRI.address,
      },
    },
    companyConfig: {
      regimeRUC: dataSRI.regimeRUC,
      categoryRUC: dataSRI.categoryRUC,
      taxAgent: {
        isAgent: dataSRI.isAgent,
        accountingRequired: dataSRI.accountingRequired,
      },
    }
  })
}

const searchRuc = () => {
  console.log("Buscando RUC:", rucValue.value)

  // Usar el RUC ingresado o por defecto usar el valor del dataSRI
  const rucToSearch = rucValue.value || dataSRI.ruc

  // Preparamos los datos que necesita el componente informationRUC
  const rucData = {
    ruc: rucToSearch,
    razonSocial: dataSRI.legalName,
    estado: dataSRI.status,
  }

  // Actualizar el store con los datos del SRI
  updateStoreWithSRIData()

  // Emitir el evento con los datos del RUC
  emit("ruc-searched", rucData)
}
</script>

<style scoped>
.custom-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.input-container {
  display: flex;
  align-items: center;
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 12px;
  background-color: white;
  transition: all 0.2s ease;
  cursor: text;
  height: 40px;
}

.input-focused {
  border-color: #0054e9;
  box-shadow: 0 0 0 1px rgba(0, 84, 233, 0.2);
}

.search-icon {
  color: #757575;
  font-size: 18px;
  margin-right: 8px;
  width: 18px;
  height: 18px;
  pointer-events: none;
}

.native-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-family: inherit;
  color: #333;
  padding: 0;
  width: 100%;
  caret-color: #0054e9;
}

.native-input::placeholder {
  color: #757575;
  opacity: 1;
}

.consultar-button {
  --background: #0054e9;
  --color: white;
  --border-radius: 6px;
  --padding-start: 16px;
  --padding-end: 16px;
  height: 40px;
  margin: 0;
  text-transform: none;
  font-weight: 500;
}
</style>