import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose'

@modelOptions({schemaOptions: {timestamps: true}})

export class Role {
    @prop({required: true})
    name: string

    @prop({required: true})
    description: string

    _id: string
}

export const roles = ['admin', 'user', 'moderator'];

const RoleModel = getModelForClass(Role);
export default RoleModel;