//////////////////////////////////////////////////////////////////////////////////////////// INDEX

//USANDO JSON CON LS
// let catalogoJSON = JSON.stringify(catalogo)
// localStorage.setItem("catalogo", catalogoJSON)
// let libros = JSON.parse(localStorage.getItem('catalogo'))

//USANDO LOCAL STORAGE
// let nombreUsuario = prompt("Ingrese su nombre")
// localStorage.setItem("nombre", nombreUsuario)
// let usuario = localStorage.getItem("nombre")
// alert("Bienvenido "+usuario)
//INGRESO
let id = Math.ceil(100000000 + Math.random() * 900000000);
let nombre = document.getElementById('nombre')
let apellido = document.getElementById('apellido')
let email = document.getElementById('email')
let contra = document.getElementById('contra')
let confirContra = document.getElementById('confirContra')
let registro = document.getElementById('registro')
let ingreso = document.getElementById('ingreso')
let header = document.getElementById('header')
let catalogo = document.getElementById('catalogo')
let usuarioLog = JSON.parse(localStorage.getItem('usuario'))


if (usuarioLog != null) {
    ingreso.style.display = "none";
    header.style.display = "flex";
    catalogo.style.display = "block"
}


registro.addEventListener('click', registrarUsuario)

function registrarUsuario() {
    console.log(nombre.value)
    console.log(apellido.value)
    console.log(email.value)
    if (nombre.value === "", apellido.value === "", email.value === "") {
        Toastify({
            text: "Complete todos los campos",
            className: "info",
            style: {
            background: "linear-gradient(to right, #4887be, #3284cb)",
            }
        }).showToast();
    } else {
        if (contra === "" && confirContra === "") {
        Toastify({
            text: "Ingrese contraseña",
            className: "info",
            style: {
            background: "linear-gradient(to right, #4887be, #3284cb)",
            }
        }).showToast(); 
        } else if (contra.value === confirContra.value) {
            ingreso.style.display = "none";
            header.style.display = "flex";
            catalogo.style.display = "block";
            let usuario = JSON.stringify({id: id, nombre: nombre.value, apellido: apellido.value, email: email.value})
            localStorage.setItem("usuario", usuario)
        } else {
            Toastify({
                text: "Confirmacion de contraseña incorrecta",
                className: "info",
                style: {
                background: "linear-gradient(to right, #4887be, #3284cb)",
                }
            }).showToast();
        }
    }
}   

let catalogoBoton = document.getElementById('catalogoBoton')
let administrarBoton = document.getElementById('administrarBoton')

let administrar = document.getElementById('administrar')

catalogoBoton.addEventListener('click', mostrarCata)
administrarBoton.addEventListener('click', mostrarAdmin)

function mostrarCata() {
    if (catalogo.style.display = "none") {
        administrar.style.display = "none";
        catalogo.style.display = "block"
    }
}
function mostrarAdmin() {
    if (administrar.style.display = "none") {
        catalogo.style.display = "none";
        administrar.style.display = "block"
    }
}

fetch('./catalogo.json')
  .then((response) => response.json())
  .then((libros) => {
    //IMPRIMIR CATALOGO GRANDE
    let  catalogoGrande = document.getElementById('catalogoGrande')

    function actualizarCatalogoGrande() {
        for (let i = 0; i < libros.length; i++) {
            let tbody = document.createElement('tbody')
            
            tbody.innerHTML = `
            <td class="librosTitulo">${libros[i].Titulo}</td>
            <td>${libros[i].ISBN}</td>
            <td>${libros[i].Proveedor}</td>
            <td>${libros[i].Stock}</td>
            <td><img class="imgCatalogo" src="./imagenes/libro${[i]}.png"></td>
            `
            catalogoGrande.append(tbody)   
        }
    }
    //IMPRIMIR CATALOGO CHICO
    let titulo = document.getElementById('titulo')
    let isbn = document.getElementById('isbn')
    let stock = document.getElementById('stock')
    let ventas = document.getElementById('ventas')

    function actualizarCatalogo() {
        titulo.innerHTML = ''
        isbn.innerHTML = ''
        stock.innerHTML = ''
        ventas.innerHTML = ''
        for (let i = 0; i < libros.length; i++) {
            let nombrePantalla = document.createElement('p')
            nombrePantalla.innerHTML = libros[i].Titulo
            titulo.append(nombrePantalla)
            let codigoPantalla = document.createElement('p')
            codigoPantalla.innerHTML = libros[i].ISBN
            isbn.append(codigoPantalla)
            let cantidadPantalla = document.createElement('p')
            cantidadPantalla.innerHTML = libros[i].Stock
            stock.append(cantidadPantalla)
            let inputVentas = document.createElement('div')
            inputVentas.innerHTML = `
            <input type="number" id="ventaLibro${[i]}" placeholder="Ingrese ventas">
            `
            ventas.append(inputVentas)
        }
        actualizarCatalogoGrande()
    }
    actualizarCatalogo()

    //IMPRIMIR STOCK TOTAL
    let totalStock = document.getElementById('totalStock')

    function sumarStock() {
        totalStock.innerHTML = ''
        let stockTotal = libros.map(d => d['Stock']).reduce((a, v) => a + v, 0);
        totalStock.innerHTML = stockTotal
    }
    sumarStock()

    //AGREGAR UN LIBRO AL CATALOGO
    let input1 = document.getElementById('input1')
    let input2 = document.getElementById('input2')
    let input3 = document.getElementById('input3')
    let boton = document.getElementById('boton')
    boton.addEventListener('click', agregarLibro)
    let Titulo = " "
    let ISBN = " "
    let Stock = " "
    function agregarLibro() {
        if (input1.value === "", input2.value === "", input3.value === "") {
            Toastify({
                text: "Complete todos los campos",
                className: "info",
                style: {
                background: "linear-gradient(to right, #4887be, #3284cb)",
                }
            }).showToast();
        } else {
            let Titulo = input1.value
            let ISBN = parseInt(input2.value)
            let Stock = parseInt(input3.value)
            libros.push({ISBN, Titulo, Stock})
            actualizarCatalogo()
            sumarStock()
            input1.value = ''
            input2.value = ''
            input3.value = ''
            Toastify({
                text: "Se agrego el titulo correctamente",
                className: "info",
                style: {
                background: "linear-gradient(to right, #4887be, #3284cb)",
                }
            }).showToast();
        }
    }
    
    //CAMBIAR STOCK
    let busqueda = document.getElementById('buscar')
    let nuevoStock = document.getElementById('nuevoStock')
    let cambiar = document.getElementById('cambiar')
    cambiar.addEventListener('click', cambiarStock)

    function cambiarStock() {
        let buscarTitulo = libros.findIndex(elemento => elemento.Titulo == busqueda.value);
        if (buscarTitulo === -1) {
            let buscarISBN = libros.findIndex(elemento => elemento.ISBN == busqueda.value);
            libros[buscarISBN].Stock = parseInt(nuevoStock.value)
            actualizarCatalogo()
            sumarStock()
            busqueda.value = ''
            nuevoStock.value = ''
        } else {
            libros[buscarTitulo].Stock = parseInt(nuevoStock.value)
            actualizarCatalogo()
            sumarStock()
            busqueda.value = ''
            nuevoStock.value = ''
        }
        Toastify({
            text: "El stock se cambio correctamente",
            className: "info",
            style: {
            background: "linear-gradient(to right, #4887be, #3284cb)",
            }
        }).showToast();
    }

    //CREAR ORDEN DE COMPRA

    let compra = document.getElementById('compra')
    let cargar = document.getElementById('cargar')
    cargar.addEventListener('click', dispararCompra)

    function dispararCompra() {
        compra.innerHTML = ''
        for (let i = 0; i < libros.length; i++) {
            let venta = document.getElementById('ventaLibro'+[i])
        if (venta.value === "" ) {
            Toastify({
                text: "Complete todos los campos de ventas",
                className: "info",
                style: {
                background: "linear-gradient(to right, #4887be, #3284cb)",
                }
            }).showToast();
            break
        }
        else if ((venta.value*1.5)<=(libros[i].Stock)) {
            let compraPantalla = document.createElement('p')
            compraPantalla.className = "textoOrden"
            compraPantalla.innerHTML = libros[i].Titulo +" (" + libros[i].ISBN + ") cantidad: 0"
            compra.append(compraPantalla)
        }
        else {
            let compraPantalla = document.createElement('p')
            compraPantalla.className = "textoOrden"
            compraPantalla.innerHTML = libros[i].Titulo +" (" + libros[i].ISBN + ") cantidad: " + Math.ceil(((venta.value*1.5)-libros[i].Stock))
            compra.append(compraPantalla)
        }
        }
        Toastify({
            text: "Orden de compra realizada",
            className: "info",
            style: {
            background: "linear-gradient(to right, #4887be, #3284cb)",
            }
        }).showToast();
    }
})