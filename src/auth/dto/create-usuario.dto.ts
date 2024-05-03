import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUsuarioDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome deve ser informado.' })
    nome: string;

    @IsString({ message: 'O email deve ser uma string.' })
    @IsNotEmpty({ message: 'O email deve ser informado.' })
    email: string;

    @IsString({ message: 'O username deve ser uma string.' })
    @IsNotEmpty({ message: 'O username deve ser informado.' })
    @Length(6, 20, { message: 'O username deve ter entre 6 e 20 caracteres.' })
    username: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha deve ser informada.' })
    @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
    senha: string;

}