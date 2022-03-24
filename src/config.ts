import dotenv from 'dotenv'
dotenv.config()


export default {
    MONGO_DATABASE : process.env.MONGO_DATABASE || 'secret-db',
    MONGO_USER : process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD : process.env.MONGO_PASSWORD || '12341234',
    PORT : process.env.PORT || 3000
}