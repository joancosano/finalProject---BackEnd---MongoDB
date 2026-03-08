import {validarUsuario} from "./utils.js";
import {createHeader,createFooter} from "./utils.js"


/////////////////Header y Footer/////////////////

const header = createHeader();
const footer = createFooter();

    
////////////////// main ////////////////////////////

// Creo el formulario
const main = document.querySelector("main");
const form = document.createElement("form");

// Añado el campo para introducir el usaurio
const inputUser = document.createElement("input");
inputUser.type = "text";
inputUser.name = "usuario";
inputUser.id = "usuario";
inputUser.placeholder = "Introduce tu usuario";

// creo la etiqueta del campo usuario
const userLabel = document.createElement("label");
userLabel.textContent = "Usuario";
userLabel.htmlFor = "usuario"

//creamos el campo para introducir el password
const inputPass = document.createElement("input");
inputPass.type = "password";
inputPass.name = "password";
inputPass.id = "password";
inputPass.placeholder = "Introduce tu contraseña";

//creamos las etiqueta del campo password
const passLabel = document.createElement("label");
passLabel.textContent = "Contraseña";
passLabel.htmlFor = "password"

//crear contenedor de botones
const buttons = document.createElement("div");
buttons.classList.add("buttonsForm")

//creamos el botón looging
const loginButton = document.createElement("button");
loginButton.type = "submit";
loginButton.textContent = "Aceptar"


//creamos el botón nuevo usuario
const registerButton = document.createElement("button");
registerButton.type = "button";
registerButton.textContent = "Nuevo Usuario"

registerButton.addEventListener("click", () => {
    window.location.href = "registro.html";
})

//////////////////fondo loging////////////////////////

const loginBackground = document.createElement("div");
loginBackground.classList.add("loginBackground");



//anidamos los elementos
form.appendChild(userLabel)
form.appendChild(inputUser)
form.appendChild(passLabel)
form.appendChild(inputPass)
form.appendChild(buttons)
buttons.appendChild(registerButton);
buttons.appendChild(loginButton);
loginBackground.appendChild(form)
main.appendChild(loginBackground);


// borramos el error al comenzar a escribir de nuevo.

inputUser.addEventListener("input", eliminarError);
inputPass.addEventListener("input", eliminarError);

function eliminarError(){
    const error = document.querySelector(".error");
    if(error){
        error.remove();
    }
}

async function loginUsuario(usuario, password) {

    const respuesta = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario,
            password: password
        })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.error || "Error en login");
    }

    return datos;
}


////// logica de login ////////


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const usuario = inputUser.value;
    const password = inputPass.value;

    try {

        const datos = await loginUsuario(usuario, password);

        alert("Login correcto");

        window.location.href = `productos.html?usuario=${datos.usuario}`;

    } catch(error){
        
        const errores = document.querySelectorAll(".error");
        
        errores.forEach(e => e.remove());
        const errorMsg = document.createElement("p");
        errorMsg.textContent = error.message;
        errorMsg.classList.add("error");
        errorMsg.textContent = error.message;
        inputPass.insertAdjacentElement("afterend", errorMsg);

}
}

);