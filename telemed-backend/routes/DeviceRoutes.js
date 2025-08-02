import express from 'express'
import { getAllDevices, registerDevice } from '../controllers/deviceController.js'

const deviceRoute = express.Router()
deviceRoute.post('/add',registerDevice)
deviceRoute.get('/all',getAllDevices)

export default deviceRoute