export const middleErr = (err , req , res , next)=>{
    res.send(err.message)
}