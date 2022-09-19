import express from 'express'
import routerAPI from '../routes/index.routes'
import cors from 'cors'
import morgan from 'morgan'
import {logErrors, boomErrorHandler, errorHandler} from '../middlewares/error.middlewares'
import {ENV} from '../config/config'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import {swaggerOptionsJson} from '../swaggerOptions'

const app = express()

///Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan(ENV))


//Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptionsJson)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Rutas
routerAPI(app)




///Middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


export default app;