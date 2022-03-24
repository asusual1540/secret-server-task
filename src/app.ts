import express, {Application} from 'express'
import cors from 'cors'
import secretRoutes from './routes/secrets.routes'
import config from "./config"
import "./database"

const app: Application = express()

app.set('port', config.PORT)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(secretRoutes)


export default app