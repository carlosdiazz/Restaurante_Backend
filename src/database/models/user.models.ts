import {prop, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose'
//import bcrypt from 'bcrypt'
import {Role} from './role.models'
@modelOptions({schemaOptions: {timestamps: true}})

class User {

    @prop({required: true}) //Mongoose
    first_name: string      //TypeScript

    @prop({required: true})
    last_name: string

    @prop({required: true, unique: true, minlength: 5})
    nickname: string

    @prop({required: true, unique: true})
    email: string

    @prop({required: true, minlength: 8})
    password: string

    @prop({required: true})
    birth_date: Date

    @prop()
    phone: string

    @prop({default: true})
    is_active: boolean

    @prop({default: false})
    is_staff: boolean

    @prop({ref: () => Role})
    role: Ref<Role>[] //Relacion de muchos a muchos

}

const UserModel = getModelForClass(User)
export default UserModel