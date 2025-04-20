/**
 * Utilidades para controlar y validar entradas de usuario en inputs
 * Proporciona funciones para restringir y formatear entradas
 */

/**
 * ===================================
 * VALIDACIONES NUMÉRICAS
 * ===================================
 */

/**
 * Permite solo números en un input
 * @param event - Evento de input
 * @param allowDecimal - Si se permiten números decimales
 * @param allowNegative - Si se permiten números negativos
 */
export const allowOnlyNumbers = (event: Event, allowDecimal = false, allowNegative = false): void => {
    const input = event.target as HTMLInputElement
    const value = input.value
  
    // Expresión regular según las opciones
    let regex: RegExp
  
    if (allowDecimal && allowNegative) {
      // Permite números negativos y decimales
      regex = /^-?\d*\.?\d*$/
    } else if (allowDecimal) {
      // Permite solo decimales positivos
      regex = /^\d*\.?\d*$/
    } else if (allowNegative) {
      // Permite enteros negativos
      regex = /^-?\d*$/
    } else {
      // Solo enteros positivos
      regex = /^\d*$/
    }
  
    // Si el valor no coincide con la expresión regular, restaurar al valor anterior
    if (!regex.test(value)) {
      // Eliminar el último carácter ingresado
      input.value = value.substring(0, value.length - 1)
    }
  }
  
  /**
   * Permite solo caracteres numéricos sin espacios
   * @param event - Evento de input
   */
  export const allowOnlyNumericCharacters = (event: Event): void => {
    const input = event.target as HTMLInputElement
    const value = input.value
    
    // Expresión regular que permite solo dígitos
    const regex = /^\d*$/
    
    // Si el valor no coincide con la expresión regular, restaurar al valor anterior
    if (!regex.test(value)) {
      // Eliminar el último carácter ingresado
      input.value = value.substring(0, value.length - 1)
    }
  }
  
/**
 * Permite solo números positivos con exactamente dos decimales
 * @param event - Evento de input
 */
export const allowPositiveNumbersWithTwoDecimals = (event: Event): void => {
    const input = event.target as HTMLInputElement
    let value = input.value
    
    // Si el primer carácter es un punto o una coma, no permitirlo
    if (value === '.' || value === ',') {
      input.value = '';
      return;
    }
    
    // Reemplazar coma por punto para estandarizar
    if (value.includes(',')) {
      value = value.replace(',', '.')
      input.value = value
    }
    
    // Expresión regular que permite números positivos con hasta dos decimales
    // y asegura que el primer carácter sea un dígito
    const regex = /^\d+\.?\d{0,2}$/
    
    // Si el valor no coincide con la expresión regular, restaurar al valor anterior
    if (!regex.test(value)) {
      // Eliminar el último carácter ingresado
      input.value = value.substring(0, value.length - 1)
    }
  }
  
  /**
   * ===================================
   * VALIDACIONES DE TEXTO
   * ===================================
   */
  
  /**
   * Permite solo letras en un input
   * @param event - Evento de input
   * @param allowSpaces - Si se permiten espacios
   * @param allowAccents - Si se permiten letras con acentos
   */
  export const allowOnlyLetters = (event: Event, allowSpaces = true, allowAccents = true): void => {
    const input = event.target as HTMLInputElement
    const value = input.value
  
    // Expresión regular según las opciones
    let regex: RegExp
  
    if (allowAccents && allowSpaces) {
      // Permite letras, acentos y espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/
    } else if (allowAccents) {
      // Permite letras y acentos, sin espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]*$/
    } else if (allowSpaces) {
      // Permite letras y espacios, sin acentos
      regex = /^[a-zA-Z\s]*$/
    } else {
      // Solo letras sin acentos ni espacios
      regex = /^[a-zA-Z]*$/
    }
  
    // Si el valor no coincide con la expresión regular, restaurar al valor anterior
    if (!regex.test(value)) {
      // Eliminar el último carácter ingresado
      input.value = value.substring(0, value.length - 1)
    }
  }
  
/**
 * Permite solo letras y espacios, sin caracteres especiales ni números
 * @param event - Evento de input
 * @param allowAccents - Si se permiten letras con acentos
 * @returns - El valor validado
 */
export const allowOnlyLettersAndSpaces = (event: Event, allowAccents = true): string => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Expresión regular según las opciones
  const regex = allowAccents 
    ? /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/ 
    : /^[a-zA-Z\s]*$/
  
  // Si el valor no coincide con la expresión regular, restaurar al valor anterior
  if (!regex.test(value)) {
    // Eliminar el último carácter ingresado
    input.value = value.substring(0, value.length - 1)
  }
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}
  
  /**
   * Permite solo letras, espacios y números, sin caracteres especiales
   * @param event - Evento de input
   * @param allowAccents - Si se permiten letras con acentos
   */
  export const allowOnlyLettersSpacesAndNumbers = (event: Event, allowAccents = true): void => {
    const input = event.target as HTMLInputElement
    const value = input.value
    
    // Expresión regular según las opciones
    const regex = allowAccents 
      ? /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s]*$/ 
      : /^[a-zA-Z0-9\s]*$/
    
    // Si el valor no coincide con la expresión regular, restaurar al valor anterior
    if (!regex.test(value)) {
      // Eliminar el último carácter ingresado
      input.value = value.substring(0, value.length - 1)
    }
  }

  
  /**
   * Permite solo alfanuméricos en un input
   * @param event - Evento de input
   * @param allowSpaces - Si se permiten espacios
   * @param allowSpecialChars - Si se permiten caracteres especiales (lista personalizable)
   */
  export const allowAlphanumeric = (event: Event, allowSpaces = false, allowSpecialChars = ""): void => {
    const input = event.target as HTMLInputElement
    const value = input.value
  
    // Escapar caracteres especiales para la regex
    const escapedSpecialChars = allowSpecialChars.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  
    // Expresión regular según las opciones
    const regexPattern = allowSpaces ? `^[a-zA-Z0-9${escapedSpecialChars}\\s]*$` : `^[a-zA-Z0-9${escapedSpecialChars}]*$`
  
    const regex = new RegExp(regexPattern)
  
    // Si el valor no coincide con la expresión regular, restaurar al valor anterior
    if (!regex.test(value)) {
      // Eliminar el último carácter ingresado
      input.value = value.substring(0, value.length - 1)
    }
  }
  
  /**
   * ===================================
   * VALIDACIONES DE FORMATO
   * ===================================
   */
  
  /**
   * Valida la estructura de un email
   * @param email - Correo electrónico a validar
   * @returns Verdadero si el email es válido, falso en caso contrario
   */
  export const validateEmail = (email: string): boolean => {
    // Expresión regular para validar emails
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }
  
  /**
   * Restringe la entrada a un formato de email válido
   * @param event - Evento de input
   */
  export const restrictToEmailFormat = (event: Event): void => {
    const input = event.target as HTMLInputElement
    const value = input.value
    
    // Permitimos caracteres válidos para un email
    const regex = /^[a-zA-Z0-9._%+-@]*$/
    
    // Si el valor contiene caracteres no válidos para un email, eliminar el último carácter
    if (!regex.test(value)) {
      input.value = value.substring(0, value.length - 1)
    }
  }
  
  /**
   * ===================================
   * VALIDACIONES DE DOCUMENTOS Y TELÉFONOS
   * ===================================
   */
  
  /**
   * Formatea un input como RUC o cédula ecuatoriana (13 dígitos)
   * @param event - Evento de input
   */
  export const formatEcuadorianId = (event: Event): void => {
    const input = event.target as HTMLInputElement
    let value = input.value
  
    // Eliminar cualquier carácter que no sea número
    value = value.replace(/\D/g, "")
  
    // Limitar a 13 caracteres (longitud máxima de RUC)
    if (value.length > 13) {
      value = value.substring(0, 13)
    }
  
    input.value = value
  }
  
  /**
   * Formatea un número de teléfono (10 dígitos)
   * @param event - Evento de input
   */
  export const formatPhoneNumber = (event: Event): void => {
    const input = event.target as HTMLInputElement
    let value = input.value
  
    // Eliminar cualquier carácter que no sea número
    value = value.replace(/\D/g, "")
  
    // Limitar a 10 caracteres
    if (value.length > 10) {
      value = value.substring(0, 10)
    }
  
    input.value = value
  }
  
  /**
   * ===================================
   * UTILIDADES GENERALES
   * ===================================
   */
  
  /**
   * Elimina espacios en blanco de un input
   * @param event - Evento de input
   */
  export const removeSpaces = (event: Event): void => {
    const input = event.target as HTMLInputElement
    input.value = input.value.replace(/\s/g, "")
  }
  
  /**
   * Convierte el texto a mayúsculas
   * @param event - Evento de input
   */
  export const toUpperCase = (event: Event): void => {
    const input = event.target as HTMLInputElement
    input.value = input.value.toUpperCase()
  }
  
  /**
   * Convierte el texto a minúsculas
   * @param event - Evento de input
   */
  export const toLowerCase = (event: Event): void => {
    const input = event.target as HTMLInputElement
    input.value = input.value.toLowerCase()
  }
  
  /**
   * Limita la longitud máxima de un input
   * @param event - Evento de input
   * @param maxLength - Longitud máxima permitida
   */
  export const limitMaxLength = (event: Event, maxLength: number): void => {
    const input = event.target as HTMLInputElement
    if (input.value.length > maxLength) {
      input.value = input.value.substring(0, maxLength)
    }
  }