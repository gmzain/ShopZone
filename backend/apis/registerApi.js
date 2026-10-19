import express from 'express'
import { login, registerUser } from '../controllers/SignupC.js'

export const registerRouter = express.Router()

registerRouter.post('/signup' , registerUser)
registerRouter.post('/login' , login)