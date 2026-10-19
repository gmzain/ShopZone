import jwt from "jsonwebtoken"
import { Signup } from "../models/signup.js"

export const authHandler = async(req , res , next)=>{
    let token = null
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try {
            let token = req.headers.authorization.split(' ')[1]
            let decode = await jwt.verify(token , process.env.JWT_SECRET)
            let myUser = await Signup.findById(decode.id)
            if(!myUser){
                res.status(401)
                throw new Error('User not Found')
            }
            req.user = myUser
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Unauthorize, Invalid Token')
        }
    }else{
        res.status(401)
        throw new Error('Unauthorize, Token not Found')
    }
}