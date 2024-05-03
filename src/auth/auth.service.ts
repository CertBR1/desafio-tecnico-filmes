import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credenciais } from 'src/usuario/usuario/credenciais.entity';
import { Usuario } from 'src/usuario/usuario/usuario.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { CreateLoginDto } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Credenciais)
        private credenciaisRepository: Repository<Credenciais>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private dataSource: DataSource,
        private jwtService: JwtService,
        @Inject('CACHE_MANAGER')
        private cacheManager: Cache
    ) { }
    async registrar(createUsuarioDto: CreateUsuarioDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const credenciaisObj = new Credenciais();
            credenciaisObj.username = createUsuarioDto.username;
            credenciaisObj.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
            const usuarioObj = new Usuario();
            usuarioObj.nome = createUsuarioDto.nome;
            usuarioObj.email = createUsuarioDto.email;
            const credenciais = queryRunner.manager.create(Credenciais, credenciaisObj);
            const usuario = queryRunner.manager.create(Usuario, usuarioObj);
            const credenciaisSalvas = await queryRunner.manager.save(Credenciais, credenciais);
            usuario.credenciais = credenciaisSalvas;
            const usuarioSalvo = await queryRunner.manager.save(Usuario, usuario);
            await queryRunner.manager.update(Credenciais, { id: credenciaisSalvas.id }, { usuario: usuarioSalvo });
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return { ...usuarioSalvo, credenciais: credenciaisSalvas };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            Logger.error(error);
            if (error.constraint === 'UQ_2ea198e58d045e2c9651ed1b4e6') {
                throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
            } else if (error.constraint === 'UQ_2863682842e688ca198eb25c124') {
                throw new HttpException('Email já existe', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Erro ao registrar usuário', HttpStatus.BAD_REQUEST);
        } finally {
            await queryRunner.release();
        }
    }
    async login(createLoginDto: CreateLoginDto) {
        try {
            const cacheData = await this.cacheManager.get(createLoginDto.username);
            if (cacheData) {
                return { access_token: cacheData };
            }
            const credenciais = await this.credenciaisRepository.findOneBy({ username: createLoginDto.username });
            if (!credenciais) {
                throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST);
            }
            const isValid = await bcrypt.compare(createLoginDto.senha, credenciais.senha);
            if (!isValid) {
                throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST);
            }
            const payload = { username: credenciais.username, sub: credenciais.id };
            const access_token = this.gerarToken(payload);
            await this.cacheManager.set(createLoginDto.username, access_token, 30000);
            return {
                access_token
            };
        } catch (error) {
            Logger.error(error);
            console.log(error);
            throw new HttpException('Credenciais inválidas', HttpStatus.BAD_REQUEST);
        }
    }
    gerarToken(payload: any) {
        try {
            return this.jwtService.sign(payload);
        } catch (error) {
            Logger.error(error);
            console.log(error);
            throw new HttpException('Erro ao gerar token', HttpStatus.BAD_REQUEST);
        }
    }
    validarToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            Logger.error(error);
            console.log(error);
            throw new HttpException('Erro ao validar token', HttpStatus.BAD_REQUEST);
        }
    }
}
