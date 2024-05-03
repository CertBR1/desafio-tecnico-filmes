import { Module } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { FilmesController } from './filmes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './entities/filme.entity';
import { Genero } from './entities/genero.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Filme, Genero])
  ],
  controllers: [FilmesController],
  providers: [FilmesService],
})
export class FilmesModule { }
