import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  // IMPORTAMOS DE LA BASE DE DATOS , EL MODELO Y EL SCHEMA ANTERIORMENTE DEFINIDO PARA PODER TRABAJAR CON EL
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
})
export class PokemonModule {}
