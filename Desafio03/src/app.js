import express from 'express'
import fs from 'fs/promises'
import ProductManager from './ProductManager.js'

const app = express()

async function parseFile() {
    const products = await fs.readFile( './src/products.json', 'utf-8')
    return JSON.parse(products);
}

app.get("/products", async (req, res) => {
    
    const queryLimit = req.query.limit

    if (!isNaN(queryLimit) && queryLimit >= 0){
        const productsJSON = parseFile();
        let productsLimit = [];
       
        for (let i = 0 ; i<queryLimit ; i++ ){
            productsLimit[i] = productsJSON[i];
        }
        res.json(productsLimit);
    } else {
        const productsJSON = await parseFile();
        res.json(productsJSON);
    }
})

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const productsJSON = await parseFile();
    if (!isNaN(id) && id >= 0){
        if(id > productsJSON.length){
            res.json({error: "El producto no existe"});
        } else {
            res.json(productsJSON[id-1]);
        }
    } else {
        res.json({error: "El id debe ser un numero entero"})
    }
})

app.listen(8080)