import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Auth {
    @Prop({required: true})
    username: string

    @Prop({
        unique: true,
        required: true
    })
    email: string

    @Prop({required: true})
    password: string

    @Prop({default: true})
    status: boolean
}

export const AuthSchema = SchemaFactory.createForClass(Auth)