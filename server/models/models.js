import sequelize from '../db.js'
import {DataTypes} from "sequelize";

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    name: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.STRING, allowNull: true},
    author: {type: DataTypes.STRING, allowNull: true},
    img: {type: DataTypes.STRING},
})

User.hasMany(Post)

export {User, Post}
