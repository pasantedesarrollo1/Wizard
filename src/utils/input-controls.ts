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

  // Filtrar caracteres no válidos
  let validValue = value
  if (!regex.test(value)) {
    // Crear un valor que cumpla con la expresión regular
    validValue = value.replace(/[^\d.-]/g, '')
    
    // Asegurar que solo hay un punto decimal
    if (allowDecimal) {
      const parts = validValue.split('.')
      if (parts.length > 2) {
        validValue = parts[0] + '.' + parts.slice(1).join('')
      }
    }
    
    // Asegurar que el signo negativo solo está al principio
    if (allowNegative && validValue.includes('-')) {
      if (validValue.indexOf('-') !== 0) {
        validValue = validValue.replace(/-/g, '')
        if (validValue.charAt(0) !== '-') {
          validValue = '-' + validValue
        }
      }
    } else if (!allowNegative) {
      validValue = validValue.replace(/-/g, '')
    }
  }
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}

/**
 * Permite solo caracteres numéricos sin espacios
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const allowOnlyNumericCharacters = (event: Event): string => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Filtrar solo dígitos
  const validValue = value.replace(/\D/g, '')
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}

/**
* Permite solo números positivos con exactamente dos decimales
* @param event - Evento de input
* @returns - El valor validado para actualizar el modelo de Vue
*/
export const allowPositiveNumbersWithTwoDecimals = (event: Event): string => {
  const input = event.target as HTMLInputElement
  let value = input.value
  
  // Reemplazar coma por punto para estandarizar
  if (value.includes(',')) {
    value = value.replace(',', '.')
  }
  
  // Filtrar caracteres no válidos
  let validValue = value.replace(/[^\d.]/g, '')
  
  // Asegurar que solo hay un punto decimal
  const parts = validValue.split('.')
  if (parts.length > 2) {
    validValue = parts[0] + '.' + parts.slice(1).join('')
  }
  
  // Limitar a dos decimales si hay punto decimal
  if (parts.length === 2 && parts[1].length > 2) {
    validValue = parts[0] + '.' + parts[1].substring(0, 2)
  }
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
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

  // Filtrar caracteres según las opciones
  let pattern: string

  if (allowAccents && allowSpaces) {
    // Permite letras, acentos y espacios
    pattern = '[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s]'
  } else if (allowAccents) {
    // Permite letras y acentos, sin espacios
    pattern = '[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]'
  } else if (allowSpaces) {
    // Permite letras y espacios, sin acentos
    pattern = '[^a-zA-Z\\s]'
  } else {
    // Solo letras sin acentos ni espacios
    pattern = '[^a-zA-Z]'
  }

  const regex = new RegExp(pattern, 'g')
  const validValue = value.replace(regex, '')
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
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

// Filtrar caracteres según las opciones
const pattern = allowAccents 
  ? '[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s]' 
  : '[^a-zA-Z\\s]'

const regex = new RegExp(pattern, 'g')
const validValue = value.replace(regex, '')

// Retornar el valor validado para actualizar el modelo de Vue
return validValue
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
  
  // Filtrar caracteres según las opciones
  const pattern = allowAccents 
    ? '[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\\s]' 
    : '[^a-zA-Z0-9\\s]'
  
  const regex = new RegExp(pattern, 'g')
  const validValue = value.replace(regex, '')
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
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

  // Crear patrón para filtrar caracteres no permitidos
  let allowedChars = 'a-zA-Z0-9' + escapedSpecialChars
  if (allowSpaces) allowedChars += '\\s'
  
  const pattern = `[^${allowedChars}]`
  const regex = new RegExp(pattern, 'g')
  
  const validValue = value.replace(regex, '')
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
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
 * Restringe la entrada a un formato de email válido y proporciona validación en tiempo real
 * @param event - Evento de input
 * @returns - Objeto con el valor validado y el estado de validación
 */
export const restrictToEmailFormat = (event: Event): string => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Permitir solo caracteres válidos para un email
  const validValue = value.replace(/[^a-zA-Z0-9._%+-@]/g, '')
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}

/**
 * Valida un email en tiempo real y aplica estilos al input
 * @param event - Evento de input
 * @returns - Objeto con el valor validado y el estado de validación
 */
export const validateEmailInRealTime = (event: Event): { value: string, isValid: boolean } => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Permitir solo caracteres válidos para un email
  const validValue = value.replace(/[^a-zA-Z0-9._%+-@]/g, '')
  
  // Validar el formato del email
  const isValid = value.length === 0 || validateEmail(value)
  
  // Aplicar estilos al input según la validación
  if (value.length > 0) {
    if (isValid) {
      input.classList.remove('invalid-email')
      input.classList.add('valid-email')
      input.setCustomValidity('')
    } else {
      input.classList.remove('valid-email')
      input.classList.add('invalid-email')
      input.setCustomValidity('Por favor, ingrese un correo electrónico válido')
    }
  } else {
    // Si el campo está vacío, quitar ambas clases
    input.classList.remove('valid-email', 'invalid-email')
    input.setCustomValidity('')
  }
  
  // Retornar el valor validado y el estado de validación
  return { value: validValue, isValid }
}

/**
 * ===================================
 * VALIDACIONES DE DOCUMENTOS Y TELÉFONOS
 * ===================================
 */

/**
 * Formatea un input como RUC (13 dígitos)
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
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return value
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
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return value
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
  const validValue = input.value.replace(/\s/g, "")
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}

/**
 * Convierte el texto a mayúsculas
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const toUpperCase = (event: Event): string => {
  const input = event.target as HTMLInputElement
  const validValue = input.value.toUpperCase()
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}

/**
 * Convierte el texto a minúsculas
 * @param event - Evento de input
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const toLowerCase = (event: Event): string => {
  const input = event.target as HTMLInputElement
  const validValue = input.value.toLowerCase()
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}

/**
 * Limita la longitud máxima de un input
 * @param event - Evento de input
 * @param maxLength - Longitud máxima permitida
 * @returns - El valor validado para actualizar el modelo de Vue
 */
export const limitMaxLength = (event: Event, maxLength: number): string => {
  const input = event.target as HTMLInputElement
  let validValue = input.value
  
  if (validValue.length > maxLength) {
    validValue = validValue.substring(0, maxLength)
  }
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}