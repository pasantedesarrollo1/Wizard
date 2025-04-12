import { defineStore } from "pinia"
import { initialState } from "./state"
import { actions } from "./actions"
import { getters } from "./getters"
import type { WizardInterface } from "@/types/wizardTypes"

// Define el store de Pinia con la estructura modular
export const useWizardStore = defineStore<string, WizardInterface, typeof getters, typeof actions>("wizard", {
  state: initialState,
  actions,
  getters,
})
