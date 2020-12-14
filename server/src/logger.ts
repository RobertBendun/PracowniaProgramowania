import { Request, NextFunction } from 'express'

export default ({ method, url } : Request, _ : any, next : NextFunction) => {
	console.log(`${method} ${url}`)
	next()
}