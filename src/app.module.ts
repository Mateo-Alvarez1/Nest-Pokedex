import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'], //Excluimos cualquier path globlaL para que no caiga en el estatico
    }),
    PokemonModule,
    //CONECTAMOS NEST A LA BASE DE DATOS -> MAPEAMOS PUERTOS CON NOMBRE DE LA BASE DE DATOS CREADA
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
