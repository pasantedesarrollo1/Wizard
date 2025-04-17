// src/themes/index.ts

import { BLUE_THEME } from './LightTheme';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

// Exportar todos los temas disponibles
export const themes: Record<string, ThemeTypes> = {
  BLUE_THEME
};

// Tema por defecto
export const defaultTheme = BLUE_THEME;

// Función para obtener un tema por su nombre
export function getTheme(themeName: string): ThemeTypes {
  return themes[themeName] || defaultTheme;
}