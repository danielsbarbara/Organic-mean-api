import { Request, Response } from "express"
import dotenv from 'dotenv'
import express from 'express'
import { FilterProducts } from "./database/crud"
const app = express()
dotenv.config()

app.use(express.json())

const port: string = process.env.PORT!


//endpoint de todos os produtos
// app.get('/api/v1/allproducts', async (req: Request, res: Response) => {

//     try{
//         //pegar todos os productos da base de dados
//         const result = await GetAllProducts()
    
//         //Se o array vier com elementos retornar o array
//         if(result.length > 0) return res.status(200).json({result: result})
    
//         //Se não retorna badrequest
//         return res.status(404).json({result: 'No products found.'})

//     } catch (error) {
//         return res.status(400).json({result: 'Bad request'})
//     }
// })

app.post('/api/v1/filter', async (req: Request, res: Response) => {
    const {category, collection} = req.body
    try {
        const result = await FilterProducts(category, collection)
        res.status(200).json({result: result})
    } catch (error) {
        res.status(400).json({result: 'Error'})
    }
})

app.listen(port, () => console.log(`⚡️ Connected on http://localhost:${port} ⚡️`))