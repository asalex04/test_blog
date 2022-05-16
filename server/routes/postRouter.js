import Router from 'express'
import postController from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()

router.post('/',
    // #swagger.description = 'Create new post'
    /* #swagger.parameters['text'] = {
      in: 'body',
      description: 'New post text',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/Text' }
    } */
    /* #swagger.responses[201] = {
        description: 'Array of new posts',
        schema: { $ref: '#/definitions/Posts' }
    } */
    authMiddleware, postController.create)
router.get('/',
    // #swagger.description = 'Get all posts'
    /* #swagger.responses[200] = {
        description: 'Array of all posts',
        schema: { $ref: '#/definitions/Posts' }
    } */
    postController.getAll)
router.get('/:id',
    // #swagger.description = 'Get post by ID'
    /* #swagger.parameters['id'] = {
      description: 'Existing post ID',
      type: 'string',
      required: true
    } */
    /* #swagger.responses[200] = {
        description: 'Post with provided ID',
        schema: { $ref: '#/definitions/Post' }
    } */
    postController.getOne)
router.delete('/:id',
    // #swagger.description = 'Remove existing post'
    /* #swagger.parameters['id'] = {
      description: 'Existing post ID',
      type: 'string',
      required: true
    } */
    /* #swagger.responses[201] = {
      description: 'Array of new posts or empty array',
      schema: { $ref: '#/definitions/Posts' }
    } */
    authMiddleware, postController.delete)
router.put('/:id',
    // #swagger.description = 'Update existing post'
    /* #swagger.parameters['id'] = {
      description: 'Existing post ID',
      type: 'string',
      required: true
    } */
    /* #swagger.responses[201] = {
      description: 'Array of new posts',
      schema: { $ref: '#/definitions/Posts' }
    } */
    authMiddleware, postController.update)

export default router
