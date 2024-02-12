import { Request, Response } from "express"
import dotenv from 'dotenv'
import express from 'express'
import { FilterProducts } from "./database/crud"
const cors = require('cors')

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({origin: true, credentials: true}))

const port: string = process.env.PORT!


app.post('/api/v1/products', async (req: Request, res: Response) => {
    const {category, collection} = req.body
    try {
        const result = await FilterProducts(category, collection)
        res.status(200).json({result: result})
    } catch (error) {
        res.status(400).json({result: 'Error'})
    }
})

app.listen(port, () => console.log(`⚡️ Connected on http://localhost:${port} ⚡️`))