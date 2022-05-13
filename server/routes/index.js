import Router from 'express'
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";

const router = Router()

router.use('/user', userRouter)
router.use('/post', postRouter)

export default router
