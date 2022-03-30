import express, { Application } from 'express'
import cors from 'cors'
import path from 'path'
import Accept from '@hapi/accept'
import secretRoutes from './routes/secrets.routes'
import config from './config'
import './database'

const app: Application = express()

app.set('port', config.PORT)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname, "../build")))

app.use((req, res, next) => {
    const mediaType = Accept.mediaType(req.headers['accept'], ['application/json', 'application/xml'])

    if (mediaType === 'application/xml') res.setHeader('Content-Type', 'application/xml')
    else if (mediaType === 'application/json') res.setHeader('Content-Type', 'application/json')
    else res.setHeader('Content-Type', 'application/json')

    next()
})

app.use(secretRoutes)

app.get('/*', function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

export default app