<template>
    <div class="simple-question-container">
      <!-- Título principal -->
      <h2 class="section-title">Configuraciones sucursal</h2>
      
      <!-- Contenedor para los componentes importados -->
      <div class="components-container">
        <!-- Componente de configuración de recibos -->
        <div class="component-wrapper">
          <companyDespacho/>
        </div>

        <!-- Componente de configuración de tipo de documentos -->
        <div class="component-wrapper">
          <companyTuristico/>
        </div>

      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Importamos los componentes que queremos consumir
  import companyDespacho from "@/pages/wizards/common/sucursalPOS/companyDespacho.vue";
  import companyTuristico from "@/pages/wizards/common/sucursalPOS/companyTuristico.vue";

  </script>
  
  <style scoped>
  /* Contenedor principal */
  .simple-question-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  /* Título de la sección */
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #003cff;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  /* Contenedor para los componentes importados */
  .components-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  /* Wrapper para cada componente */
  .component-wrapper {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  /* Título de cada componente */
  .component-title {
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  /* Estilos responsivos */
  @media (max-width: 768px) {
    .component-wrapper {
      padding: 1rem;
    }
    
    .section-title {
      font-size: 1.3rem;
    }
    
    .component-title {
      font-size: 1.1rem;
    }
  }
  </style>