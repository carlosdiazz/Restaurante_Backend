import {prop, getModelForClass, modelOptions, Ref, ReturnModelType} from '@typegoose/typegoose'
//import bcrypt from 'bcrypt'
import {Role} from '../../database/models/role.models'
@modelOptions({schemaOptions: {timestamps: true}})

class User {

    @prop({required: true}) //Mongoose
    first_name: string      //TypeScript

    @prop({required: true})
    last_name: string

    //! COLOCAR unique: true
    @prop({required: true, minlength: 5, unique: true, trim: true, })
    nickname: string

    //! COLOCAR unique: true
    @prop({required: true, trim: true, lowercase: true, unique: true})
    email: string

    @prop({required: true, minlength: 8})
    password: string

    @prop({required: true})
    birth_date: Date

    @prop({})
    phone: number

    @prop({default: true})
    is_active: boolean

    //!Arregalr esto de staff
    @prop({required: true})
    is_staff: boolean

    @prop({required: true, ref: () => Role})
    role: Ref<Role>[] //Relacion de muchos a muchos

    static async findByNickname(this: ReturnModelType<typeof User>, nickname: string){
        return this.findOne({nickname: nickname})
    }

}

const UserModel = getModelForClass(User)
export default UserModel