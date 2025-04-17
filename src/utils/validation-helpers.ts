/**
 * Utilidad para validar campos en formularios
 * Proporciona funciones reutilizables para validar diferentes tipos de datos
 */

/**
 * Verifica si un valor de tipo string tiene contenido
 * @param value - Valor a validar
 * @returns true si el string tiene contenido, false si es undefined, null, o string vacío
 */
export const hasStringValue = (value: string | null | undefined): boolean => {
    return value !== undefined && value !== null && value.trim() !== '';
  };
  
  /**
   * Verifica si un valor numérico es válido
   * @param value - Valor a validar
   * @param minValue - Valor mínimo aceptable (opcional)
   * @returns true si el número es válido y mayor o igual que minValue
   */
  export const hasNumberValue = (value: number | null | undefined, minValue: number = 0): boolean => {
    return value !== undefined && value !== null && !isNaN(value) && value >= minValue;
  };
  
  /**
   * Verifica si un objeto tiene propiedades
   * @param obj - Objeto a validar
   * @returns true si el objeto existe y tiene al menos una propiedad
   */
  export const hasObjectValue = (obj: object | null | undefined): boolean => {
    return obj !== undefined && obj !== null && Object.keys(obj).length > 0;
  };
  
  /**
   * Verifica si un array tiene elementos
   * @param arr - Array a validar
   * @returns true si el array existe y tiene al menos un elemento
   */
  export const hasArrayValue = (arr: any[] | null | undefined): boolean => {
    return arr !== undefined && arr !== null && arr.length > 0;
  };
  
  /**
   * Verifica si un valor booleano es true
   * @param value - Valor a validar
   * @returns true si el valor es exactamente true
   */
  export const isTrue = (value: boolean | null | undefined): boolean => {
    return value === true;
  };
  
  /**
   * Verifica si un campo tiene valor, independientemente de su tipo
   * @param value - Valor a validar (cualquier tipo)
   * @returns true si el valor existe y no está vacío
   */
  export const hasValue = (value: any): boolean => {
    if (value === undefined || value === null) {
      return false;
    }
    
    // Validación según el tipo de dato
    switch (typeof value) {
      case 'string':
        return value.trim() !== '';
      case 'number':
        return !isNaN(value);
      case 'boolean':
        return true; // Tanto true como false son valores válidos
      case 'object':
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return Object.keys(value).length > 0;
      default:
        return true;
    }
  };
  
  /**
   * Verifica si todos los campos de un objeto tienen valor
   * @param obj - Objeto cuyos campos se validarán
   * @param requiredFields - Array con los nombres de los campos requeridos (opcional)
   * @returns true si todos los campos requeridos tienen valor
   */
  export const allFieldsHaveValue = (
    obj: Record<string, any>,
    requiredFields?: string[]
  ): boolean => {
    const fieldsToCheck = requiredFields || Object.keys(obj);
    
    return fieldsToCheck.every(field => {
      const value = obj[field];
      return hasValue(value);
    });
  };
  
  /**
   * Verifica si un campo anidado en un objeto tiene valor
   * @param obj - Objeto que contiene el campo anidado
   * @param path - Ruta al campo anidado (formato: 'prop1.prop2.prop3')
   * @returns true si el campo anidado tiene valor
   */
  export const hasNestedValue = (obj: Record<string, any>, path: string): boolean => {
    const parts = path.split('.');
    let current = obj;
    
    for (const part of parts) {
      if (!hasValue(current) || typeof current !== 'object') {
        return false;
      }
      current = current[part];
    }
    
    return hasValue(current);
  };