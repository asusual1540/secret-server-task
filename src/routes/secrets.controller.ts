import { RequestHandler } from "express"

export const create_secret: RequestHandler = (req, res) => {
    console.log(req.body)
    res.json("creating a secret")
}

export const get_secrets: RequestHandler = (req, res) => {
    res.json("getting all secrets")
}

export const get_secret: RequestHandler = (req, res) => {
    res.json("getting a secret")
}

export const delete_secret: RequestHandler = (req, res) => {
    res.json("deleting a secret")
}

export const update_secret: RequestHandler = (req, res) => {
    res.json("updating a secret")
}