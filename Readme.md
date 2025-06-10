# 📊 Fynas - Simulador de Finanzas Personales

---

## 🧠 Descripción General

**Fynas** es una aplicación de consola desarrollada en JavaScript que permite al usuario:

- Registrarse e iniciar sesión
- Registrar ingresos y gastos
- Consultar el historial de movimientos
- Visualizar su saldo actual
- Cerrar sesión de forma segura

---

## 🏗️ Estructura del Proyecto

```
fynas/
│
├── index.js           # Archivo principal que ejecuta la lógica de interacción
├── funciones.js       # Contiene todas las funciones y lógica del sistema
├── README.md          # Documentación del proyecto
```

---

## 📂 Archivos Principales

### ✅ `funciones.js`

Contiene toda la lógica funcional del programa:

- Manejo de usuarios
- Verificación de credenciales
- Gestión de sesión activa
- Registro de movimientos financieros
- Cálculo de saldo
- Visualización de historial

> Además, utiliza una variable global `movimientos` para almacenar los ingresos y gastos por usuario.

### ✅ `index.js`

Controla la interacción con el usuario mediante menú dinámico:

- Muestra distintas opciones según el estado de la sesión
- Llama a funciones importadas desde `funciones.js`
- Controla el flujo principal del programa

---

## 🔧 Funcionalidades

### 🔐 Registro e inicio de sesión

- Validación de campos vacíos
- Verificación de existencia del usuario
- Sesión activa controlada con bandera `sessionActive` y variable `usuarioActivo`

### 💸 Finanzas personales

- Registro de ingresos (monto, descripción, fecha)
- Registro de gastos (ídem)
- Consulta de historial de movimientos
- Cálculo automático del saldo disponible

### 🔁 Control de sesión

- Cierre de sesión que desactiva opciones financieras
- Rehabilitación del menú inicial para nuevos inicios

---

## 🧪 Ejemplo de flujo

1. Usuario selecciona "Registrarse"
2. Luego "Iniciar sesión"
3. Una vez logueado, accede a opciones de:
   - Registrar ingreso
   - Registrar gasto
   - Ver historial
   - Ver saldo
   - Cerrar sesión

---

## 🛠️ Tecnologías utilizadas

- **JavaScript** ES6+
- **Browser API** (prompts, alerts)
- Separación de código con **módulos JS (`import/export`)**

---

## 📌 Requisitos para ejecución

- Un navegador moderno (Chrome, Firefox, Edge)
- Activar opción para usar módulos en el archivo HTML

```html
<script type="module" src="index.js"></script>
```
