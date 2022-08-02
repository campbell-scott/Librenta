function totalStock() {
    return libros.map(d => d['Stock']).reduce((a, v) => a + v, 0);
}

let libros = [
    {ISBN: 9786075276915, Titulo: "Las 48 Leyes Del Poder", Stock: 100},
    {ISBN: 9789878000473, Titulo: "Saga Completa Harry Potter", Stock: 50},
    {ISBN: 9789508523150, Titulo: "Cómo Hacer Que Te Pasen Cosas Buenas", Stock: 75},
    {ISBN: 9789502812441, Titulo: "El Club De Las 5 De La Mañana", Stock: 36},
    {ISBN: 9789874433428, Titulo: "De Comerciante a Empresario", Stock: 20},
]

let titulo = document.getElementById('titulo')
let isbn = document.getElementById('isbn')
let stock = document.getElementById('stock')
let input1 = document.getElementById('input1')
let input2 = document.getElementById('input2')
let input3 = document.getElementById('input3')
let boton = document.getElementById('boton')
boton.addEventListener('click', agregarLibro)

function agregarLibro() {
    let nombrePantalla = document.createElement('p')
    nombrePantalla.innerHTML = input1.value
    titulo.append(nombrePantalla)
    let codigoPantalla = document.createElement('p')
    codigoPantalla.innerHTML = input2.value
    isbn.append(codigoPantalla)
    let cantidadPantalla = document.createElement('p')
    cantidadPantalla.innerHTML = input3.value
    stock.append(cantidadPantalla)
    let Titulo = input1.value
    let ISBN = parseInt(input2.value)
    let Stock = parseInt(input3.value)
    libros.push({ISBN, Titulo, Stock})
    console.log(libros)
}

let compra = document.getElementById('compra')
let cargar = document.getElementById('cargar')
cargar.addEventListener('click', dispararCompra)

function dispararCompra() {
    for (let i = 0; i < libros.length; i++) {
        let ventas = parseInt(prompt("Ingrese las ventas de un mes de "+libros[i].Titulo))
    if ((ventas*1.5)<=(libros[i].Stock)) {
        let compraPantalla = document.createElement('p')
        compraPantalla.innerHTML = "De el libro "+libros[i].Titulo+" tiene que pedir 0 ejemplares"
        compra.append(compraPantalla)
    }
    else {
        let compraPantalla = document.createElement('p')
        compraPantalla.innerHTML = "De el libro "+libros[i].Titulo+" tiene que pedir "+Math.ceil(((ventas*1.5)-libros[i].Stock))+" ejemplares"
        compra.append(compraPantalla)
    }
    }
}