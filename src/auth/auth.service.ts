import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credenciais } from 'src/usuario/usuario/credenciais.entity';
import { Usuario } from 'src/usuario/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Credenciais)
        private credenciaisRepository: Repository<Credenciais>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }
    async registrar(createUsuarioDto: CreateUsuarioDto) {
        try {
            const credenciaisObj = {
                username: createUsuarioDto.username,
                senha: createUsuarioDto.senha
            }
            const usuarioObj = {
                nome: createUsuarioDto.nome,
                email: createUsuarioDto.email
            }

            const credenciais = this.credenciaisRepository.create(credenciaisObj);
            const usuario = this.usuarioRepository.create(usuarioObj);
            const credenciaisSalvas = await this.credenciaisRepository.save(credenciais);
            const usuarioSalvo = await this.usuarioRepository.save(usuario);
            return { ...credenciaisSalvas, ...usuarioSalvo };
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    login(createUsuarioDto: CreateUsuarioDto) {
        throw new Error('Method not implemented.');
    }
    gerarToken() {
        throw new Error('Method not implemented.');
    }
    validarToken() {
        throw new Error('Method not implemented.');
    }
}
