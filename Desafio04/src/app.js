import express from 'express'

import { productsRouter } from './Routers/productsRouter.js'
import { cartsRouter } from './Routers/cartsRouter.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products",productsRouter)

app.use("/api/carts",cartsRouter)


const server = app.listen(8080)