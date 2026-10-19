import { Order } from "../models/orderM.js"
import { Product } from "../models/productM.js"

export const userOrder = async(req , res)=>{
    const {id} = req.params
    const socket = req.app.get('io')
    const {size , color  , quantity , name , province , phone , city , address , label  , paymentmethod} = req.body

    if(!size || !color || !quantity || !name || !province || !phone || !city || !address || !label || !paymentmethod){
        res.status(400)
        throw new Error('please fill all the fields')
    }

    let totalAmmount = 0

    const product = await Product.findById(id)
    if(!product){
        res.status(404)
        throw new Error('product not found')    
    }else{
        const ammount = product.price * quantity
        totalAmmount = ammount
    }
    const newOrder = await Order.create({productId : id, size , color  , quantity , name , province , phone , city , address , label  , paymentmethod , subtotal : totalAmmount})
    await newOrder.populate('productId')
    socket.emit('newOrder' , newOrder)
    res.send(newOrder)

}

export const getOrder = async(req , res)=>{
    const orders = await Order.find()
    .populate('productId')
    res.send(orders)
}

export const delOrder = async (req ,res) => {
    const {id} = req.params
    const delorder = await Order.findByIdAndDelete(id)
    res.send(delorder)
}