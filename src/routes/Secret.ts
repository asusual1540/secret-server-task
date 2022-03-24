import { Schema, model } from 'mongoose'

const secretSchema = new Schema ({
    hash : {
        type: String,
        required: true,
        trim: true
    },
    secretText: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: String,
        required: true,
        trim: true
    },
    expiresAt : {
        type: String,
        required: true,
        trim: true
    }
})

export default model('Secret', secretSchema)