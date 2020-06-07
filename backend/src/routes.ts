import express from 'express'
import multer from 'multer'
import multerConfig from './configs/multer'


import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'
import PointItemsController from './controllers/PointItemsController'



const pointsController = new PointsController()
const itemsController = new ItemsController()
const pointItemsController = new PointItemsController()

const routes = express.Router()
const upload = multer(multerConfig)


routes.get('/', (req, res)=>{
    return res.status(200).json({'message':"Server on"})
})

routes.get('/items', itemsController.index)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)

routes.post('/points', 
    upload.single('image'), 
    pointsController.validation(),
    pointsController.create)

routes.get('/pointItems',pointItemsController.index)



export default routes