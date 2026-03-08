import {categorias} from "./datos.js"
import {productos} from "./datos.js"
import {createHeader,createFooter} from "./utils.js"


//Recuperamos los parametros de la url del navegador
const paramsUrl = new URLSearchParams(window.location.search);

//Recuperamos el usuario
const usuarioActivo = paramsUrl.get("usuario");

////////////////// Header y Footer ///////////////////////////////

createHeader(usuarioActivo);
createFooter();

//////////////////// main ////////////////////////////////////////

const body = document.querySelector("body");
const main = document.querySelector("main");

// creamos un conenedor para mostrar  los botones de las categorias

const containerCategorias = document.createElement("div");
containerCategorias.classList.add("container-categorias");

// creamos un conenedor para mostrar los productos

const containerProductos = document.createElement("div");
containerProductos.classList.add("grid-productos");
let categoriaSeleccionada = "default";   


main.appendChild(containerCategorias);
main.appendChild(containerProductos);

let listaCompra = []

////////////////// Funcion mostrar productos /////////////////////////


    function mostrarProductos (){
        
        let filtroProductos = [];
        containerProductos.innerHTML="";

        if (categoriaSeleccionada === "default"){
            filtroProductos = productos
        }else{
            filtroProductos = productos.filter(producto =>{
                return producto.categoria === categoriaSeleccionada;
            })
        }
        
        
        filtroProductos.forEach(producto =>{
            const card = document.createElement("div");
            card.classList.add("card-producto");

            const img = document.createElement("img");
            img.addEventListener("click", ()=> {

            let cantidad = prompt(`Cuantas unidades quieres de ${producto.nombre}:`,1)

               if (cantidad === null){
                    return;
                }

                cantidad = parseInt(cantidad);

                if (cantidad <= 0 || isNaN(cantidad)){
                    alert("Cantidad no valida")
                    return;
                }

                // sumamos cantidad en caso que el usuario añada más cantidad de un producto del que ya habia seleccionado

                let productoExistente = listaCompra.find(p => p[0] === producto.nombre);

                if (productoExistente){
                    productoExistente[1] += cantidad
                }else{
                    listaCompra.push([producto.nombre, cantidad])
                }

                console.log(listaCompra)
            })

           
            img.src = `../img/${producto.imagen}`;
            img.alt = producto.nombre;

            const nombreProducto = document.createElement("div");
            nombreProducto.textContent = producto.nombre;
            nombreProducto.classList.add("nombre-producto");

            card.appendChild(nombreProducto);
            card.appendChild(img);
            containerProductos.appendChild(card);

            

        })}


//////////////////////// Categorias //////////////////////////////////////////


    categorias.forEach(element => {
    const boton = document.createElement("button");
    boton.textContent = element.nombre;
    containerCategorias.appendChild(boton);
    containerCategorias.classList.add("contenedor-botones");
    boton.addEventListener("click", 
        () => {categoriaSeleccionada = element.id
            mostrarProductos();

        })
    })

////////////////// Botones Guardar Mostrar Listas Salir ///////////////////////////

async function guardarListaAPI(lista){

    const respuesta = await fetch("http://localhost:3000/api/listas",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(lista)
    });

     if(!respuesta.ok){

        const error = await respuesta.text();
        throw new Error(error);

    }

    return await respuesta.json();
}

    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar";
    botonGuardar.addEventListener("click", async () =>{

    if(listaCompra.length === 0){
        alert ("Lista de la compra vacia");
        return;
    }

    const fechaActual = new Date().toLocaleString();

    const lista = {
        usuario: usuarioActivo,
        fecha: fechaActual,
        productos: [...listaCompra]
    };

    try{

        const listaGuardada = await guardarListaAPI(lista);

        sessionStorage.setItem("idUltimaLista", listaGuardada._id);

        alert("Lista guardada correctamente");

        listaCompra = [];
        console.log("Lista reiniciada");

    }
    catch(error){

        console.error(error);
        alert("Error guardando la lista");

    }

});


    const botonMostrar = document.createElement("button");
    botonMostrar.textContent = "Mostrar";
    botonMostrar.addEventListener("click", ()=>{

    const idUltimaLista = sessionStorage.getItem("idUltimaLista");

    if(!idUltimaLista){
        alert("No hay ninguna lista creada en esta sesión");
        return;
    }

    window.location.href =
        `lista.html?usuario=${usuarioActivo}&id=${idUltimaLista}`;

});

const botonListas = document.createElement("button");
botonListas.textContent = "Listas";

botonListas.addEventListener("click", ()=>{
   window.location.href = `historial.html?usuario=${usuarioActivo}`;
});
    
    const botonSalir = document.createElement("button");
    botonSalir.textContent = "Salir";
    botonSalir.addEventListener("click", ()=>{
    sessionStorage.removeItem("idUltimaLista");
    window.location.href = `login.html`;

    })


// creamos un contenedor para anidar los bótones inferiores

const contenedorBotones = document.createElement("div");
contenedorBotones.classList.add("contenedor-botones");


contenedorBotones.appendChild(botonGuardar);
contenedorBotones.appendChild(botonMostrar);
contenedorBotones.appendChild(botonListas);
contenedorBotones.appendChild(botonSalir);


// los anidamos a main

main.appendChild(contenedorBotones);

// ejecutamos a la funcion mostrarProductos al abrir la página para que se muestren todos los productos

mostrarProductos();
    
