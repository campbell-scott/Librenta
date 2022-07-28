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
console.log("Opciones:")
console.log("1. Ingresar un libro al catalogo")
console.log("2. Crear una orden de compra")
console.log("3. Ver catalogo y stock")
console.log("4. Salir")

let opcion = ""
do{
    opcion = parseInt(prompt("Ingrese una opcion"))
    switch (opcion) {
        case 1:
            //ingresar un libro al catalogo
            let cantLibros = parseInt(prompt("Ingrese la cantidad de libros que quiere agregar"))
            for (let i = 1; i <= cantLibros; i++) {
                let isbn = parseInt(prompt("Ingrese el ISBN del libro"))
                let titulo = prompt("Ingrese el titulo del libro")
                let stock = parseInt(prompt("Ingrese el stock del libro"))
                libros.push({isbn, titulo, stock})
            }
            break;
        case 2:
            //crear una orden de compra
            for (let i = 0; i < libros.length; i++) {
                let ventas = parseInt(prompt("Ingrese las ventas de un mes de "+libros[i].Titulo))
            if ((ventas*1.5)<=(libros[i].Stock)) {
                console.log("De el libro "+libros[i].Titulo+" tiene que pedir 0 ejemplares")
            }
            else {
                console.log("De el libro "+libros[i].Titulo+" tiene que pedir "+((ventas*1.5)-libros[i].Stock)+" ejemplares")
            }
            }
            break;
        case 3:
            //Ver catalogo
            libros.forEach(element => console.log(element))
            console.log("El stock total es: " + totalStock())
            break;
        default:
            break;
    } 
}while (opcion != 4)

console.log("Fin programa")