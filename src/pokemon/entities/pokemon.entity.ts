import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // MAPEA UNA CLASE A UNA CONEXION DE MONGO
export class Pokemon extends Document {
  // ESTE DECORADOR DEFINE UNA PROPIEDAD EN EL DOCUEMNTO ANTERIRORMENTE DEFINIDO
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  no: number;
}
// USAMOS EL SchemaFactory para crear un SCHEMA haciendo referencia a la clase
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
