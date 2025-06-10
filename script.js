// -----------------------------------------
// index.js - Controlador principal de Fynas
// -----------------------------------------
// Este archivo maneja la interacción con el usuario
// mediante menús según el estado de sesión.
// Llama a las funciones definidas en funciones.js para operar.

import {
  mostrarUsuarios,
  registrarUsuario,
  verificarUsuario,
  cerrarSesion,
  registrarMovimiento,
  verHistorial,
  calcularSaldo,
  obtenerEstadoSesion,
} from "./funciones.js";

// Función que muestra el menú según si hay sesión activa
const mostrarMenu = () => {
  const { sessionActive } = obtenerEstadoSesion();

  let opciones = sessionActive
    ? "1. Registrar ingreso\n2. Registrar gasto\n3. Ver historial\n4. Ver saldo\n5. Cerrar sesión\n6. Salir"
    : "1. Registrarme\n2. Iniciar Sesión\n3. Mostrar Usuarios\n4. Salir";

  return parseInt(prompt("Ingrese la opción deseada:\n" + opciones));
};

// Inicio del programa: se muestra el menú
let opcion = mostrarMenu();

// Bucle principal del programa
while (true) {
  const { sessionActive } = obtenerEstadoSesion();

  // Si NO hay sesión activa
  if (!sessionActive) {
    switch (opcion) {
      case 1: {
        // Registrar nuevo usuario
        const newUser = prompt("Nombre de usuario:");
        const newPass = prompt("Contraseña:");
        alert(registrarUsuario(newUser, newPass));
        break;
      }
      case 2: {
        // Iniciar sesión
        const loginUser = prompt("Nombre de usuario:");
        const loginPass = prompt("Contraseña:");
        const loginExitoso = verificarUsuario({
          userName: loginUser,
          password: loginPass,
        });
        if (loginExitoso) {
          alert(`Bienvenido ${loginUser}!`);
          opcion = mostrarMenu(); // Actualiza el menú tras iniciar sesión
          continue; // Vuelve al inicio del bucle con sesión activa
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
        break;
      }
      case 3:
        // Mostrar usuarios registrados
        alert(mostrarUsuarios() || "No hay usuarios registrados.");
        break;
      case 4:
        // Salir del sistema
        alert("Gracias por usar Fynas!");
        break;
      default:
        alert("Opción inválida.");
    }

    if (opcion === 4) break; // Finaliza el programa si se eligió salir
  } else {
    // Si HAY sesión activa
    switch (opcion) {
      case 1: {
        // Registrar ingreso
        const descIngreso = prompt("Descripción del ingreso:");
        const montoIngreso = parseFloat(prompt("Monto:"));
        if (isNaN(montoIngreso) || montoIngreso <= 0) {
          alert("Monto inválido.");
        } else {
          registrarMovimiento("ingreso", descIngreso, montoIngreso);
          alert("Ingreso registrado.");
        }
        break;
      }
      case 2: {
        // Registrar gasto
        const descGasto = prompt("Descripción del gasto:");
        const montoGasto = parseFloat(prompt("Monto:"));
        if (isNaN(montoGasto) || montoGasto <= 0) {
          alert("Monto inválido.");
        } else {
          registrarMovimiento("gasto", descGasto, montoGasto);
          alert("Gasto registrado.");
        }
        break;
      }
      case 3: {
        // Ver historial de movimientos
        const historial = verHistorial();
        if (historial.length === 0) {
          alert("No hay movimientos aún.");
        } else {
          alert(
            historial
              .map(
                (m) =>
                  `${m.fecha} - ${m.tipo.toUpperCase()}: ${m.descripcion} ($ ${
                    m.monto
                  })`
              )
              .join("\n")
          );
        }
        break;
      }
      case 4: {
        // Ver saldo actual
        const saldo = calcularSaldo();
        alert(`Saldo actual: $ ${saldo}`);
        break;
      }
      case 5:
        // Cerrar sesión
        cerrarSesion();
        alert("Sesión cerrada.");
        break;
      case 6:
        // Salir del sistema
        alert("Gracias por usar Fynas!");
        break;
      default:
        alert("Opción inválida.");
    }

    if (opcion === 6 || opcion === 5) break; // Terminar si se sale o cierra sesión
  }

  // Mostrar menú nuevamente en el siguiente ciclo
  opcion = mostrarMenu();
}
