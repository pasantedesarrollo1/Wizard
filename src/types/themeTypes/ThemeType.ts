// src/types/themeTypes/ThemeType.ts

// Interfaz para los colores del tema
export interface ThemeColors {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    accent: string;
    warning: string;
    error: string;
    lightprimary: string;
    lightsecondary: string;
    lightsuccess: string;
    lighterror: string;
    lightwarning: string;
    lightinfo: string;
    textPrimary: string;
    textSecondary: string;
    borderColor: string;
    inputBorder: string;
    containerBg: string;
    background: string;
    hoverColor: string;
    surface: string;
    "on-surface-variant": string;
    grey100: string;
    grey200: string;
    tableHeader: string;
    "black-sidebar": string;
    "selected-item": string;
    // Variantes de colores primarios
    "primary-lighten-5": string;
    "primary-lighten-4": string;
    "primary-lighten-3": string;
    "primary-lighten-2": string;
    "primary-lighten-1": string;
    "primary-darken-1": string;
    "primary-darken-2": string;
    "primary-darken-3": string;
    "primary-darken-4": string;
    "primary-darken-5": string;
    // Permitir colores adicionales dinámicos
    [key: string]: string;
  }
  
  // Interfaz para las variables del tema
  export interface ThemeVariables {
    'border-color': string;
    'border-opacity': number;
    [key: string]: string | number;
  }
  
  // Interfaz principal para el tema
  export interface ThemeTypes {
    name: string;
    dark: boolean;
    variables: ThemeVariables;
    colors: ThemeColors;
  }