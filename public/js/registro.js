///////////////////clases/////////////////////////

//importamos las clases
import {poblaciones} from "./datos.js";
import {createHeader,createFooter} from "./utils.js";



/////////////////Header y Footer/////////////////

const header = createHeader();
const footer = createFooter();

////////////////   main  //////////////////////

// crear el formulario
const body = document.querySelector("body");
const main = document.querySelector("main");
const form = document.createElement("form");

//crear el campo nombre
const inputNombre = document.createElement("input");
inputNombre.type = "text"
inputNombre.name = "nombre"
inputNombre.id = "nombre"
inputNombre.placeholder="Introduce tu nombre"
inputNombre.required = true;

// crear la etiqueta para el campo nombre
const labelNombre = document.createElement("label");
labelNombre.textContent = "Nombre:"
labelNombre.htmlFor = "nombre"

//crear el campo apellidos
const inputApellidos = document.createElement("input");
inputApellidos.type = "text"
inputApellidos.name = "apellidos"
inputApellidos.id = "apellidos"
inputApellidos.placeholder = "Introduce tus apellidos"
inputApellidos.required = true;

// crear la etiqueta para el campo apellidos
const labelApellidos = document.createElement("label");
labelApellidos.textContent = "Apellidos:"
labelApellidos.htmlFor = "apellidos"

//crear el campo direccion
const inputDireccion = document.createElement("input");
inputDireccion.type = "text"
inputDireccion.name = "direccion"
inputDireccion.id = "direccion"
inputDireccion.placeholder = "introduce tu dirección"
inputDireccion.required= true;

// crear la etiqueta para el campo direccion
const labelDireccion = document.createElement("label");
labelDireccion.textContent = "Dirección:"
labelDireccion.htmlFor = "direccion"
 

//crear el campo CP
const inputCP = document.createElement("input");
inputCP.type = "text"
inputCP.name = "codigoPostal";
inputCP.id = "codigoPostal";
inputCP.placeholder = "Introdue el código postal de tu población";

//crear el campo poblacion
const selectPoblacion = document.createElement("select");
selectPoblacion.name = "poblacion"
selectPoblacion.id = "poblacion"
selectPoblacion.placeholder= "introduce el nombre de tu población"

// crear las options de poblacion
const optionDefault = document.createElement("option");
optionDefault.value = "";
optionDefault.textContent = "Selecciona una población";
optionDefault.disabled = true;
optionDefault.selected = true;
optionDefault.hidden = true;

selectPoblacion.appendChild(optionDefault);

poblaciones.forEach(poblacion =>{

    const option = document.createElement("option");
    option.value = poblacion.cp
    option.textContent = poblacion.nombre
    selectPoblacion.appendChild(option);

})

// crear la etiqueta para el campo poblacion
const labelPoblacion = document.createElement("label");
labelPoblacion.textContent = "Población:"
labelPoblacion.htmlFor = "poblacion";


// crear la etiqueta para el campo CP
const labelCP = document.createElement("label");
labelCP.textContent = "Código Postal:"
labelCP.htmlFor = "codigoPostal";

//crear el campo Telefono
const inputTelefono = document.createElement("input");
inputTelefono.type = "tel"
inputTelefono.name = "telefono"
inputTelefono.id = "telefono"
inputTelefono.placeholder= "introduce tu teléfono"
inputTelefono.pattern="(\\+34|0034|34)?[0-9]{9}"

// crear la etiqueta para el campo Telefono
const labelTelefono = document.createElement("label");
labelTelefono.textContent = "Teléfono:"
labelTelefono.htmlFor = "telefono"

//crear el campo Correo
const inputCorreo = document.createElement("input");
inputCorreo.type = "email"
inputCorreo.name = "correo"
inputCorreo.id = "correo"
inputCorreo.placeholder = "introduce tu correo"

// crear la etiqueta para el campo User
const labelCorreo = document.createElement("label");
labelCorreo.textContent = "Correo:"
labelCorreo.htmlFor = "correo"

//crear el campo User
const inputUser = document.createElement("input");
inputUser.type = "text"
inputUser.name = "usuario";
inputUser.id = "usuario";
inputUser.placeholder = "introduce tu usuario para registrarte";
inputUser.required = true;

// crear la etiqueta para el campo User
const labelUser = document.createElement("label");
labelUser.textContent = "Usuario:"
labelUser.htmlFor = "usuario";

//crear el campo Pass
const inputPass = document.createElement("input");
inputPass.type = "password";
inputPass.name = "password";
inputPass.id = "password";
inputPass.title = "Mínimo 8 caracteres, letras, números y al menos 2 símbolos especiales"
inputPass.placeholder = "Mín. 8 caracteres y 2 símbolos especiales";
inputPass.required = true;
inputPass.pattern = "(?=(?:.*[A-Za-z]))(?=(?:.*\\d))(?=(?:.*[^A-Za-z0-9]){2,}).{8,}"

// crear la etiqueta para el campo Pass
const passLabel = document.createElement("label");
passLabel.textContent = "Password:"
passLabel.htmlFor = "password";

//creamos el botón registro
const registerButton = document.createElement("button");
registerButton.type = "submit";
registerButton.textContent = "Registrarme";

///////////////////footer//////////////////////


//////////////////fondo registro////////////////////////

const loginBackground = document.createElement("div");
loginBackground.classList.add("loginBackground");

////// anidamos todos los elementos ///////////////////

form.appendChild(labelNombre);
form.appendChild(inputNombre);
form.appendChild(labelApellidos);
form.appendChild(inputApellidos);
form.appendChild(labelDireccion);
form.appendChild(inputDireccion);
form.appendChild(labelPoblacion);
form.appendChild(selectPoblacion);
form.appendChild(labelCP);
form.appendChild(inputCP);
form.appendChild(labelTelefono);
form.appendChild(inputTelefono);
form.appendChild(labelCorreo);
form.appendChild(inputCorreo);
form.appendChild(labelUser)
form.appendChild(inputUser);
form.appendChild(passLabel)
form.appendChild(inputPass);
form.appendChild(registerButton);
loginBackground.appendChild(form);
main.appendChild(loginBackground);


//////////////// Eventos y lógica/////////////////////


// validamos el teléfono para mostrar una error en el caso de ser invalido en el DOM

inputTelefono.addEventListener("change", event =>{

    const regEx = /^(\+34|0034|34)?[0-9]{9}$/;
    const tel = inputTelefono.value.replaceAll(/\s+/g,"");

    if (!regEx.test(tel) && tel != ""){
        const error = document.createElement("p");
        error.classList.add("error-telefono")
        error.textContent = "Formato de número de teléfono incorrecto";
        inputTelefono.insertAdjacentElement("afterend",error);
    }
})

inputTelefono.addEventListener("input",event =>{

    const error = document.querySelector(".error-telefono");
    if (error){
        error.remove()
    }
    
})

// validamos el e-mail para mostrar una error en el caso de ser invalido en el DOM

inputCorreo.addEventListener("change", event =>{

const regEx = /^[^\s@ñ]+@[^\s@ñ]+\.[^\s@ñ]+$/
const email = inputCorreo.value.replaceAll(/\s+/g,"")

  if (!regEx.test(email) && email != ""){
        const error = document.createElement("p");
        error.classList.add("error-mail")
        error.textContent = "Formato de número de e-mail incorrecto";
        inputCorreo.insertAdjacentElement("afterend",error);
    }

})

inputCorreo.addEventListener("input",event =>{

    const error = document.querySelector(".error-mail");
    if (error){
        error.remove()
    }
    
})

//Rellenamos automáticamente la pobación mediante el CP y viceversa

selectPoblacion.addEventListener("change", event =>{

    inputCP.value = selectPoblacion.value || "";
    
});

inputCP.addEventListener("input", event => {
    
    selectPoblacion.value = inputCP.value || "";
});

// validamos el password para mostrar una error en el caso de ser invalido en el DOM

inputPass.addEventListener("change", event =>{

const regEx = /^(?=(?:.*[A-Za-z]))(?=(?:.*\d))(?=(?:.*[^A-Za-z0-9]){2,}).{8,}$/
const pass = inputPass.value

  if (!regEx.test(pass) && pass != ""){
        const error = document.createElement("p");
        error.classList.add("error-pass")
        error.textContent = "Formato de password incorrecto";
        inputPass.insertAdjacentElement("afterend",error);
    }

})

inputPass.addEventListener("input",event =>{

    const error = document.querySelector(".error-pass");
    if (error){
        error.remove()
    }
    
})


// Borramos el mensaje de error al comenzar a modificar el usuario si ya existia.

inputUser.addEventListener("input",event =>{

    const error = document.querySelector(".error-usuario");
    if (error){
        error.remove()
    }

})

async function registrarUsuario(usuario){

    const respuesta = await fetch("http://localhost:3000/api/usuarios/register", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(usuario)
    });

    const datos = await respuesta.json();

    if(!respuesta.ok){
        throw new Error(datos.error || "Error registrando usuario");
    }

    return datos;
}


// definimos el evento del botón submit del formulario.



// 3️⃣ evento del formulario

form.addEventListener("submit", async (event)=>{

    event.preventDefault();
    
    const usuario = {
        nombre: inputNombre.value,
        apellidos: inputApellidos.value,
        direccion: inputDireccion.value,
        poblacion: selectPoblacion.value,
        codigoPostal: inputCP.value,
        telefono: inputTelefono.value,
        correo: inputCorreo.value,
        usuario: inputUser.value,
        password: inputPass.value
};

    try{

        await registrarUsuario(usuario);

        alert("Usuario registrado correctamente");

        window.location.href = "login.html";

    }
    catch(error){

        alert(error.message);
        console.error(error);

    }

});