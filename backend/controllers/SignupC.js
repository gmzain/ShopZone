import { Signup } from "../models/signup.js"
import jwt  from 'jsonwebtoken'

export const registerUser = async(req , res)=>{
    const {name , email , phone , address , password} = req.body

    if(!name || !email || !phone || !password || !address){
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const checkUser = await Signup.findOne({
        $or : [{email} , {phone}]
    })

    if(checkUser){
        res.status(401)
        throw new Error('Please Enter valid Email or password')
    }

    const newUser = await Signup.create({
        name , email , phone , address , password
    })
    res.send({name , email , phone , address , password , token : userToken(newUser._id)})

}

export const login = async(req , res)=>{
    const {email , password} = req.body
    
    let checkUser = await Signup.findOne({email})
    if(!checkUser){
        res.status(401)
        throw new Error('please enter valid email or password')
    }

    if(checkUser.password != password){
        res.status(401)
        throw new Error('please enter Vlaid Password')
    }

    if(checkUser.password == password){
        return res.status(200).json({
            message: "Login Successfully",
            token : userToken(checkUser._id)
        });
    }
}

export const userToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : '15d'
    })
}