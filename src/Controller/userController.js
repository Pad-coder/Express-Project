import express from 'express'
import userService from './../Service/userService.js'

const userController= express.Router()

userController.get('/', userService.getAlluser)
userController.get('/:id', userService.getUserid)
userController.post('/',userService.createUser)
userController.put('/:id',userService.editUserbyId)
userController.delete('/:id',userService.deleteUserById)

export default userController