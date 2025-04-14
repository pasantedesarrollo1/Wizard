<template>
  <div class="upload-logo-container">
    <h3 class="section-title">Carga el logo de tu empresa</h3>
    <p class="section-description">Este logo aparecerá en tus documentos y en tu portal web</p>
    
    <div class="upload-area" :class="{ 'has-file': selectedFile }">
      <!-- Área de previsualización -->
      <div class="preview-container" v-if="selectedFile">
        <img v-if="previewUrl" :src="previewUrl" alt="Vista previa del logo" class="logo-preview" />
        <div class="file-info">
          <span class="file-name">{{ selectedFile.name }}</span>
          <span class="file-size">{{ formatFileSize(selectedFile.size) }}</span>
        </div>
        <button @click="removeFile" class="remove-button">
          <ion-icon :icon="closeCircle" class="remove-icon"></ion-icon>
        </button>
      </div>
      
      <!-- Área de arrastrar y soltar / selección de archivo -->
      <div v-else class="dropzone" 
           @dragover.prevent="onDragOver" 
           @dragleave.prevent="onDragLeave" 
           @drop.prevent="onDrop"
           :class="{ 'drag-over': isDragging }">
        <div class="upload-icon-container">
          <ion-icon :icon="cloudUploadOutline" class="upload-icon"></ion-icon>
        </div>
        <div class="upload-text">
          <p class="primary-text">Arrastra y suelta tu logo aquí</p>
          <p class="secondary-text">o</p>
          <label for="logo-upload" class="upload-button">
            Seleccionar archivo
          </label>
        </div>
        <p class="file-requirements">Formatos aceptados: PNG, JPG, SVG (máx. 5MB)</p>
      </div>
      
      <!-- Input oculto para selección de archivo -->
      <input 
        id="logo-upload" 
        type="file" 
        class="file-input"
        accept="image/png, image/jpeg, image/jpg, image/svg+xml"
        @change="handleFileChange"
      />
    </div>
    
    <!-- Mensajes de error -->
    <div v-if="errorMessage" class="error-message">
      <ion-icon :icon="alertCircleOutline" class="error-icon"></ion-icon>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonIcon } from '@ionic/vue';
import { cloudUploadOutline, closeCircle, alertCircleOutline } from 'ionicons/icons';
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Estados reactivos
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const isDragging = ref(false);
const errorMessage = ref('');

// Función para manejar la selección de archivos
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    
    // Validar el tipo y tamaño del archivo
    if (validateFile(file)) {
      selectedFile.value = file;
      createPreview(file);
      updateStore(file);
      errorMessage.value = '';
    }
    
    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    input.value = '';
  }
};

// Función para validar el archivo
const validateFile = (file: File): boolean => {
  // Validar tipo de archivo
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = 'Formato de archivo no válido. Por favor, usa PNG, JPG o SVG.';
    return false;
  }
  
  // Validar tamaño (5MB máximo)
  const maxSize = 5 * 1024 * 1024; // 5MB en bytes
  if (file.size > maxSize) {
    errorMessage.value = 'El archivo es demasiado grande. El tamaño máximo es 5MB.';
    return false;
  }
  
  return true;
};

// Función para crear la vista previa
const createPreview = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

// Función para eliminar el archivo seleccionado
const removeFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  
  // Actualizar el store para eliminar el logo
  wizardStore.updateFormSection("companyConfig", {
    logo: {
      url: "",
      fileName: ""
    }
  });
};

// Función para formatear el tamaño del archivo
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' bytes';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

// Funciones para manejar el arrastrar y soltar
const onDragOver = () => {
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = (event: DragEvent) => {
  isDragging.value = false;
  
  if (event.dataTransfer?.files.length) {
    const file = event.dataTransfer.files[0];
    if (validateFile(file)) {
      selectedFile.value = file;
      createPreview(file);
      updateStore(file);
      errorMessage.value = '';
    }
  }
};

// Función para actualizar el store con el archivo seleccionado
const updateStore = (file: File) => {
  // En un entorno real, aquí se subiría el archivo a un servidor
  // y se obtendría la URL. Para este ejemplo, usamos la URL de vista previa
  wizardStore.updateFormSection("companyConfig", {
    logo: {
      url: previewUrl.value || "",
      fileName: file.name
    }
  });
};

// Cargar datos del store si existen
onMounted(() => {
  const companyConfig = wizardStore.getStepData("companyConfig");
  if (companyConfig?.logo?.url) {
    previewUrl.value = companyConfig.logo.url;
    // No podemos restaurar el objeto File real, pero podemos simular que hay uno seleccionado
    if(companyConfig.logo.fileName){
      selectedFile.value = new File([], companyConfig.logo.fileName || "logo.png");
    }
  }
});
</script>

<style scoped>
.upload-logo-container {
  width: 100%;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.section-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.upload-area {
  width: 100%;
  min-height: 200px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  background-color: #f9fafb;
}

.upload-area:hover {
  border-color: #003cff;
}

.upload-area.has-file {
  border-style: solid;
  border-color: #003cff;
  background-color: rgba(0, 60, 255, 0.03);
}

.dropzone {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dropzone.drag-over {
  background-color: rgba(0, 60, 255, 0.08);
  border-color: #003cff;
}

.upload-icon-container {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(0, 60, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.upload-icon {
  font-size: 32px;
  color: #003cff;
}

.upload-text {
  text-align: center;
  margin-bottom: 1rem;
}

.primary-text {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.secondary-text {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.upload-button {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #003cff;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-button:hover {
  background-color: #0035e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 60, 255, 0.2);
}

.file-requirements {
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
}

.file-input {
  display: none;
}

.preview-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
}

.logo-preview {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.file-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
}

.file-size {
  font-size: 0.8rem;
  color: #666;
}

.remove-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-icon {
  font-size: 24px;
  color: #ef4444;
}

.remove-button:hover .remove-icon {
  transform: scale(1.1);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  color: #ef4444;
  font-size: 0.9rem;
}

.error-icon {
  font-size: 20px;
}

/* Estilos responsivos */
@media (max-width: 640px) {
  .upload-area {
    min-height: 180px;
  }
  
  .dropzone, .preview-container {
    min-height: 180px;
    padding: 1rem;
  }
  
  .upload-icon-container {
    width: 48px;
    height: 48px;
  }
  
  .upload-icon {
    font-size: 24px;
  }
  
  .primary-text {
    font-size: 0.9rem;
  }
  
  .logo-preview {
    max-height: 120px;
  }
}
</style>