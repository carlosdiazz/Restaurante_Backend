import {prop, getModelForClass} from '@typegoose/typegoose'

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

    @prop({})
    is_active: boolean

    @prop({})
    is_staff: boolean

}

const UserModel = getModelForClass(User)
export default UserModel