import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User, Post} from '../models/models.js'
import ApiError from "../error/ApiError.js"

const generateJwt = (id, email, name) => {
    return jwt.sign(
        {id, email, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, name} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Wrong email or password"))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest(`User with email: ${email} already exist`))
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({email, name, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal`User with email ${email} not exist`)
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal(`Wrong password`))
        }
        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name)
        return res.json({token})
    }
}

export default new UserController()
