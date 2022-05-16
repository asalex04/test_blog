import Router from 'express'
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router()

router.post('/registration',
    // #swagger.description = 'Registration new user'
    userController.registration)
router.post('/login',
    // #swagger.description = 'User authorization'
    userController.login)
router.get('/auth',
    // #swagger.description = 'User authorization verification'
    authMiddleware, userController.check)

export default router
