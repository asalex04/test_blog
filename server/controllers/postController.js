import {Post} from "../models/models.js";
import { v4 as uuidv4 } from 'uuid';
import ApiError from "../error/ApiError.js";
import path from "path";

class PostController {
    async create(req, res, next) {
        try {
            let { title, content, author } = req.body
            const { img } = req.files
            let fileName = `${uuidv4()}.jpg`
            const filepath = path.resolve('static', fileName)
            await img.mv(filepath)

            const post = await Post.create({title, content, author, img: fileName})
            return res.json(post)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit

        const posts = await Post.findAndCountAll({limit, offset})
        return res.json(posts)
    }

    async getOne(req, res) {
        const {id} = req.params
        const post = await Post.findOne({where: {id}})
        return res.json(post)
    }

    async delete(req, res) {
        const {id} = req.params
        const post = await Post.findOne({where: {id}})
        await post.destroy()
        return res.json({message: 'Post was delete'})
    }

    async update(req, res, next) {
        const {id} = req.params
        const {title, content} = req.body
        const { img } = req.files
        let fileName = `${uuidv4()}.jpg`
        const filepath = path.resolve('static', fileName)
        await img.mv(filepath)
        try {
            const post = await Post.findOne({where: {id}})
            post.title = title
            post.content = content
            post.img = fileName
            await post.save()
            return res.json(post)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

export default new PostController()
