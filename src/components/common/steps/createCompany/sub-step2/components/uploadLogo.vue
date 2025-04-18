<template>
  <div class="upload-logo-container">
    <h3 class="section-title">Carga el logo de tu empresa</h3>
    <p class="section-description">
      Este logo aparecerá en tus documentos y en tu portal web
    </p>

    <!-- Modo de edición -->
    <div v-if="isEditing" class="editor-mode">
      <!-- Barra de herramientas -->
      <div class="editor-toolbar">
        <button class="toolbar-btn close-btn" @click="cancelEditing">
          <ion-icon :icon="closeOutline"></ion-icon>
        </button>
        <span class="toolbar-title">Seleccionar Imagen</span>
        <button class="toolbar-btn save-btn" @click="saveChanges">
          <ion-icon :icon="saveOutline"></ion-icon>
          Guardar
        </button>
      </div>

      <!-- Alerta de error -->
      <div v-if="showErrorMessage" class="error-alert">
        <ion-icon :icon="alertCircleOutline"></ion-icon>
        <span
          >La imagen seleccionada supera el tamaño máximo permitido de
          5MB.</span
        >
      </div>

      <!-- Área de selección de archivo -->
      <div
        v-if="!tempImage"
        class="dropzone-editor"
        :class="{ 'drag-active': isDragging }"
        @click="triggerFileInput"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <ion-icon :icon="cloudUploadOutline" class="upload-icon"></ion-icon>
        <p class="dropzone-text">
          Arrastra y suelta tu imagen aquí o haz clic para seleccionar
        </p>

        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          class="hidden-input"
          @change="handleFileInputChange"
        />

        <button class="select-file-btn" @click.stop="triggerFileInput">
          Seleccionar archivo
        </button>
      </div>

      <!-- Área de edición de imagen -->
      <div v-if="tempImage" class="cropper-wrapper">
        <!-- Información del archivo -->
        <div class="file-info-bar">
          <div class="file-details">
            <ion-icon :icon="imageOutline" class="file-icon"></ion-icon>
            <div class="file-text">
              <div class="file-name">{{ tempFile?.name || "Imagen" }}</div>
              <div class="file-size">{{ formatFileSize(tempFile?.size) }}</div>
            </div>
          </div>
          <button class="remove-file-btn" @click="removeTempImage">
            <ion-icon :icon="closeCircle"></ion-icon>
          </button>
        </div>

        <!-- Contenedor principal del editor -->
        <!-- Contenedor principal del editor -->
        <div class="editor-layout">
          <!-- Barra lateral de herramientas - ajustada -->
          <div class="sidebar-tools">
            <button class="sidebar-tool" @click="rotate(-90)">
              <ion-icon :icon="refreshOutline"></ion-icon>
              <span>Rotar<br />Izquierda</span>
            </button>
            <button class="sidebar-tool" @click="rotate(90)">
              <ion-icon
                :icon="refreshOutline"
                style="transform: scaleX(-1)"
              ></ion-icon>
              <span>Rotar<br />Derecha</span>
            </button>
            <button class="sidebar-tool" @click="flip(true, false)">
              <ion-icon :icon="swapHorizontalOutline"></ion-icon>
              <span>Voltear<br />Horizontal</span>
            </button>
            <button class="sidebar-tool" @click="flip(false, true)">
              <ion-icon :icon="swapVerticalOutline"></ion-icon>
              <span>Voltear<br />Vertical</span>
            </button>
            <button class="sidebar-tool" @click="saveCropped">
              <ion-icon :icon="cropOutline"></ion-icon>
              <span>Recortar</span>
            </button>
          </div>

          <!-- Área del cropper -->
          <div class="cropper-container">
            <Cropper
              ref="cropper"
              class="cropper"
              :src="tempImage"
              :stencil-props="{
                aspectRatio: null, // Eliminamos la relación de aspecto fija
                handlers: {
                  eastNorth: true,
                  north: true,
                  westNorth: true,
                  west: true,
                  westSouth: true,
                  south: true,
                  eastSouth: true,
                  east: true,
                },
                movable: true,
                resizable: true,
                handlersInteractions: {
                  // Configuración para mantener relación de aspecto solo en las esquinas
                  north: { aspectRatio: false },
                  south: { aspectRatio: false },
                  east: { aspectRatio: false },
                  west: { aspectRatio: false },
                  // Las esquinas mantienen la relación de aspecto
                  eastNorth: { aspectRatio: true },
                  westNorth: { aspectRatio: true },
                  westSouth: { aspectRatio: true },
                  eastSouth: { aspectRatio: true }
                }
              }"
              :resize-image="{
                touch: true,
                wheel: {
                  ratio: 5
                }
              }"
              :canvas="{ width: 600, height: 400 }"
              image-restriction="stencil"
              background-color="#000000"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modo normal (no editando) -->
    <div v-else class="upload-area" :class="{ 'has-file': selectedFile }">
      <!-- Área de previsualización -->
      <div class="preview-container" v-if="selectedFile">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="Vista previa del logo"
          class="logo-preview"
        />
        <div class="file-info">
          <span class="file-name">{{ selectedFile.name }}</span>
          <span class="file-size">{{ formatFileSize(selectedFile.size) }}</span>
        </div>
        <button @click="removeFile" class="remove-button">
          <ion-icon :icon="closeCircle" class="remove-icon"></ion-icon>
        </button>
        <button @click="startEditing" class="edit-button">
          <ion-icon :icon="createOutline" class="edit-icon"></ion-icon>
        </button>
      </div>

      <!-- Área de arrastrar y soltar / selección de archivo -->
      <div
        v-else
        class="dropzone"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="{ 'drag-over': isDragging }"
      >
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
        <p class="file-requirements">
          Formatos aceptados: PNG, JPG, SVG (máx. 5MB)
        </p>
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
    <div v-if="errorMessage && !isEditing" class="error-message">
      <ion-icon :icon="alertCircleOutline" class="error-icon"></ion-icon>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css"; // Importación correcta de estilos
import {
  cloudUploadOutline,
  closeCircle,
  alertCircleOutline,
  createOutline,
  closeOutline,
  saveOutline,
  imageOutline,
  refreshOutline,
  swapHorizontalOutline,
  swapVerticalOutline,
  cropOutline,
} from "ionicons/icons";
import { useWizardStore } from "@/stores/wizardStore";

// Obtener la instancia del store
const wizardStore = useWizardStore();

// Estados reactivos para uploadLogo
const selectedFile = ref(null);
const previewUrl = ref(null);
const isDragging = ref(false);
const errorMessage = ref("");

// Estados reactivos para imageSelector
const isEditing = ref(false);
const tempFile = ref(null);
const tempImage = ref(undefined);
const cropper = ref(null);
const croppedImage = ref("");
const showErrorMessage = ref(false);
const fileInput = ref(null);

// Función para iniciar el modo de edición
const startEditing = () => {
  isEditing.value = true;
  if (previewUrl.value) {
    tempImage.value = previewUrl.value;
  }
};

// Función para cancelar la edición
const cancelEditing = () => {
  isEditing.value = false;
  tempFile.value = null;
  tempImage.value = undefined;
};

// Función para manejar la selección de archivos (uploadLogo)
const handleFileChange = (event) => {
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // Validar el tipo y tamaño del archivo
    if (validateFile(file)) {
      selectedFile.value = file;
      createPreview(file);
      updateStore(file);
      errorMessage.value = "";
    }

    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    input.value = "";
  }
};

// Función para validar el archivo
const validateFile = (file) => {
  // Validar tipo de archivo
  const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  if (!validTypes.includes(file.type)) {
    errorMessage.value =
      "Formato de archivo no válido. Por favor, usa PNG, JPG o SVG.";
    return false;
  }

  // Validar tamaño (5MB máximo)
  const maxSize = 5 * 1024 * 1024; // 5MB en bytes
  if (file.size > maxSize) {
    errorMessage.value =
      "El archivo es demasiado grande. El tamaño máximo es 5MB.";
    return false;
  }

  return true;
};

// Función para crear la vista previa
const createPreview = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result;
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
      fileName: "",
    },
  });
};

// Función para formatear el tamaño del archivo
const formatFileSize = (bytes) => {
  if (bytes === undefined) return "Tamaño desconocido";

  if (bytes < 1024) return bytes + " bytes";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

// Funciones para manejar el arrastrar y soltar
const onDragOver = () => {
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = (event) => {
  isDragging.value = false;

  if (event.dataTransfer?.files.length) {
    const file = event.dataTransfer.files[0];
    if (validateFile(file)) {
      selectedFile.value = file;
      createPreview(file);
      updateStore(file);
      errorMessage.value = "";
    }
  }
};

// Función para actualizar el store con el archivo seleccionado
const updateStore = (file) => {
  // En un entorno real, aquí se subiría el archivo a un servidor
  // y se obtendría la URL. Para este ejemplo, usamos la URL de vista previa
  wizardStore.updateFormSection("companyConfig", {
    logo: {
      url: previewUrl.value || "",
      fileName: file.name,
    },
  });
};

// Verificar tamaño de archivo
watch(tempFile, (file) => {
  if (file && file.size > 5 * 1024 * 1024) {
    tempImage.value = undefined;
    tempFile.value = null;
    showErrorMessage.value = true;
  } else if (file && file.size <= 5 * 1024 * 1024) {
    showErrorMessage.value = false;
  }
});

// Convertir archivo a base64
watch(tempFile, (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        tempImage.value = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
});

// Eliminar la imagen temporal
function removeTempImage() {
  tempImage.value = undefined;
  tempFile.value = null;
}

// Función para rotar la imagen
function rotate(angle) {
  if (cropper.value) {
    cropper.value.rotate(angle);
  }
}

// Función para voltear la imagen
function flip(horizontal, vertical) {
  if (cropper.value) {
    cropper.value.flip(horizontal, vertical);
  }
}

// Función para recortar la imagen
async function saveCropped() {
  if (!cropper.value) return;

  const { canvas } = cropper.value.getResult();

  if (!canvas) {
    console.error("Canvas is undefined.");
    return;
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            croppedImage.value = e.target.result;
            tempImage.value = croppedImage.value;
            resolve();
          }
        };
        reader.readAsDataURL(blob);
      } else {
        resolve();
      }
    });
  });
}

// Función para guardar los cambios
async function saveChanges() {
  await saveCropped();

  if (tempImage.value) {
    try {
      const fetchResponse = await fetch(tempImage.value);
      const blob = await fetchResponse.blob();

      const fileName = tempFile.value?.name || "logo.png";
      const newFile = new File([blob], fileName, { type: blob.type });

      selectedFile.value = newFile;
      previewUrl.value = tempImage.value;

      updateStore(newFile);
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    }
  }

  isEditing.value = false;
  tempFile.value = null;
  tempImage.value = undefined;
}

// Métodos para manejo del input en modo edición
function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleDragOver() {
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}

function handleDrop(event) {
  const files = event.dataTransfer?.files;
  if (files?.length) {
    const file = files[0];
    if (file.size <= 5 * 1024 * 1024) {
      tempFile.value = file;
      showErrorMessage.value = false;
    } else {
      showErrorMessage.value = true;
    }
  }
  isDragging.value = false;
}

function handleFileInputChange(event) {
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      tempFile.value = file;
      showErrorMessage.value = false;
    } else {
      showErrorMessage.value = true;
    }
    input.value = ""; // Limpiar input
  }
}

// Cargar datos del store si existen
onMounted(() => {
  const companyConfig = wizardStore.getStepData("companyConfig");
  if (companyConfig?.logo?.url) {
    previewUrl.value = companyConfig.logo.url;
    if (companyConfig.logo.fileName) {
      selectedFile.value = new File(
        [],
        companyConfig.logo.fileName || "logo.png"
      );
    }
  }
});
</script>

<style>
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

/* Estilos para el modo de edición */
.editor-mode {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.toolbar-title {
  font-weight: 600;
  color: #333;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.toolbar-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.close-btn {
  color: #666;
}

.save-btn {
  color: white;
  font-weight: 600;
  background-color: #003cff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.save-btn:hover {
  background-color: #0035e0;
}

.error-alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #fee2e2;
  color: #ef4444;
  margin: 0.5rem;
  border-radius: 4px;
}

/* Estilos para el área de arrastrar y soltar en modo edición */
.dropzone-editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  margin: 1rem;
  background-color: #f9fafb;
  cursor: pointer;
  transition: all 0.2s;
}

.dropzone-editor:hover,
.dropzone-editor.drag-active {
  border-color: #003cff;
  background-color: rgba(0, 60, 255, 0.05);
}

.dropzone-editor .upload-icon {
  font-size: 3rem;
  color: #003cff;
  margin-bottom: 1rem;
}

.dropzone-text {
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
}

.select-file-btn {
  background-color: #003cff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.select-file-btn:hover {
  background-color: #0035e0;
}

.hidden-input {
  display: none;
}

/* Estilos para el área de edición de imagen */
.cropper-wrapper {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.file-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.file-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.file-icon {
  font-size: 1.5rem;
  color: #003cff;
}

.file-text {
  display: flex;
  flex-direction: column;
}

.file-name {
  font-weight: 500;
  font-size: 0.9rem;
}

.file-size {
  font-size: 0.8rem;
  color: #666;
}

.remove-file-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffeeee;
}

.remove-file-btn:hover {
  background-color: #ffd5d5;
}

.remove-file-btn ion-icon {
  font-size: 24px;
}

/* Nuevo layout con barra lateral */
.editor-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Modificación de los estilos de la barra lateral */
.sidebar-tools {
  display: flex;
  flex-direction: column;
  width: 80px;
  background-color: #000;
  padding: 0.5rem 0;
  gap: 0.25rem; /* Reducido el espacio entre botones */
  height: 100%; /* Asegurar que ocupe toda la altura */
  justify-content: space-evenly; /* Distribuir el espacio uniformemente */
}

.sidebar-tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem; /* Reducido el espacio entre icono y texto */
  padding: 0.25rem 0; /* Reducido el padding vertical */
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.65rem; /* Reducido el tamaño de fuente */
  text-align: center;
  height: 60px; /* Altura fija para cada botón */
}

.sidebar-tool:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-tool ion-icon {
  font-size: 1.25rem; /* Reducido el tamaño del icono */
  color: white;
}

.cropper-container {
  flex: 1;
  position: relative;
  background-color: #000;
  overflow: hidden;
}

.cropper {
  height: 100%;
  width: 100%;
}

/* Estilos para el stencil (marco de recorte) */
:deep(.vue-advanced-cropper__stencil) {
  border: 2px solid white;
}

:deep(.vue-advanced-cropper__stencil-handler) {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
}

/* Estilos para el modo normal (no editando) */
.upload-area {
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  background-color: #f9fafb;
  transition: all 0.2s;
}

.upload-area.has-file {
  border-style: solid;
  border-color: #e5e7eb;
  background-color: white;
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.2s;
}

.dropzone.drag-over {
  border-color: #003cff;
  background-color: rgba(0, 60, 255, 0.05);
}

.upload-icon-container {
  margin-bottom: 1rem;
}

.upload-icon {
  font-size: 3rem;
  color: #003cff;
}

.upload-text {
  margin-bottom: 1.5rem;
}

.primary-text {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.secondary-text {
  color: #666;
  margin-bottom: 0.5rem;
}

.upload-button {
  display: inline-block;
  background-color: #003cff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-button:hover {
  background-color: #0035e0;
}

.file-requirements {
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
}

.file-input {
  display: none;
}

/* Estilos para la previsualización */
.preview-container {
  display: flex;
  align-items: center;
  position: relative;
}

.logo-preview {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  margin-right: 1rem;
  border: 1px solid #e5e7eb;
  background-color: white;
}

.file-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.file-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.file-size {
  font-size: 0.8rem;
  color: #666;
}

.remove-button,
.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: background-color 0.2s;
}

.remove-button {
  background-color: #ffeeee;
  color: #ef4444;
}

.remove-button:hover {
  background-color: #ffd5d5;
}

.edit-button {
  background-color: #e5e7eb;
  color: #333;
}

.edit-button:hover {
  background-color: #d1d5db;
}

.remove-icon,
.edit-icon {
  font-size: 1.25rem;
}

/* Estilos para mensajes de error */
.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #fee2e2;
  color: #ef4444;
  margin-top: 1rem;
  border-radius: 4px;
}

.error-icon {
  font-size: 1.25rem;
}

/* Estilos responsivos */
@media (max-width: 640px) {
  .sidebar-tools {
    width: 60px;
  }

  .sidebar-tool {
    font-size: 0.55rem;
    padding: 0.2rem 0;
    height: 50px; /* Altura reducida para móviles */
  }

  .sidebar-tool ion-icon {
    font-size: 1.2rem;
  }

  .cropper-wrapper {
    height: 400px;
  }

  .logo-preview {
    width: 80px;
    height: 80px;
  }
}
</style>
