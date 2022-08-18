//////////////////////////////////////////////////////////////////////////////////////////// INDEX

let catalogo = [
    {ISBN: 9786075276915, Titulo: "Las 48 Leyes Del Poder", Stock: 186},
    {ISBN: 9789878000473, Titulo: "Saga Completa Harry Potter", Stock: 106},
    {ISBN: 9789508523150, Titulo: "Cómo Hacer Que Te Pasen Cosas Buenas", Stock: 74},
    {ISBN: 9789502812441, Titulo: "El Club De Las 5 De La Mañana", Stock: 188},
    {ISBN: 9789874433428, Titulo: "De Comerciante a Empresario", Stock: 22},
]

//USANDO JSON CON LS
let catalogoJSON = JSON.stringify(catalogo)
localStorage.setItem("catalogo", catalogoJSON)
let libros = JSON.parse(localStorage.getItem('catalogo'))

//USANDO LOCAL STORAGE
// let nombreUsuario = prompt("Ingrese su nombre")
// localStorage.setItem("nombre", nombreUsuario)
// let usuario = localStorage.getItem("nombre")
// alert("Bienvenido "+usuario)

//IMPRIMIR CATALOGO
let titulo = document.getElementById('titulo')
let isbn = document.getElementById('isbn')
let stock = document.getElementById('stock')
let tabla = document.getElementById('catalogo')

function actualizarCatalogo() {
    titulo.innerHTML = ''
    isbn.innerHTML = ''
    stock.innerHTML = ''
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
    }
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

//CREAR ORDEN DE COMPRA

let compra = document.getElementById('compra')
let cargar = document.getElementById('cargar')
cargar.addEventListener('click', dispararCompra)

function dispararCompra() {
    compra.innerHTML = ''
    for (let i = 0; i < libros.length; i++) {
        let ventas = parseInt(prompt("Ingrese las ventas de un mes de "+libros[i].Titulo)) || 0
    if ((ventas*1.5)<=(libros[i].Stock)) {
        let compraPantalla = document.createElement('p')
        compraPantalla.className = "textoOrden"
        compraPantalla.innerHTML = libros[i].Titulo +" (" + libros[i].ISBN + ") cantidad: 0"
        compra.append(compraPantalla)
    }
    else {
        let compraPantalla = document.createElement('p')
        compraPantalla.className = "textoOrden"
        compraPantalla.innerHTML = libros[i].Titulo +" (" + libros[i].ISBN + ") cantidad: " + Math.ceil(((ventas*1.5)-libros[i].Stock))
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

//////////////////////////////////////////////////////////////////////////////////////////// VENTAS
// let ventas = [
//     {ISBN: 9786075276915, Titulo: "Las 48 Leyes Del Poder", Ventas:{01: 175, 02: 178, 03: 255, 04: 220, 05: 198, 06: 263, 07: 280}},
//     {ISBN: 9789878000473, Titulo: "Saga Completa Harry Potter", Ventas:{01: 38, 02: 41, 03: 81, 04: 105, 05: 77, 06: 70, 07: 138}},
//     {ISBN: 9789508523150, Titulo: "Cómo Hacer Que Te Pasen Cosas Buenas", Ventas:{01: 0, 02: 0, 03: 0, 04: 0, 05: 0, 06: 34, 07: 231}},
//     {ISBN: 9789502812441, Titulo: "El Club De Las 5 De La Mañana", Ventas:{01: 73, 02: 114, 03: 98, 04: 28, 05: 9, 06: 60, 07: 222}},
//     {ISBN: 9789874433428, Titulo: "De Comerciante a Empresario", Ventas:{01: 49, 02: 24, 03: 17, 04: 17, 05: 7, 06: 16, 07: 33}},
// ]

// let tablaVentas = document.getElementById('ventas')


// for (let i = 0; i < ventas.length; i++) {
//     let tbody = document.createElement('tbody')
    
//     tbody.innerHTML = `
//     <td>${ventas[i].Titulo}(${ventas[i].ISBN}) </td>
//     <td>${ventas[i].Ventas[1]}</td>
//     <td>${ventas[i].Ventas[2]}</td>
//     <td>${ventas[i].Ventas[3]}</td>
//     <td>${ventas[i].Ventas[4]}</td>
//     <td>${ventas[i].Ventas[5]}</td>
//     <td>${ventas[i].Ventas[6]}</td>
//     <td>${ventas[i].Ventas[7]}</td>
//     `
//     tablaVentas.append(tbody)
    
// }

// let Titulo = input1.value
// let ISBN = parseInt(input2.value)
// let Stock = parseInt(input3.value)
// libros.push({ISBN, Titulo, Stock})

// let compra = document.getElementById('compra')
// let cargar = document.getElementById('cargar')
// cargar.addEventListener('click', dispararCompra)

// function dispararCompra() {
//     compra.innerHTML = ''
//     for (let i = 0; i < libros.length; i++) {
//         let ventas = parseInt(prompt("Ingrese las ventas de un mes de "+libros[i].Titulo))
//     if ((ventas*1.5)<=(libros[i].Stock)) {
//         let compraPantalla = document.createElement('p')
//         compraPantalla.className = "textoOrden"
//         compraPantalla.innerHTML = libros[i].Titulo +" (" + libros[i].ISBN + ") cantidad: 0"
//         compra.append(compraPantalla)
//     }
//     else {
//         let compraPantalla = document.createElement('p')
//         compraPantalla.className = "textoOrden"
//         compraPantalla.innerHTML = libros[i].Titulo +" (" + libros[i].ISBN + ") cantidad: " + Math.ceil(((ventas*1.5)-libros[i].Stock))
//         compra.append(compraPantalla)
//     }
//     }
// }