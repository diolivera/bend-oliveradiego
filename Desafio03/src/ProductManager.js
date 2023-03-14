import fs from 'fs/promises'

class ProductManager {
    constructor(path) {
        
        this.id = 0;
        this.path = path
        this.products = [];
    }

    async loadProducts(){
        const json = await fs.readFile(this.path, 'utf-8');
        
        if (!json) {
            await this.saveProducts();
        } else {
            const products = JSON.parse(json);
            if (products.length > 0){
                this.products = products;
                this.id = this.products[this.products.length - 1].id;
            }
        }    
    }

    
    async saveProducts(){
        const json = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, json)
    }

    async addProduct(title, description, price, thumbail, code, stock){
        
        await this.loadProducts();
        
        if (title && description && price && thumbail && code && stock){
            const existCode = this.products.some(product => product.code === code)
            if (existCode){
                throw new Error("Code ya existe");
            } else {
                
                this.products.push({ id: ++this.id, title, description, price, thumbail, code, stock});
                await this.saveProducts(); 
            }
        } else {
            throw new Error("Faltan campos");
        }  
    }

    async getProducts(){
        await this.loadProducts();
        console.log(this.products)
    }

    async getProductById(id){
        await this.loadProducts();
        const indexID = this.products.find(product => product.id == id);
        if (indexID){
            console.log("El producto con el id es: ", indexID);
        } else {
            throw new Error("Not Found")
        }
    }

    async updateProduct(id, data){
        await this.loadProducts();
        const indexID = this.products.findIndex(product => product.id === id);
        if (indexID !== -1){
            this.products[indexID] = {
                ...this.products[indexID],
                ...data
            }
            await this.saveProducts();
        } else {
            throw new Error("Not Found")
        }
    }

    async deleteProduct(id){
        await this.loadProducts();
        const existID = this.products.findIndex(product => product.id === id);
        if (existID !== -1){
            this.products.splice(existID, 1)
            await this.saveProducts()
        } else {
            throw new Error("Not Found")
        }
    }
} 

const products = new ProductManager("./products.txt");

export default ProductManager;