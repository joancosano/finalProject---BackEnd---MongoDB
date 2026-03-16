import {recuperarUsuario} from "./utils.js";
import {createHeader,createFooter} from "./utils.js";


const paramsUrl = new URLSearchParams(window.location.search);

const usuarioActivo = paramsUrl.get("usuario");
const usuario = recuperarUsuario(usuarioActivo);

// id de la lista
const idDesdeUrl = paramsUrl.get("id");
const idSesion = sessionStorage.getItem("idUltimaLista");

const idLista = idDesdeUrl ?? idSesion;

const main = document.querySelector("main");

////////////////// Header y Footer ///////////////////////////////

const header = createHeader(usuario);
const footer = createFooter();


async function cargarLista(id){
    console.log("ID lista:", id);

    const respuesta = await fetch(`http://localhost:3000/api/listas/lista/${id}`);
    console.log("ID:", id);

    if(!respuesta.ok){
        throw new Error("Error cargando lista");
    }

    return await respuesta.json();
}

async function init(){

try{

if(!idLista){
    main.innerHTML = "<p>No hay ninguna lista disponible.</p>";
    return;
}

const lista = await cargarLista(idLista);

const fecha = lista.fecha;
const productosComprados = lista.productos;






//Creamos una taba para mostrar los productos en el DOM
const contenedorLista = document.createElement("table");
const contenedorListaCompleta = document.createElement("div");
contenedorListaCompleta.classList.add("contenedor-lista");

//--------------Cabecera de la lista------------

let cabecera = document.createElement("thead");
let filaCabecera = document.createElement("tr");

let cabeceraProducto = document.createElement("th");
cabeceraProducto.textContent = "Productos";

let cabeceraCantidad = document.createElement("th");
cabeceraCantidad.textContent = "Cantidad";

filaCabecera.appendChild(cabeceraProducto);
filaCabecera.appendChild(cabeceraCantidad);

cabecera.appendChild(filaCabecera);

contenedorLista.appendChild(cabecera);

//------------fecha de la lista------------

let tituloFecha = document.createElement("h2");
tituloFecha.textContent = `Lista del día ${fecha}`;

contenedorListaCompleta.appendChild(tituloFecha);
contenedorListaCompleta.appendChild(contenedorLista)

//--------------Productos------------

let tablebody = document.createElement("tbody")
contenedorLista.appendChild(tablebody);

// iteramos los productos para incluirlos en la tabla

productosComprados.forEach(([producto,cantidad]) => {
    
    let filaProducto = document.createElement("tr");
    
    let celdaProducto = document.createElement("td");
    celdaProducto.textContent =`${producto}`;
    
    let celdaCantidad= document.createElement("td");
    celdaCantidad.textContent =`${cantidad}`;
    
    filaProducto.appendChild(celdaProducto);
    filaProducto.appendChild(celdaCantidad);
    
    tablebody.appendChild(filaProducto);

})
main.appendChild(contenedorListaCompleta);
sessionStorage.removeItem("listaRecienGuardada");


}
catch(error){

main.innerHTML = "<p>Error cargando la lista.</p>";
console.error(error);

}


//Creamos botones para volver a productos e ir al historial de listas y como extra un boton de imprimir.

const contenedorBotones = document.createElement("div");
contenedorBotones.classList.add("contenedor-botones");

const botonProductos = document.createElement("button");
botonProductos.textContent = "Productos";

botonProductos.addEventListener("click", ()=>{
window.location.href = `productos.html?usuario=${usuarioActivo}&idLista=${idLista}`;
});

 const botonListas = document.createElement("button");
    botonListas.textContent = "Listas";
    botonListas.addEventListener("click", ()=>{
       window.location.href = `historial.html?usuario=${usuarioActivo}`;
    })

const botonPrint = document.createElement("button");
botonPrint.textContent = "Imprimir";
botonPrint.addEventListener("click",()=>{
    window.print();
})

const botonSalir = document.createElement("button");
   botonSalir.textContent = "Salir";
   botonSalir.addEventListener("click", ()=>{
    sessionStorage.removeItem("idUltimaLista");
    window.location.href = `login.html`;
   })

    contenedorBotones.appendChild(botonProductos); 
    contenedorBotones.appendChild(botonListas); 
    contenedorBotones.appendChild(botonPrint);
    contenedorBotones.appendChild(botonSalir);

    
//mostramos los productos dentro de main


//mostramos los botones
main.appendChild(contenedorBotones)

}

init();