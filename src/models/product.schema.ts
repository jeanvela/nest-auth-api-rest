import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Auth } from "./auth.schema";

@Schema({
    timestamps: true
})
export class Product {
    @Prop({required: true, unique: true})
    title: string

    @Prop({required: true, })
    description: string

    @Prop({required: true})
    price: number

    @Prop({require: true, type: mongoose.Schema.Types.ObjectId, ref: 'Auth'})
    userId: mongoose.Types.ObjectId | Auth
}

export const ProductSchema = SchemaFactory.createForClass(Product)