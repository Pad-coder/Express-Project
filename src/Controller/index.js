import express from 'express'
import userController from './userController.js'

const controller = express.Router()

controller.use('/users',userController)

export default controller