/*
      Fynas es un simulador de finanzas personales que permite registrar
      ingresos y gastos de forma simple. Su objetivo es ayudar al usuario a
      visualizar su saldo disponible y gestionar mejor su dinero. Esta versión
      inicial funciona por consola y permite interactuar con el usuario mediante
      cuadros de diálogo.
*/

// VARIABLES GLOBALES
let usuarios = [];
let sessionActive = false;
//Funcion para mostrar usuarios registrados

const mostrarUsuarios = () => {
  return usuarios.map((user) => `${user.userName}\n`);
};

// Función para registrar un nuevo usuario
const registrarUsuario = (userName, password) => {
  //Verificar si los campos están completos
  if (verificarCamposVacios([userName, password])) {
    return "Todos los campos son obligatorios.! Vuelve a intentarlo";
  }

  //Verifica si el usuario existe
  const userExists = usuarios.some((user) => user.userName === userName);
  if (userExists) {
    return "El usuario ya existe. Intenta con otro nombre de usuario.";
  }

  //Agrega el nuevo ususario
  usuarios.push({ userName, password });
  return `Usuario ${userName} registrado exitosamente.`;
};

const verificarCamposVacios = (campos) => {
  return campos.some((campo) => campo === "");
};

const verificarUsuario = (dataUser) => {
  const { userName, password } = dataUser;
  if (verificarCamposVacios([userName, password])) {
    return "Todos los campos son obligatorios.! Vuelve a intentarlo";
  }

  const userExists = usuarios.some(
    (user) => user.userName === userName && user.password === password
  );

  if (userExists) {
    alert(`Bienvenido ${userName}!`);
    return true;
  } else {
    alert("Usuario o contraseña incorrectos.");
    return false;
  }
};

//Menú de opciones
let opcionUser = parseInt(
  prompt(
    "Ingrese la opción deseada:\n1. Registrarme\n2. Iniciar Sesión\n3. Mostrar Usuarios\n5. Salir"
  )
);

while (opcionUser != 5) {
  switch (opcionUser) {
    case 1:
      {
        const userName = prompt("Nombre de usuario: ");
        const password = prompt("Contraseña: ");
        const mensajeRegistro = registrarUsuario(userName, password);
        alert(mensajeRegistro);
      }
      break;
    case 2:
      {
        const userName = prompt("Nombre de usuario: ");
        const password = prompt("Contraseña: ");
        const mensajeLogin = verificarUsuario({ userName, password });
        if (typeof mensajeLogin === "string") {
          alert(mensajeLogin);
        }
      }
      break;
    case 3:
      if (usuarios.length == 0) {
        alert("No existen usuarios registrados!");
      } else {
        alert(`Usuarios Registrados: \n ${mostrarUsuarios()}`);
      }
      break;
  }
  opcionUser = parseInt(
    prompt(
      "Ingrese la opción deseada:\n1. Registrarme\n2. Iniciar Sesión\n3. Mostrar Usuarios\n5. Salir"
    )
  );
}
