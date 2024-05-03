import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) { }

  @Post()
  create(@Body() createFilmeDto: CreateFilmeDto) {
    return this.filmesService.create(createFilmeDto);
  }
  @Post('/generos')
  createGenero(@Body() createGeneroDto: CreateGeneroDto) {
    return this.filmesService.createGenero(createGeneroDto);
  }

  @Get('/generos')
  findAllGeneros() {
    return this.filmesService.findAllGeneros();
  }

  @Get('/generos/:id')
  findOneGenero(@Param('id') id: string) {
    return this.filmesService.findOneGenero(+id);
  }
  @Get()
  findAll() {
    return this.filmesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    return this.filmesService.update(+id, updateFilmeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmesService.remove(+id);
  }
}
