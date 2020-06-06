import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController{
    async index(req: Request, res: Response){
        const { city, uf, items } = req.query

        const parsedItems = String(items).split(',').map(item=> Number(item.trim()))

        const query = knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')

        if(city && city != undefined)
            query.where('points.city', String(city))

        if(uf  && uf != undefined)
            query.where('points.uf', String(uf))
        
        if(items  && items != undefined)
            query.whereIn('item_id', parsedItems)
            
        query.distinct()
            .select('points.*')
            
        await query
            .then(point=>res.json(point))
            .catch(err => res.status(400).json({message:err}))

    }
    async show(req: Request, res: Response){
        const { id } = req.params

        const point = await knex('points').where('id', id).first()

        if (!point)
            return res.status(400).json({message:'Point not found.'})
        
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('title')

        return res.json({...point, items})
        
        

    }
    async create(req: Request, res: Response){
        const { 
            image, 
            name, 
            email,
            whatsapp, 
            latitude, 
            longitude, 
            address, 
            number, 
            zipcode, 
            city, 
            uf,
            items
        } = req.body
    
    
        const trx = await knex.transaction()
    
        const newIds = await trx('points').insert({
            image, 
            name, 
            email,
            whatsapp, 
            latitude, 
            longitude, 
            address, 
            number, 
            zipcode, 
            city, 
            uf
        })
    
        const point_id = newIds[0]
    
        const pointItems = items.map((item_id: number)=>{
            return {
                point_id,
                item_id
            }
        })
    
        await trx('point_items')
            .insert(pointItems)
            .then(trx.commit)
            .catch(trx.rollback);
    
        return res.json({message:'success'})
    }
    async update(req: Request, res: Response){
        
    }
    async delete(req: Request, res: Response){
        
    }
}

export default PointsController