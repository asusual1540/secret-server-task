import { Router } from 'express'
import { get_all_secrets, get_a_secret, create_a_secret } from './secrets.controller'

const router = Router()

router.get('/secrets', get_all_secrets)

router.get('/secrets/:hash', get_a_secret)

router.post('/secrets', create_a_secret)

export default router