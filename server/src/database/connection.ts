import { createConnection } from 'typeorm'
import Users from './Users'
import addCleaning from './cleaning'

let connection = createConnection({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'projekt_pracownia',
	password: 'projekt_pracownia',
	database: 'projekt_pracownia',
	synchronize: true,
	dropSchema: false,
	entities: [
		Users
	],
})

export default connection