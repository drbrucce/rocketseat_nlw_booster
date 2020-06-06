import express from 'express'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'
import PointItemsController from './controllers/PointItemsController'


const pointsController = new PointsController()
const itemsController = new ItemsController()
const pointItemsController = new PointItemsController()

const routes = express.Router()


routes.get('/', (req, res)=>{
    return res.status(200).json({'message':"Server on"})
})

routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.get('/pointItems',pointItemsController.index)



export default routes