import Router from 'express'
import postController from "../controllers/postController.js";

const router = Router()

router.post('/', postController.create)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.delete('/:id', postController.delete)
router.put('/:id', postController.update)

export default router
