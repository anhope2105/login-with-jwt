
const router = require('express').Router();
const userControllers = require('../controllers/userControllers')
const middlewareController = require('../controllers/middlewareController')

router.get('/',middlewareController.verifyToken ,userControllers.getAllUsers)

router.delete('/:id', middlewareController.verifyTokenAndAdminAuth,userControllers.deleteUser)


module.exports = router