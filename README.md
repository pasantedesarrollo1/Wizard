# Wizard - Aplicación de Configuración Empresarial

![Logo de Wizard](./src/assets/icons/logo-horizontal.png)

## 📋 Descripción

Esta es una aplicación desarrollada con Vue 3, TypeScript e Ionic que proporciona una interfaz de usuario intuitiva para la configuración y creación de empresas. La aplicación utiliza un sistema de pasos (steps) y subpasos (substeps) que guía al usuario a través del proceso completo de configuración empresarial, desde la información personal hasta la configuración de la empresa, sucursales y puntos de venta.

## ✨ Características Principales

- **Interfaz de usuario moderna e intuitiva** con Ionic y TailwindCSS
- **Sistema de pasos (wizard)** con navegación fluida entre secciones (steps y substeps)
- **Validación de formularios** en tiempo real
- **Gestión de estado centralizada** con Pinia
- **Diseño responsivo** adaptado a dispositivos móviles y escritorio
- **Múltiples flujos de wizard** para diferentes tipos de usuarios (ventas, soporte, cliente) en caso que se necesite, actualmente esta dirigido para ventas
- **Carga y edición de imágenes** para logos de sucursales (las empresas en general no manejan logo, solo las sucursales)
- **Almacenamiento persistente** de datos del formulario

## 🛠️ Tecnologías Utilizadas

- **Vue 3**
- **TypeScript**
- **Ionic**
- **Pinia**: Biblioteca de gestión de estado
- **Vue Router**: Enrutador
- **TailwindCSS**: Framework CSS utilitario
- **Axios**: Cliente HTTP basado en promesas
- **Vite**: Herramienta de compilación rápida para desarrollo web

## 📦 Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

```bash
# Clonar el repositorio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev 
o
ionic serve
