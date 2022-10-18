const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.productos = this.leerDatos()
    }

    //leer los datos del .txt
    leerDatos() {
        const data = JSON.parse(fs.readFileSync(`./${this.nombreArchivo}`, 'utf-8'))
        return data;
    }

    //escribir los datos en el .txt
    escribirDatos(datos) {
        fs.writeFileSync(`./${this.nombreArchivo}`, JSON.stringify(datos ,null, 2))
    }

    //mostrar todos los datos
    async getAll() {
        try {
            const data = await this.leerDatos()
            console.log(data)
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    //eliminar porducto por id
    async deleteById(id) {
        try {
            const data =  await this.getAll()
            let itemToDelete = data.filter((item)=> item.id !== id)
            this.escribirDatos(itemToDelete)
        } catch (e) {
            console.log(e);
        }
    }

    //elimiar todo los productos y dejar un obj vacio []
    async deleteAll() {
        try {
            await this.getAll()
            this.productos = []
            this.escribirDatos(this.productos)
        } catch (e) {
            console.log(e);
        }
    }


    //mostrar productos por id
    async getById(id) {
        try{
        const data = await this.getAll()
        let itemToFind = data.find((item)=> item.id === id)
        console.log(itemToFind ? itemToFind : null)
        return  itemToFind ? itemToFind : null
        
        } catch(e){
            console.log(e)
        }
    }
    

    //crear un productos nuevo y agregarle un id 
    async save(produc){
        try{
            this.productos = await this.getAll()
            produc.id = await this.generarId()
            this.productos.push(produc)
            this.escribirDatos(this.productos)
            return produc.id

        }catch(e){
            console.log(e)
        }
    }

    // generar un id el cual es un numero mas del id mas alto de los productos si no hay productos asigna 1
    async generarId(){
        const data = await this.getAll();
        if(data.length === 0){
            let id = 1
            return id
        }
        let id = data.map((produc)=> produc.id)
        return Math.max(...id) + 1
    }
    
} 

const productos = new Contenedor('products.txt')

//productos.deleteById(11)

//productos.getAll()

//productos.deleteAll()

//productos.getById(3)

//productos.save({ "title": "title","price": 4000, "thumbnail": "url de la foto del productos"})

//productos.generarId()