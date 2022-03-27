import { Schema, model } from 'mongoose'

const secretSchema = new Schema ({
    hash : {
        type: String,
        required: true,
        unique: true
    },
    secretText: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expireAt : {
        type: Date,
        default: () => new Date(+new Date() + 1*24*60*60*1000)
    }
})
secretSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
export default model('Secret', secretSchema)