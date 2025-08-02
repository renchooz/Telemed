import express from 'express'
import { getDoctor, getOnlineDoctors, loginDoctor, Logout, registerDoctor, toggleAvailability } from '../controllers/doctorController.js'
import { protect } from '../middleware/authMiddleware.js'

const doctorRouter = express.Router()

doctorRouter.post('/register',registerDoctor)
doctorRouter.post('/login',loginDoctor)
doctorRouter.put('/avalibility',protect,toggleAvailability)
doctorRouter.get('/logout',protect,Logout)
doctorRouter.get('/onlinedr',protect,getOnlineDoctors)
doctorRouter.get('/getdr',protect,getDoctor)


export default doctorRouter



