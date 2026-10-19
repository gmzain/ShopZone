import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    discount : {
        type : Number,
        min : 0,
        max : 100
    },
    size : [
        {
            sizeNo : {
                type : String,
                required : true
            }
        }
    ],
    color : [
        {
            shoesColor : {
                type : String,
                required : true
            }
        }
    ],
    shoestype : {
        type : String,
        required : true
    },
    material: {
        type : String,
        required : true
    },
    soleMaterial: {
        type : String,
        required : true
    },
    closureType:{
        type : String,
        required : true
    },
    
},{
    timestamps : true
})

export const Product = mongoose.model('Product' , productSchema)