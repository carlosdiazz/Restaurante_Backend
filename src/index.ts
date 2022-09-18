import app from './app/app'
import {PORT} from './config/config'
import {connect} from './database/database'


connect()

app.listen(PORT, ()=>{
    console.log(`👍El server esta arriba en el puerto: ${PORT} 👍💪`)
})
