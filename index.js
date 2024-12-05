import express from 'express'
import controller from './src/Controller/index.js'

const port= process.env.PORT||8000
const app = express()

app.use(express.json())
app.use(controller)

app.listen(port,()=>console.log(`Server listening in port: ${port}`))




// app.get('/',(req,res)=>{
//     res.send("<h1>Hello, buddy, welcome to Express</h1>")
// })

// app.get('/home',(req,res)=>{
//     res.send({
//         status:200,
//         message: "Welcome to Home Page"
// })
// })