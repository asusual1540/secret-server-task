import express, { Application } from 'express'
import cors from 'cors'
import Accept from '@hapi/accept'
import secretRoutes from './routes/secrets.routes'
import config from './config'
import './database'

const app: Application = express()

app.set('port', config.PORT)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use((req, res, next) => {
    const mediaType = Accept.mediaType(req.headers['accept'], ['application/json', 'application/xml'])

    if (mediaType === 'application/xml') res.setHeader('Content-Type', 'application/xml')
    else if (mediaType === 'application/json') res.setHeader('Content-Type', 'application/json')
    else res.setHeader('Content-Type', 'application/json')

    next()
})

app.use(secretRoutes)


export default app