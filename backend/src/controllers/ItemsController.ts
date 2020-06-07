import { Request, Response } from 'express'
import config from '../configs/config'
import knex from '../database/connection'

class ItemsController{
    async index(req: Request, res: Response){
        const items = await knex('items').select('*')

    const serializedItems = items.map(item=>{
        return {
            id: item.id,
            title: item.title, 
            image_url: `http://${config.server}:${config.port}/${config.staticFiles}/${item.image}`
        }
    })
    
    return res.json(serializedItems)
    }
    async show(req: Request, res: Response){
        
    }
    async create(req: Request, res: Response){
        
    }
    async update(req: Request, res: Response){
        
    }
    async delete(req: Request, res: Response){
        
    }
}

export default ItemsController