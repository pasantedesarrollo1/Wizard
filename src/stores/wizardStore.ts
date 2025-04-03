/**
 * Store para manejar el estado de los wizards
 * Utilizamos Pinia para gestionar el estado global
 */

import { defineStore } from "pinia"
import type { Wizard, WizardStep, WizardState } from "@/types/wizard"

export const useWizardStore = defineStore("wizard", {
  state: (): WizardState => ({
    wizards: [
      // Wizard de Ventas
      {
        id: "ventas",
        name: "Ventas",
        description: "Flujo de ventas",
        steps: [
          {
            id: "ventas-paso-1",
            title: "Información del Producto",
            isCommon: false,
            order: 1,
            icon: "cart-outline",
          },
          {
            id: "ventas-paso-2",
            title: "Cotización",
            isCommon: false,
            order: 2,
            icon: "cash-outline",
          },
        ],
        currentStepIndex: 0,
      },
      // Wizard de Soporte
      {
        id: "soporte",
        name: "Soporte",
        description: "Flujo de soporte",
        steps: [
          {
            id: "soporte-paso-1",
            title: "Diagnóstico",
            isCommon: false,
            order: 1,
            icon: "medkit-outline",
          },
          {
            id: "soporte-paso-2",
            title: "Solución",
            isCommon: false,
            order: 2,
            icon: "build-outline",
          },
        ],
        currentStepIndex: 0,
      },
      // Wizard de Cliente
      {
        id: "cliente",
        name: "Cliente",
        description: "Flujo de cliente",
        steps: [
          {
            id: "cliente-paso-1",
            title: "Perfil",
            isCommon: false,
            order: 1,
            icon: "person-outline",
          },
          {
            id: "cliente-paso-2",
            title: "Preferencias",
            isCommon: false,
            order: 2,
            icon: "options-outline",
          },
        ],
        currentStepIndex: 0,
      },
    ],
    // Pasos comunes entre todos los wizards
    commonSteps: [
      {
        id: "common-paso-1",
        title: "Información General",
        isCommon: true,
        order: 0,
        icon: "information-circle-outline",
      },
      {
        id: "common-paso-final",
        title: "Confirmación",
        isCommon: true,
        order: 999, // Siempre al final
        icon: "checkmark-circle-outline",
      },
    ],
    activeWizardId: null,
  }),

  getters: {
    // Obtener el wizard activo
    activeWizard: (state) => {
      return state.activeWizardId ? state.wizards.find((w) => w.id === state.activeWizardId) : null
    },

    // Obtener todos los pasos del wizard activo (comunes + específicos)
    activeWizardSteps: (state) => {
      if (!state.activeWizardId) return []

      const wizard = state.wizards.find((w) => w.id === state.activeWizardId)
      if (!wizard) return []

      // Combinamos pasos comunes y específicos, ordenados por la propiedad 'order'
      return [
        ...state.commonSteps.filter((step) => step.order === 0), // Pasos comunes al inicio
        ...wizard.steps, // Pasos específicos del wizard
        ...state.commonSteps.filter((step) => step.order === 999), // Pasos comunes al final
      ].sort((a, b) => a.order - b.order)
    },

    // Obtener el paso actual del wizard activo
    currentStep: (state) => {
      if (!state.activeWizardId) return null

      const wizard = state.wizards.find((w) => w.id === state.activeWizardId)
      if (!wizard) return null

      const allSteps = [
        ...state.commonSteps.filter((step) => step.order === 0),
        ...wizard.steps,
        ...state.commonSteps.filter((step) => step.order === 999),
      ].sort((a, b) => a.order - b.order)

      return allSteps[wizard.currentStepIndex] || null
    },
  },

  actions: {
    // Establecer el wizard activo
    setActiveWizard(wizardId: string) {
      this.activeWizardId = wizardId
    },

    // Avanzar al siguiente paso
    nextStep() {
      if (!this.activeWizardId) return

      const wizard = this.wizards.find((w) => w.id === this.activeWizardId)
      if (!wizard) return

      const totalSteps = this.activeWizardSteps.length

      if (wizard.currentStepIndex < totalSteps - 1) {
        wizard.currentStepIndex++
      }
    },

    // Retroceder al paso anterior
    prevStep() {
      if (!this.activeWizardId) return

      const wizard = this.wizards.find((w) => w.id === this.activeWizardId)
      if (!wizard) return

      if (wizard.currentStepIndex > 0) {
        wizard.currentStepIndex--
      }
    },

    // Ir a un paso específico
    goToStep(stepIndex: number) {
      if (!this.activeWizardId) return

      const wizard = this.wizards.find((w) => w.id === this.activeWizardId)
      if (!wizard) return

      const totalSteps = this.activeWizardSteps.length

      if (stepIndex >= 0 && stepIndex < totalSteps) {
        wizard.currentStepIndex = stepIndex
      }
    },

    // Añadir un nuevo wizard
    addWizard(wizard: Wizard) {
      this.wizards.push(wizard)
    },

    // Añadir un paso común
    addCommonStep(step: WizardStep) {
      this.commonSteps.push(step)
      // Ordenamos los pasos comunes
      this.commonSteps.sort((a, b) => a.order - b.order)
    },
  },
})

