import fs from 'fs/promises'

let counter = 0
let loadSuccess = true

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        const map = new Map([[title], [description], [price], [thumbnail], [code], [stock]])
        if (map.has("") || map.has(0)) {
            console.log("Todos los campos son obligatorios, creación de producto fallida");
        } else {
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code
            this.stock = stock
            console.log("Se creo el producto");
        }
    }
}

class ProductManager {

    constructor(path) {
        this.path = path
        this.products = []
    }

    async cargar() {
        let start,file, prod = null
        loadSuccess
            ? (
                start = await fs.writeFile(this.path, '[]',(err)=>{
                    if(err) throw err;
                    console.log('El archivo se guardo satifactoriamente')
                }),
                file = await fs.readFile(this.path,'utf-8'),
                prod = JSON.parse(file),
                prod.forEach(element => {
                    counter++
                    element.id = counter
                    this.products.push(element)
                },
                    loadSuccess = false)
            )
            : ''
    }

    async getProducts() {
        await this.cargar()
        console.log("Lista de productos")
        return console.log(this.products)
    }

    async addProduct(product) {
        await this.cargar()
        let json = null;
        if (Object.entries(product).length === 0) {
            console.log('No se añadio el producto, verificar propiedades\n\n');
        } else {
            const codeRepeated = this.products.some((prod) => prod.code === product.code)
            codeRepeated
                ? console.log('El codigo ' + product.code + ' esta repetido, no se añadio el producto\n\n')
                : (
                    counter++,
                    product.id = counter,
                    this.products.push(product),
                    json = JSON.stringify(this.products, null, 4),
                    await fs.writeFile(this.path, json),
                    console.log('Producto añadido\n')
                )
        }
    }

    async getProductById(id) {
        await this.cargar()
        console.log('\nBuscando el producto con id ' + id + '\n');
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? console.log(this.products.find((prod) => prod.id === id))
            : console.log('--- Not found ---\n\n')
    }

    async updateProduct(id, campo, data) {
        await this.cargar()
        let json, i = null;
        const modificar = (i, campo, data) => {
            for(const property in this.products[i]){
                if(property === campo){
                    this.products[i][property] = data
                }
            }
        }
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? (console.log('Modificando el ' + campo + ' del producto con el id ' + id),
                i = this.products.findIndex((prod) => prod.id === id),
                modificar(i, campo, data),
                json = JSON.stringify(this.products, null, 4),
                await fs.writeFile(this.path, json))
            : console.log('--- Not found ---\n\n')

    }

    async deleteProduct(id) {
        await this.cargar()
        let json, i = null
        const idFinded = this.products.some((prod) => prod.id === id)
        idFinded
            ? (
                i = this.products.findIndex((prod) => prod.id === id),
                this.products.splice(i, 1),
                json = JSON.stringify(this.products, null, 4),
                await fs.writeFile(this.path, json),
                console.log('Producto con id: ' + id + ' eliminado')
            )
            : console.log('--- Not found ---\n\n')
    }

}

const manager = new ProductManager("archivos de entrada/prueba.txt")
await manager.getProducts()
await manager.addProduct(new Product("producto1", "description1", 11, "thumbnail1", 11, 1))
await manager.addProduct(new Product("producto2", "description2", 21, "thumbnail2", 21, 2))
await manager.addProduct(new Product("producto3", "description3", 31, "thumbnail3", 31, 3))
await manager.getProducts()
await manager.updateProduct(2, 'description', 'Descripcion modificada 2')
await manager.updateProduct(3, 'stock', 56)
await manager.getProducts()
await manager.deleteProduct(2)
await manager.getProducts()
manager.getProductById(3)