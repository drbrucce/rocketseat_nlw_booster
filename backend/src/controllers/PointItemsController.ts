import { Request, Response } from 'express'
import knex from '../database/connection'

class PointItemsController{
    async index(req: Request, res: Response){
        const pointItems = await knex('point_items').select('*')

        return res.json(pointItems)
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

export default PointItemsController