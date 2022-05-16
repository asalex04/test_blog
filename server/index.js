import fs from 'fs'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import 'dotenv/config'
import sequelize from './db.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import router from "./routes/index.js";
import errorHandler from './middleware/ErrorHandlingMiddleware.js'

const PORT = process.env.PORT || 5000

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'))

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve('static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
//Обработка ошибок
app.use(errorHandler)

const startApp = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
startApp()
