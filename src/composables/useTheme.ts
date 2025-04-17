// src/composables/useTheme.ts

import { ref, computed } from 'vue';
import { defaultTheme, getTheme } from '@/themes';
import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

// Tema actual (reactivo)
const currentTheme = ref<ThemeTypes>(defaultTheme);

export function useTheme() {
  // Cambiar el tema actual
  const setTheme = (themeName: string) => {
    currentTheme.value = getTheme(themeName);
    applyTheme(currentTheme.value);
  };

  // Aplicar el tema al DOM
  const applyTheme = (theme: ThemeTypes) => {
    // Aplicar variables CSS al elemento :root
    const root = document.documentElement;
    
    // Aplicar colores
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Aplicar variables
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value.toString());
    });
    
    // Aplicar modo oscuro/claro
    if (theme.dark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  // Obtener un color específico del tema actual
  const getColor = (colorName: string) => {
    return currentTheme.value.colors[colorName] || '';
  };

  // Obtener una variable específica del tema actual
  const getVariable = (variableName: string) => {
    return currentTheme.value.variables[variableName] || '';
  };

  // Propiedades computadas para acceder fácilmente a los colores y variables
  const colors = computed(() => currentTheme.value.colors);
  const variables = computed(() => currentTheme.value.variables);
  const isDark = computed(() => currentTheme.value.dark);

  return {
    currentTheme,
    setTheme,
    applyTheme,
    getColor,
    getVariable,
    colors,
    variables,
    isDark
  };
}