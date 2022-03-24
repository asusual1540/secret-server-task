import { Router } from 'express'
import { get_secrets, get_secret, create_secret, delete_secret } from './secrets.controller'

const router = Router()

router.get('/secrets', get_secrets)

router.get('/secrets/:hash', get_secret)

router.post('/secrets', create_secret)

router.delete('/secrets/:hash', delete_secret)

router.put('/secret/:hash', delete_secret)


export default router