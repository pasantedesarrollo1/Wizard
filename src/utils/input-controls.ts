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
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const allowOnlyNumbers = (event: Event, allowDecimal = false, allowNegative = false): string => {
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
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
 * Permite solo caracteres numéricos sin espacios
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const allowOnlyNumericCharacters = (event: Event): string => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Expresión regular que permite solo dígitos
  const regex = /^\d*$/
  
  // Si el valor no coincide con la expresión regular, restaurar al valor anterior
  if (!regex.test(value)) {
    // Eliminar el último carácter ingresado
    input.value = value.substring(0, value.length - 1)
  }
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
* Permite solo números positivos con exactamente dos decimales
* @param event - Evento de input
* @returns - El valor validado para actualizar el modelo de Vue
*/
export const allowPositiveNumbersWithTwoDecimals = (event: Event): string => {
  const input = event.target as HTMLInputElement
  let value = input.value
  
  // Si el primer carácter es un punto o una coma, no permitirlo
  if (value === '.' || value === ',') {
    input.value = '';
    return input.value;
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
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
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
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const allowOnlyLetters = (event: Event, allowSpaces = true, allowAccents = true): string => {
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
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
* Permite solo letras y espacios, sin caracteres especiales ni números
* @param event - Evento de input
* @param allowAccents - Si se permiten letras con acentos
* @returns - El valor validado para actualizar el modelo de Vue
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
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const allowOnlyLettersSpacesAndNumbers = (event: Event, allowAccents = true): string => {
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
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}


/**
 * Permite solo alfanuméricos en un input
 * @param event - Evento de input
 * @param allowSpaces - Si se permiten espacios
 * @param allowSpecialChars - Si se permiten caracteres especiales (lista personalizable)
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const allowAlphanumeric = (event: Event, allowSpaces = false, allowSpecialChars = ""): string => {
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
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
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
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const restrictToEmailFormat = (event: Event): string => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Permitimos caracteres válidos para un email
  const regex = /^[a-zA-Z0-9._%+-@]*$/
  
  // Si el valor contiene caracteres no válidos para un email, eliminar el último carácter
  if (!regex.test(value)) {
    input.value = value.substring(0, value.length - 1)
  }
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
 * ===================================
 * VALIDACIONES DE DOCUMENTOS Y TELÉFONOS
 * ===================================
 */

/**
 * Formatea un input como RUC o cédula ecuatoriana (13 dígitos)
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const formatEcuadorianId = (event: Event): string => {
  const input = event.target as HTMLInputElement
  let value = input.value

  // Eliminar cualquier carácter que no sea número
  value = value.replace(/\D/g, "")

  // Limitar a 13 caracteres (longitud máxima de RUC)
  if (value.length > 13) {
    value = value.substring(0, 13)
  }

  input.value = value
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
 * Formatea un número de teléfono (10 dígitos)
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const formatPhoneNumber = (event: Event): string => {
  const input = event.target as HTMLInputElement
  let value = input.value

  // Eliminar cualquier carácter que no sea número
  value = value.replace(/\D/g, "")

  // Limitar a 10 caracteres
  if (value.length > 10) {
    value = value.substring(0, 10)
  }

  input.value = value
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
 * ===================================
 * UTILIDADES GENERALES
 * ===================================
 */

/**
 * Elimina espacios en blanco de un input
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const removeSpaces = (event: Event): string => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\s/g, "")
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
 * Convierte el texto a mayúsculas
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const toUpperCase = (event: Event): string => {
  const input = event.target as HTMLInputElement
  input.value = input.value.toUpperCase()
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
 * Convierte el texto a minúsculas
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const toLowerCase = (event: Event): string => {
  const input = event.target as HTMLInputElement
  input.value = input.value.toLowerCase()
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}

/**
 * Limita la longitud máxima de un input
 * @param event - Evento de input
 * @param maxLength - Longitud máxima permitida
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const limitMaxLength = (event: Event, maxLength: number): string => {
  const input = event.target as HTMLInputElement
  if (input.value.length > maxLength) {
    input.value = input.value.substring(0, maxLength)
  }
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return input.value
}