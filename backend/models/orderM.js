import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    size : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        min : 1
    },
    name : {
        type : String,
        required : true
    },
    province : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    label : {
        type : String,
        required : true
    },
    subtotal : {
        type : Number,
        required : true
    },
    paymentmethod : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

export const Order = mongoose.model('Order' , orderSchema)