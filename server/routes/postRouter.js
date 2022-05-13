import Router from 'express'
import postController from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.post('/',  authMiddleware, postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.delete('/:id',  authMiddleware, postController.delete)
router.put('/:id',  authMiddleware, postController.update)

export default router
