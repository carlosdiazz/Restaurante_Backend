import app from './app/app'
import {PORT} from './config/config'
import {connect} from './database/database'
import {createRoles} from './libs/initialSetup'


// Conecto a la base de datos
connect()

// Creo roles por defecto
createRoles()


app.listen(PORT, ()=>{
    console.log(`👍El server esta arriba en el puerto: ${PORT} 👍💪`)
})
