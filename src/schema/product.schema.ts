import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({timestamps:true})
export class Product {
  @Prop({required: true})
  name: string;

  @Prop()
  brand: string;

  @Prop()
  color: string;

  @Prop()
  price: number;

  @Prop()
  isAvailable: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);