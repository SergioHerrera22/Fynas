// ------------------------------
// Fynas - Funciones Principales
// ------------------------------
// Este archivo contiene la lógica principal del simulador de finanzas
// incluyendo autenticación, manejo de sesión y operaciones financieras.

// Variables globales
let usuarios = [];
let sessionActive = false;
let usuarioActivo = null;
let movimientos = {};

// Mostrar todos los usuarios registrados
export const mostrarUsuarios = () => {
  return usuarios.map((user) => `- ${user.userName}`).join("\n");
};

// Verifica si algún campo está vacío
export const verificarCamposVacios = (campos) => {
  return campos.some((campo) => campo === "");
};

// Registra un nuevo usuario si no existe
export const registrarUsuario = (userName, password) => {
  if (verificarCamposVacios([userName, password])) {
    return "Todos los campos son obligatorios.! Vuelve a intentarlo";
  }

  const userExists = usuarios.some((user) => user.userName === userName);
  if (userExists) {
    return "El usuario ya existe. Intenta con otro nombre de usuario.";
  }

  usuarios.push({ userName, password });
  movimientos[userName] = [];

  return `Usuario ${userName} registrado exitosamente.`;
};

// Verifica las credenciales de un usuario e inicia sesión
export const verificarUsuario = (dataUser) => {
  const { userName, password } = dataUser;

  if (verificarCamposVacios([userName, password])) {
    return false;
  }

  const usuario = usuarios.find(
    (u) => u.userName === userName && u.password === password
  );

  if (usuario) {
    sessionActive = true;
    usuarioActivo = userName;
    return true;
  }

  return false;
};

// Cierra la sesión activa
export const cerrarSesion = () => {
  sessionActive = false;
  usuarioActivo = null;
};

// Registra un movimiento (ingreso o gasto)
export const registrarMovimiento = (tipo, descripcion, monto) => {
  if (!sessionActive || !usuarioActivo) return;

  movimientos[usuarioActivo].push({
    tipo,
    descripcion,
    monto: parseFloat(monto),
    fecha: new Date().toLocaleString(),
  });
};

// Devuelve todos los movimientos del usuario activo
export const verHistorial = () => {
  if (!sessionActive || !usuarioActivo) return [];

  return movimientos[usuarioActivo];
};

// Calcula el saldo actual del usuario activo
export const calcularSaldo = () => {
  if (!sessionActive || !usuarioActivo) return 0;

  return movimientos[usuarioActivo].reduce((acc, mov) => {
    return mov.tipo === "ingreso" ? acc + mov.monto : acc - mov.monto;
  }, 0);
};

// Devuelve el estado actual de la sesión
export const obtenerEstadoSesion = () => {
  return { sessionActive, usuarioActivo };
};
