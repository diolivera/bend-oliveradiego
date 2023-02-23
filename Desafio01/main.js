class ProductManager {

    constructor() {
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, stock) {

        if (title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && stock !== undefined) {
            const product = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                code: Math.round(Math.random()*100000),
            }

            this.products.push(product)
        } else {
            console.log("Los campos no pueden estar vacios");
        };

    }
    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productFind = this.products.find((product) => product.code === id)
        if (productFind === undefined) {
            console.log("Not found");
        } else {

            return productFind
        }
    }
}

const productManager = new ProductManager();

const prod1 = productManager.addProduct( "Camiseta", "Camiseta de algodon", 5000, "https://google.com.ar",  10,);
const prod2 = productManager.addProduct("Pantalon", "descripcion prod 2", 3000, "url imagen", 15);
const prod3 = productManager.addProduct("Botines", "descripcion prod 3", 4000, "url imagen", 5);


console.log(productManager.getProducts());

console.log("producto filtrado por ID",productManager.getProductById(41913));