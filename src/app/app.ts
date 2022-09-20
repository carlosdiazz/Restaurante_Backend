import express from 'express'
import routerAPI from '../routes/index.routes'
import cors from 'cors'
import morgan from 'morgan'
import {logErrors, boomErrorHandler, errorHandler} from '../middlewares/error.middlewares'
import {ENV} from '../config/config'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import {swaggerOptionsJson} from '../swaggerOptions'
import helmet from 'helmet'
import passport from 'passport'
import passportMiddleware from '../middlewares/passport'

//Inicializaciones
const app = express()


//Middlewares
//Middlewares para recivir datos en formato json
app.use(express.json())
//Middlewares para manjear el cors
app.use(cors())
// Middlewares para ver las peticiones que se hacen
app.use(morgan(ENV))
//Middlewares de Seguridad
app.use(helmet())

// Middlewares de Passport
app.use(passport.initialize())
passport.use(passportMiddleware)


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