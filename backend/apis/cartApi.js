import express from 'express'
import { AddToCart, getCart } from '../controllers/cartC.js'
import { authHandler } from '../middleWare/authMiddle.js'

export const cartRouter = express.Router()

cartRouter.post('/add-to-cart/:id' , authHandler , AddToCart)
cartRouter.get('/get-cart' , authHandler , getCart)