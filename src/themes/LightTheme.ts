// src/themes/LightTheme.ts

import type { ThemeTypes } from "@/types/themeTypes/ThemeType";
import colors from "../components/shared/Colors";

const BLUE_THEME: ThemeTypes = {
  name: "BLUE_THEME",
  dark: false,
  variables: {
    'border-color': '#e3e3e3',
    "border-opacity": 1,
  },
  colors: {
    primary: "#003cff", // Valor predeterminado (primary-500)
    "primary-lighten-5": "#e6ecff",
    "primary-lighten-4": "#bfceff",
    "primary-lighten-3": "#99b1ff",
    "primary-lighten-2": "#7394ff",
    "primary-lighten-1": "#4c76ff",
    "primary-darken-1": "#0033d9",
    "primary-darken-2": "#002ab2",
    "primary-darken-3": "#00218c",
    "primary-darken-4": "#001866",
    "primary-darken-5": "#000f40",
    secondary: "#1a97f5",
    info: "#539BFF",
    success: "#05b187",
    accent: "#FFAB91",
    warning: "#FFAE1F",
    error: "#FA896B",
    lightprimary: "#f5fcfd",
    lightsecondary: "#E8F7FF",
    lightsuccess: "#E6FFFA",
    lighterror: "#FDEDE8",
    lightwarning: "#FEF5E5",
    lightinfo: "#EBF3FE",
    textPrimary: "#2A3547",
    textSecondary: "#7c8fac",
    borderColor: "#E5E7EB",
    inputBorder: "#ccd2da",
    containerBg: "#ffffff",
    background: "#ffffff",
    hoverColor: "#f6f9fc",
    surface: "#fff",
    "on-surface-variant": "#fff",
    grey100: "#F2F6FA",
    grey200: "#EAEFF4",
    tableHeader: "#f1f1f1",
    "black-sidebar": "#27272a",
    "selected-item": "#E8E9FE",
    ...colors,
  },
};

export { BLUE_THEME };