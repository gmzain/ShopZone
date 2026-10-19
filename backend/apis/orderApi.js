import express from 'express'
import { delOrder, getOrder, userOrder } from '../controllers/orderC.js'

export const orderRouter = express.Router()

orderRouter.post('/user-order/:id' , userOrder)
orderRouter.get('/get-order' , getOrder)
orderRouter.delete('/del-order/:id' , delOrder)