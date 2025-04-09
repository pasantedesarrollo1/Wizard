<template>
  <div class="simple-question-container">
    <!-- Título principal -->
    <h2 class="section-title">Configuraciones Generales</h2>

    <!-- Contenedor para los componentes importados -->
    <div class="components-container">
      <!-- Régimen (RIMPE/general)-->
      <div style="display: flex; align-items: center; gap: 8px">
        <label for="regimen">Régimen</label>
        <input
          id="categoria"
          type="text"
          class="border border-black px-2 py-1 rounded"
        />
      </div>

      <!-- Categoaria: Negocio Popular/Emprendimeinto-->
      <div style="display: flex; align-items: center; gap: 8px">
        <label for="categoria">Categoría</label>
        <input
          id="categoria"
          type="text"
          class="border border-black px-2 py-1 rounded"
        />
      </div>

      <!-- Agente de retencion-->
      <div>
        <input type="checkbox" /> <label>Agente de retencion</label> <br />
        <input type="checkbox" /> <label>Obligado a llevar contabiliad</label>
      </div>

      <!-- Artesano-->
      <div>
        <input type="checkbox" /> <label>Artesano</label> <br>
        <label for="artisan-code"># </label>
          <input
            id="artisan-code"
            type="text"
            class="border border-black px-2 py-1 rounded"
            placeholder="ingresa tu codigo de artesano"
          />
      </div>

      <!-- Documento por defecto-->
      <div>
        <div>
          <label>Documento por defecto</label>
          <br />
          <div style="display: flex; gap: 10px">
            <button style="border: 1px solid black; padding: 10px">
              <div>Facturas electrónicas</div>
            </button>
            <button style="border: 1px solid black; padding: 10px">
              <div>Recibos</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Parametro de busqueda-->
      <div>
        <div>
          <label>Parametro de busqueda</label>
          <br />
          <div style="display: flex; gap: 10px">
            <button style="border: 1px solid black; padding: 10px">
              <div>Codigo</div>
            </button>
            <button style="border: 1px solid black; padding: 10px">
              <div>Nombre</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Impuestos-->
      <div>
        <div>
          <label>Impuestos a manejar</label>
          <br />
          <div style="display: flex; gap: 10px">
            <button style="border: 1px solid black; padding: 10px">
              <div>15 %</div>
            </button>
            <button style="border: 1px solid black; padding: 10px">
              <div>5 %</div>
            </button>
            <button style="border: 1px solid black; padding: 10px">
              <div>0 %</div>
            </button>
          </div>
          <br>
          <label for="tax-code"># </label>
          <input
            id="tax-code"
            type="text"
            class="border border-black px-2 py-1 rounded"
            placeholder="ingresa tu codigo para 5%"
          />
        </div>
      </div>
      <!-- despacho posterior-->
      <div><input type="checkbox" /> <label>Despacho posterior</label></div>

      <!-- Establecimiento turisicto-->
      <div>
        <input type="checkbox" /> <label>Establecimiento Turistico</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
