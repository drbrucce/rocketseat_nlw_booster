import express from 'express'
import path from 'path'
import config from './config'
import routes from './routes'
import cors from 'cors'

//-- Server Definitions
const server = express()

//-- Middlewares
server.use(cors())
server.use(express.json())
server.use(routes)

//-- Arquivos Estáticos
server.use(`/${config.staticFiles}`, express.static(path.resolve(__dirname, '..', config.staticFiles)))


server.listen(config.port, config.server, ()=>{
    console.log(`Server on http://${config.server}:${config.port}`)
})