<template>
  <div class="w-full flex justify-center">
    <ion-card class="wizard-card main-container">
      <ion-card-content class="wizard-content">
        <div class="section-container">
          <h4 class="section-title">Datos Personales</h4>
          
          <div class="w-full">
            <form @submit.prevent class="form-container">
              <!-- Tipo de identificación -->
              <div class="form-row">
                <FormField
                  v-model="data.identification.type"
                  label="Tipo de Identificación"
                  icon="mdi:cards"
                  type="select"
                  required
                  @validation="(isValid) => handleValidation('identificationType', isValid)"
                >
                  <option value="" disabled selected>Seleccionar</option>
                  <option 
                    v-for="opcion in opcionesTipoID" 
                    :key="opcion.value" 
                    :value="opcion.value"
                  >
                    {{ opcion.label }}
                  </option>
                </FormField>
                
                <FormField
                  v-model="data.identification.number"
                  label="Número de Identificación"
                  icon="mdi:card-account-details-outline"
                  placeholder="Número de identificación"
                  required
                  :disabled="!data.identification.type"
                  @input="handleIdentificationNumberInput"
                  @validation="(isValid) => handleValidation('identificationNumber', isValid)"
                />
              </div>

              <!-- Nombres -->
              <FormField
                v-model="data.name.first"
                label="Nombres"
                icon="mdi:account"
                placeholder="Ingresa tus Nombres"
                required
                @input="handleNameInput"
                @validation="(isValid) => handleValidation('firstName', isValid)"
              />

              <!-- Apellidos -->
              <FormField
                v-model="data.name.last"
                label="Apellidos"
                icon="mdi:account-outline"
                placeholder="Ingresa tus Apellidos"
                required
                @input="handleLastInput"
                @validation="(isValid) => handleValidation('lastName', isValid)"
              />

              <!-- Correo Electrónico -->
              <FormField
                v-model="data.contact.email"
                label="Correo Electrónico"
                icon="mdi:email"
                placeholder="Email"
                required
                @input="handleEmailInput"
                @validation="(isValid) => handleValidation('email', isValid)"
                :validator="validateEmailInput"
                errorMessage="Por favor, ingrese un correo electrónico válido"
              />

              <!-- Teléfono celular/whatsapp -->
              <FormField
                v-model="data.contact.phone"
                label="Teléfono celular/whatsapp"
                icon="mdi:phone"
                placeholder="+593"
                required
                @input="handlePhoneInput"
                @validation="(isValid) => handleValidation('phone', isValid)"
              />
            </form>
          </div>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  IonCard,
  IonCardContent,
} from '@ionic/vue';
import FormField from "@/components/ui/FormField.vue";
import { useInitialData } from "@/composables/useInitialData";
import {
  allowOnlyLetters,
  validateEmailInRealTime,
  formatPhoneNumber,
  formatEcuadorianId
} from "@/utils/input-controls";

// Definimos la interfaz para las opciones de tipo de ID
interface TipoIDOpcion {
  label: string;
  value: string;
}

// Array con las opciones de tipo de identificación
const opcionesTipoID = ref<TipoIDOpcion[]>([
  { label: 'Cédula', value: 'cedula' },
  { label: 'RUC', value: 'ruc' }
]);

// Valores iniciales para el formulario
const initialValues = {
  identification: {
    type: '',
    number: ''
  },
  name: {
    first: '',
    last: ''
  },
  contact: {
    email: '',
    phone: ''
  }
};

// Usar el composable useInitialData para manejar los datos
const { data } = useInitialData(
  "personalInfo",
  initialValues,
  {
    autoSave: true,
    debug: false,
    nestedFields: {
      identification: ["type", "number"],
      name: ["first", "last"],
      contact: ["email", "phone"]
    }
  }
);

// Definir un tipo para las claves de validación
type ValidationKey = 'identificationType' | 'identificationNumber' | 'firstName' | 'lastName' | 'email' | 'phone';

// Estado para validación de campos con tipo explícito
const validationState = ref<Record<ValidationKey, boolean>>({
  identificationType: true,
  identificationNumber: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true
});

// Función para manejar eventos de validación con tipos correctos
const handleValidation = (field: ValidationKey, isValid: boolean) => {
  validationState.value[field] = isValid;
};

// Manejador de input para el número de identificación que aplica validación según el tipo seleccionado
const handleIdentificationNumberInput = (event: Event) => {
  // Aplicar diferentes validaciones según el tipo de identificación seleccionado
  if (data.value.identification.type === 'ruc') {
    // Si es RUC, usar formatEcuadorianId
    data.value.identification.number = formatEcuadorianId(event);
  } else if (data.value.identification.type === 'cedula') {
    // Si es Cédula, usar formatPhoneNumber
    data.value.identification.number = formatPhoneNumber(event);
  } else {
    // Si no hay tipo seleccionado o es otro tipo, permitir solo números
    const input = event.target as HTMLInputElement;
    data.value.identification.number = input.value.replace(/\D/g, '');
  }
};

// Manejadores de eventos para los inputs con validación
const handleNameInput = (event: Event) => {
  data.value.name.first = allowOnlyLetters(event);
};

const handleLastInput = (event: Event) => {
  data.value.name.last = allowOnlyLetters(event);
};

const handlePhoneInput = (event: Event) => {
  data.value.contact.phone = formatPhoneNumber(event);
};

const handleEmailInput = (event: Event) => {
  // Usar la función de validación en tiempo real
  const result = validateEmailInRealTime(event);
  data.value.contact.email = result.value;
  handleValidation('email', result.isValid);
};

// Función de validación para el email que devuelve un objeto con value e isValid
const validateEmailInput = (event: Event) => {
  return validateEmailInRealTime(event);
};

// Watch para limpiar el número de identificación si cambia el tipo
watch(() => data.value.identification.type, () => {
  // Limpiar el número de identificación cuando cambia el tipo
  data.value.identification.number = '';
});
</script>

<style scoped>
/* Configuración del ancho fijo para pantallas grandes */
.main-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (min-width: 768px) {
  .main-container {
    max-width: 768px;
  }
}

/* Estilos para la tarjeta principal */
.wizard-card {
  width: 100%;
  margin: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.wizard-content {
  padding: 10px;
}

/* Contenedor de sección con estilos comunes */
.section-container {
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Título de sección */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

/* Contenedor del formulario */
.form-container {
  width: 100%;
}

/* Fila de formulario para elementos en línea */
.form-row {
  display: flex;
  gap: 12px;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 16px;
  }
}

/* Estilos para el contenido */
.wizard-content {
  flex: 1;
  overflow-y: auto;
  height: 100%;
}
</style>