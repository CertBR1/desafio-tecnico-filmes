import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Filme } from './entities/filme.entity';
import { DataSource, EntityNotFoundError, In, Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';
import { CreateGeneroDto } from './dto/create-genero.dto';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private readonly filmeRepository: Repository<Filme>,
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
    private dataSource: DataSource
  ) {

  }
  async create(createFilmeDto: CreateFilmeDto) {
    try {
      const generos = await this.generoRepository.findBy({ id: In(createFilmeDto.generos) });
      const filme = this.filmeRepository.create({ ...createFilmeDto, generos });
      return await this.filmeRepository.save(filme);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.filmeRepository.find({ relations: { generos: true } });
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    try {
      return this.filmeRepository.findOne({ where: { id }, relations: { generos: true } });
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const filme = await queryRunner.manager.findOne(Filme, { where: { id } });
      if (!filme) {
        throw new EntityNotFoundError(Filme, id);
      }
      await queryRunner.manager.save(Filme, { ...filme, ano: updateFilmeDto.ano, diretor: updateFilmeDto.diretor, titulo: updateFilmeDto.titulo });
      if (updateFilmeDto.generos) {
        const generos = await this.generoRepository.findBy({ id: In(updateFilmeDto.generos) });
        filme.generos = generos;
        await queryRunner.manager.save(filme);
      }
      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      Logger.error(error);
      throw new HttpException('Falha ao atualizar o filme', HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    try {
      return await this.filmeRepository.delete({ id });
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneGenero(id: number) {
    try {
      return await this.generoRepository.findOneBy({ id: id });
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async findAllGeneros() {
    try {
      return await this.generoRepository.find();
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async createGenero(createGeneroDto: CreateGeneroDto) {
    try {
      return await this.generoRepository.save(createGeneroDto);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
