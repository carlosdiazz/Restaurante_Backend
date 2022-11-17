import app from './app/app'
import {PORT} from './config/config'
import {connect} from './database/database'
import {createRoles} from './libs/initialSetup'

const main = async() => {
    try{
        console.log(`🔥🔥🔥🔥🔥Subiendo el servidor🔥🔥🔥🔥🔥`)
        // Conecto a la base de datos
        await connect()

        // Creo roles por defecto
        await createRoles()

        app.listen(PORT as number,"0.0.0.0", () => {
            console.log(`👍El server esta arriba en el puerto: ${PORT} 👍💪`)
        })

    }catch (error) {
        console.log(error)
    }
}

main()