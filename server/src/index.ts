import 'reflect-metadata'

import { config } from 'dotenv'
import express from 'express'
import proxy from 'express-http-proxy'
import Users from './routes/users'
import Logger from './logger'
import DatabaseConnection from './database/connection'

config()

const server = express()
	.use(express.json())
	.use(Logger)
	.use('/api/users', Users)
	.use('/', proxy(`localhost:${process.env.FrontendPort ?? '8081'}/`))

DatabaseConnection.then(() => {
	const port = process.env.ServerPort ?? 8080

	server.listen(port, () => {
		console.log(`Listening at http://localhost:${port}`)
	})
})
