import { RequestHandler } from "express"
import { cryptoHash } from '../utils/cryptoHash'
import Secret from './Secret'


export const create_a_secret: RequestHandler = async (req, res) => {
    if (!req.body.secretText) res.json({"status": "failed", "message": "You must provide a valid secret!", "data": {}})
    try {
        const hash = cryptoHash(Date.now(), req.body.secretText)
        const secret = new Secret({
            secretText : req.body.secretText,
            hash : hash.substring(0, 6).toUpperCase()
        })
        if (req.body.expireAt && Date.parse(req.body.expireAt) && Date.parse(req.body.expireAt) > Date.now()) {
            secret.expireAt = req.body.expireAt
        } else {
            return res.json({"status": "failed", "message": "Incorrect expiry date!", "data" : {}})
        }
        const saved_secret = await secret.save()
        return res.json({"status": "success", "message": "Successfully created your secret.", "data" : saved_secret})
    } catch (ex) {
        console.log('Error while creating a secret!', ex)
        return res.json({"status": "failed", "message": "Error while creating a secret!", "data" : {}})
    }
}

export const get_all_secrets: RequestHandler = async (req, res) => {
    try {
        const secrets = await Secret.find()
        return res.json({"status": "success", "message": "Successfully fetched all your secrets.", "data" : secrets})
    } catch (ex) {
        console.log(ex)
        return res.json({"status": "failed", "message": "Error while getting all the secrets!", "data" : {}})
    }
}

export const get_a_secret: RequestHandler = async (req, res) => {
    try {
        const secret = await Secret.findOne({ hash : req.params.hash})
        if (!secret) {
            return res.status(404).json({"status": "failed", "message": "Secret was not found!", "data" : {}})
        }

        if (secret.expireAt.getTime() < +new Date().getTime()) {
            return res.status(200).json({"status": "failed", "message": "Secret has expired!", "data" : {}})
        }
        return res.status(200).json({"status": "success", "message": "Successfully fetched your secret.", "data" : secret})
    } catch (ex) {
        console.log("Error while getting a secret by hash!", ex)
        return res.json({"status": "failed", "message": "Error while creating a secret!", "data" : {}})
    }
}
