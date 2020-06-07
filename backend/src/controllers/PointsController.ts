import { Request, Response } from 'express'
import knex from '../database/connection'
import config from '../configs/config'
import { celebrate } from 'celebrate'
import Joi from '@hapi/joi'

class PointsController{
    validation (){
        return celebrate({
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.number().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                address: Joi.string().required(),
                number: Joi.number().required(),
                zipcode: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                items: Joi.string().required(),
            })
        }, { abortEarly:false})
    }

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
            .then(point=>{
                
                const serializedPoint = point.map(item=>{
                    return { 
                        ...item,
                        image: `http://${config.server}:${config.port}/${config.staticFiles}/${item.image}`
                    }
                })
                res.json(serializedPoint)
            })
            .catch(err => res.status(400).json({message:err}))

    }
    async show(req: Request, res: Response){
        const { id } = req.params

        const point = await knex('points').where('id', id).first()

        if (!point)
            return res.status(400).json({message:'Point not found.'})
        
        const serializedPoint = {
               ...point,
                image: `http://${config.server}:${config.port}/${config.staticFiles}/${point.image}`
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('title')

        return res.json({...serializedPoint, items})
        
        

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
            image: req.file.filename, 
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
    
        const pointItems = items
            .split(',')
            .map((item:String) => item.trim())
            .map((item_id: number)=>{
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