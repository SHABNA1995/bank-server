
const express=require('express')
const logic=require('../controllers/logic')
const { jwtmiddleware } = require('../middlewares/routermiddleware')


//create an object for router class in express
const router=new express.Router()
//register
router.post('/user-register/user',logic.register)
//loginn
router.post('/user-login/user',logic.login)
//user
router.get('/user-profile/user/:acno',jwtmiddleware,logic.getprofile)
//balance
router.get('/user-balance/user/:acno',jwtmiddleware,logic.getBalance)
//money transfer
router.post('/money-transfer/user',jwtmiddleware,logic.moneyTransfer)
//statement
router.get('/user-statement/user/:acno',jwtmiddleware,logic.history)
//delete account
router.delete('/user-delete/user/:acno',jwtmiddleware,logic.deleteAc)
//export router
module.exports=router