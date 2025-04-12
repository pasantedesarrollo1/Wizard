/**
 * Función para establecer una propiedad anidada en un objeto
 * @param obj Objeto en el que se establecerá la propiedad
 * @param path Ruta de la propiedad en formato de cadena separada por puntos
 * @param value Valor a establecer
 */
export const setNestedProperty = (obj: Record<string, any>, path: string, value: any): void => {
  const parts = path.split(".")

  const setRecursive = (currentObj: Record<string, any>, pathArray: string[], index: number, val: any): void => {
    // Si hemos llegado al final del camino, asignamos el valor
    if (index === pathArray.length - 1) {
      currentObj[pathArray[index]] = val
      return
    }

    // Si la propiedad no existe o no es un objeto, inicializamos como objeto vacío
    if (currentObj[pathArray[index]] === undefined || typeof currentObj[pathArray[index]] !== "object") {
      currentObj[pathArray[index]] = {}
    }

    // Continuamos navegando recursivamente
    setRecursive(currentObj[pathArray[index]], pathArray, index + 1, val)
  }

  // Iniciamos la recursión
  setRecursive(obj, parts, 0, value)
}

/**
 * Función para guardar el estado del wizard en localStorage
 * @param state Estado del wizard a guardar
 */
export const saveWizardState = (state: Record<string, any>): void => {
  try {
    localStorage.setItem("wizardData", JSON.stringify(state))
  } catch (error) {
    console.error("Error al guardar el estado del wizard:", error)
  }
}

/**
 * Función para cargar el estado del wizard desde localStorage
 * @returns Estado del wizard o null si no existe
 */
export const loadWizardState = (): Record<string, any> | null => {
  try {
    const savedData = localStorage.getItem("wizardData")
    return savedData ? JSON.parse(savedData) : null
  } catch (error) {
    console.error("Error al cargar el estado del wizard:", error)
    return null
  }
}
