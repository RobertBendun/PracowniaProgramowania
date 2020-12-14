import { createConnection } from 'typeorm'
import Entities from './entities'

let connection = createConnection({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'projekt_pracownia',
	password: 'projekt_pracownia',
	database: 'projekt_pracownia',
	synchronize: true,
	dropSchema: false,
	entities: Entities
})

export default connection