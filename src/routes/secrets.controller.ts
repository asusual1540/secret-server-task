import { RequestHandler } from "express"
import { cryptoHash } from '../utils/cryptoHash'
import Secret from './Secret'


export const create_a_secret: RequestHandler = async (req, res) => {
    if (!req.body.secretText) res.json({"message": "You must provide a valid secret!"})
    try {
        const hash = cryptoHash(Date.now(), req.body.secretText)
        const secret = new Secret({
            secretText : req.body.secretText,
            hash : hash.substring(0, 6).toUpperCase()
        })
        if (req.body.expireAt && Date.parse(req.body.expireAt)) secret.expireAt = req.body.expireAt
        const saved_secret = await secret.save()
        return res.json(saved_secret)
    } catch (ex) {
        console.log('Error while creating a secret!', ex)
        return res.json({"message": "Error while creating a secret!", "error" : ex})
    }
}

export const get_all_secrets: RequestHandler = async (req, res) => {
    try {
        const secrets = await Secret.find()
        return res.json(secrets)
    } catch (ex) {
        console.log(ex)
        return res.json({"message": "Error while getting all the secrets!", "error" : ex})
    }
}

export const get_a_secret: RequestHandler = async (req, res) => {
    try {
        const secret = await Secret.findOne({ hash : req.params.hash})
        if (!secret) {
            return res.status(404).json({"message": "Secret was not found!"})
        }

        if (secret.expireAt.getTime() < +new Date().getTime()) {
            return res.status(404).json({"message": "Secret has expired!"})
        }
        return res.status(200).json(secret)
    } catch (ex) {
        console.log("Error while getting a secret by hash!", ex)
        return res.json({"message": "Error while creating a secret!", "error" : ex})
    }
}
