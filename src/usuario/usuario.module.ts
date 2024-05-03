import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credenciais } from './usuario/credenciais.entity';
import { Usuario } from './usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Credenciais,
      Usuario
    ])
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule { }
