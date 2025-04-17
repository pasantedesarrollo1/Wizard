import { ref, onMounted, watch } from 'vue'
import { useWizardStore } from "@/stores/wizardStore"

/**
 * Composable para manejar la carga y sincronización de datos iniciales desde el store
 * 
 * @param sectionKey - Clave de la sección en el store (ej: "personalInfo", "salesData")
 * @param initialValues - Objeto con valores iniciales por defecto (opcional)
 * @param options - Opciones de configuración adicionales
 * @returns Objeto con valores reactivos, funciones de actualización y estado de carga
 */
export function useInitialData<T extends Record<string, any>>(
  sectionKey: string,
  initialValues: T = {} as T,
  options: {
    autoSave?: boolean;
    debug?: boolean;
    nestedFields?: Record<string, string[]>;
  } = {}
) {
  // Opciones por defecto
  const { 
    autoSave = true, 
    debug = false,
    nestedFields = {}
  } = options;

  // Obtener la instancia del store
  const wizardStore = useWizardStore();
  
  // Estado reactivo para los datos
  const data = ref<T>({ ...initialValues });
  
  // Estado de carga
  const isLoading = ref(true);
  const isLoaded = ref(false);
  
  // Función para cargar datos desde el store
  const loadFromStore = () => {
    try {
      isLoading.value = true;
      
      // Obtener datos del store para la sección especificada
      const storeData = wizardStore.getStepData(sectionKey);
      
      if (debug) {
        console.log(`[useInitialData] Cargando datos de ${sectionKey}:`, storeData);
      }
      
      // Si hay datos en el store, actualizar el estado local
      if (storeData) {
        // Fusionar con los valores iniciales para asegurar que todos los campos existan
        data.value = { 
          ...initialValues,
          ...storeData 
        };
      }
      
      isLoaded.value = true;
    } catch (error) {
      console.error(`[useInitialData] Error al cargar datos de ${sectionKey}:`, error);
    } finally {
      isLoading.value = false;
    }
  };
  
  // Función para actualizar un campo específico
  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    data.value[field] = value;
    
    if (autoSave) {
      saveToStore();
    }
  };
  
  // Función para actualizar múltiples campos a la vez
  const updateFields = (fields: Partial<T>) => {
    data.value = { 
      ...data.value, 
      ...fields 
    };
    
    if (autoSave) {
      saveToStore();
    }
  };
  
  // Función para actualizar un campo anidado
  const updateNestedField = (parentField: string, childField: string, value: any) => {
    if (!data.value[parentField]) {
      data.value[parentField] = {} as any;
    }
    
    (data.value[parentField] as any)[childField] = value;
    
    if (autoSave) {
      saveToStore();
    }
  };
  
  // Función para guardar los datos en el store
  const saveToStore = () => {
    try {
      wizardStore.updateFormSection(sectionKey, data.value);
      
      if (debug) {
        console.log(`[useInitialData] Guardando datos en ${sectionKey}:`, data.value);
      }
    } catch (error) {
      console.error(`[useInitialData] Error al guardar datos en ${sectionKey}:`, error);
    }
  };
  
  // Función para resetear los datos a los valores iniciales
  const resetData = () => {
    data.value = { ...initialValues };
    
    if (autoSave) {
      saveToStore();
    }
  };
  
  // Cargar datos al montar el componente
  onMounted(() => {
    loadFromStore();
  });
  
  // Configurar watchers para campos anidados si se especifican
  if (Object.keys(nestedFields).length > 0) {
    // Esperar a que los datos se carguen antes de configurar los watchers
    watch(isLoaded, (loaded) => {
      if (loaded) {
        // Para cada campo padre
        Object.entries(nestedFields).forEach(([parentField, childFields]) => {
          // Crear un watcher para cada campo hijo
          childFields.forEach(childField => {
            watch(
              () => data.value[parentField] && (data.value[parentField] as any)[childField],
              (newValue) => {
                if (autoSave) {
                  saveToStore();
                }
                
                if (debug) {
                  console.log(`[useInitialData] Campo anidado actualizado: ${parentField}.${childField} =`, newValue);
                }
              },
              { deep: true }
            );
          });
        });
      }
    });
  } else {
    // Si no hay campos anidados específicos, observar todo el objeto de datos
    watch(
      data,
      () => {
        if (isLoaded.value && autoSave) {
          saveToStore();
        }
      },
      { deep: true }
    );
  }
  
  return {
    // Estado
    data,
    isLoading,
    isLoaded,
    
    // Funciones de actualización
    updateField,
    updateFields,
    updateNestedField,
    saveToStore,
    resetData,
    loadFromStore
  };
}