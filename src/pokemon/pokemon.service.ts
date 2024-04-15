import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel('Pokemon')
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  //SIEMPRE ES IMPORTANTE HACER LA MENOS CANTIDAD DE CONSULTAS A LA BASE DE DATOS
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // Verificamos que mi termino sea un numero para buscarlo por su indice
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // Si no viene el pokemon y si el objeto es valido , busca por el id
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    //Buscamos por el nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }
    // Si no viene nada , retornamos not found
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id , name or no ${term} not found in database`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await this.pokemonModel.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id: ${id} not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.errorResponse.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exixt in database ,  error: ${JSON.stringify(error.errorResponse.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      'Can´t create pokemon , check server logs',
    );
  }
}
