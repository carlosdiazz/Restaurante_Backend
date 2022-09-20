import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import {SECRET_JWT_TOKEN} from '../config/config'
import UserModel from '../database/models/user.models'


const opts: StrategyOptions = {
    //Defino donde voy a extraer el token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    //Defino la llave secreta
    secretOrKey: SECRET_JWT_TOKEN
}

export default new Strategy(opts, async(payload, done) => {
    try{
        const user = await UserModel.findById(payload.id, {password: 0})
        if(user){
            return done(null, user)
        }
        return done(null, false)
    }catch(error){
        console.log(error)
        done(error, false)
    }
}
)

