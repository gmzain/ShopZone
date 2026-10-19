import express from 'express'
import { addProduct, delProduct, detailPro, editProduct, getByCategory, getProducs } from '../controllers/productC.js'

export const productRouter = express.Router()

productRouter.post('/add-product' ,  addProduct)
productRouter.get('/get-product' , getProducs)
productRouter.get('/get-category/:category' , getByCategory)
productRouter.get('/get-detail/:id' , detailPro)
productRouter.delete('/del-product/:id' , delProduct)
productRouter.put('/edit-product/:id' , editProduct)