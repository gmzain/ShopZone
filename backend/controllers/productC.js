import { Product } from "../models/productM.js"

export const addProduct = async(req , res)=>{
    const {image , name , description , category , price , discount , size , color,  shoestype , material , soleMaterial , closureType} = req.body
    const io = req.app.get('io')

    if(!name || !image || !description || !category || !size || !color|| !price || !shoestype || !material || !soleMaterial || !closureType  ){
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const proPrice = Number(price) - (Number(price) * Number(discount || 0)) / 100

    const newProduct = await Product.create({
        image , name , description , category , discount , size , color , price : proPrice , shoestype , material , soleMaterial , closureType
    })
    io.emit('newProduct' , newProduct)
    res.send(newProduct)
}

export const getProducs = async(req , res)=>{
    const allproducts = await Product.find()
    res.send(allproducts)
}


export const detailPro = async(req , res)=>{
    const {id} = req.params
    const productDetail = await Product.findById(id)
    if(!productDetail){
        res.status(404)
        throw new Error('Product not found')
    }
    res.send(productDetail)
}

export const getByCategory = async(req , res)=>{
    const {category} = req.params
    const findCategory = await Product.find({category})
    if(findCategory.length == 0){
        res.status(404)
        throw new Error('category not Found')
    }
    res.send(findCategory)
}

export const delProduct = async(req , res)=>{
    const {id} = req.params
    const io = req.app.get('io')
    const delpro = await Product.findByIdAndDelete(id)
    if(!delpro){
        res.status(404)
        throw new Error('Product not Found')
    }
    io.emit('del-pro' , delpro)
    res.send(delpro)
}

export const editProduct = async(req , res)=>{
    const {id} = req.params
    const {image , name , description , category , price , discount , size , color,  shoestype , material , soleMaterial , closureType} = req.body

    const proPrice = Number(price) - (Number(price) * Number(discount || 0)) / 100

    const editPro = await Product.findByIdAndUpdate(
        id,
        {image , name , description , category , price : proPrice, discount , color , size ,  shoestype , material , soleMaterial , closureType},
        {new : true , runValidators : true}
    )
    if(!editPro){
        res.status(404)
        throw new Error('Product not Found')
    }
    res.send(editPro)
}

