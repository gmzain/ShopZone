import express, { urlencoded , json} from 'express'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import dns from 'dns'
import { connectDB } from './config/connect.js'
import { registerRouter } from './apis/registerApi.js'
import { middleErr } from './middleWare/middleErr.js'
import { productRouter } from './apis/productApi.js'
import { cartRouter } from './apis/cartApi.js'
import { orderRouter } from './apis/orderApi.js'
dns.setServers(['8.8.8.8' , '8.8.4.4']) 
import http from 'http'
import {Server} from 'socket.io'

let app = express()
app.use(cors())
app.use(json())
app.use(urlencoded())

connectDB()

const server = http.createServer(app)

const io = new Server(server , {
    cors : {
         origin: [
            'http://localhost:5173',
            'http://localhost:5174'
        ],
        methods : '*'
    }
})

io.on('connection' , (socket)=>{
    console.log(`socket connected on host: ${socket.id}`)
})

app.set('io' , io)

app.use('/' , registerRouter)
app.use('/' , productRouter)
app.use('/' , cartRouter)
app.use('/' , orderRouter)

app.use(middleErr)


server.listen(5000 , ()=>{
    console.log(`server running on port: ${process.env.PORT.rainbow}`)
})