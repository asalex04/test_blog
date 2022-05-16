import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerAutogen from 'swagger-autogen'
import {DataTypes} from "sequelize";

const _dirname = dirname(fileURLToPath(import.meta.url))

const doc = {
    info: {
        title: 'Test API',
        description: 'My test API'
    },
    definitions: {
        Post: {
            id: '1',
            title: 'post1',
            content: 'test',
            author: 'username',
            img: 'test.jpg',
        },
        Posts: [
            {
                $ref: '#/definitions/Post'
            }
        ],
        Text: {
            title: 'post1',
            content: 'test',
            img: 'test.jpg'
        },
        User: {
            id: '1',
            email: 'email',
            name: 'username',
            password: 'password',
        }
    },
    host: 'localhost:7000',
    schemes: ['http']
}

const outputFile = join(_dirname, 'output.json')
const endpointsFiles = [join(_dirname, '../index.js')]

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then(({ success }) => {
    console.log(`Generated: ${success}`)
})
