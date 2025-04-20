
// VALIDACIONES NUMÉRICAS 

// Permite solo caracteres numéricos sin espacios
export const allowOnlyNumericCharacters = (event: Event): string => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Filtrar solo dígitos
  const validValue = value.replace(/\D/g, '')
  
  // Retornar el valor validado para actualizar el modelo de Vue
  return validValue
}

//Permite solo números positivos con exactamente dos decimales
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

// Permite solo letras en un input
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

// Permite solo letras, espacios y números, sin caracteres especiales
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

// Valida la estructura de un email
export const validateEmail = (email: string): boolean => {
  // Expresión regular para validar emails
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

// Valida un email en tiempo real y aplica estilos al input
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

// Formatea un input como RUC (13 dígitos)
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

// Formatea un número de teléfono (10 dígitos)
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