import { Router } from 'express'
import md5 from 'md5'
import { getManager, getRepository } from 'typeorm'
import { Users } from '../database/entities'

const router = Router()

router.get('/', async (request, response) => {
	const found = await getRepository(Users).find()
	response.send(found)
})

router.post('/', async (request, response) => {
	try {
		const body = request.body
		const newUser = await getRepository(Users).save({...body, password: md5(body.password)})
		response.json(newUser)
	} catch (err) {
		response.status(400).json({
			message: err
		})
	}
})

export default router