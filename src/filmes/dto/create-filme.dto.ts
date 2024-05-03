import { isArray, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateFilmeDto {
    @IsString({ message: 'O nome do filme deve ser uma string' })
    @IsNotEmpty({ message: 'O nome do filme não pode ser vazio' })
    nome: string;

    @IsString({ message: 'O nome do diretor deve ser uma string' })
    @IsNotEmpty({ message: 'O nome do diretor não pode ser vazio' })
    diretor: string;

    @IsNotEmpty({ message: 'O ano do filme não pode ser vazio' })
    @IsString({ message: 'O ano do filme deve ser uma string' })
    ano: number;

    @IsArray({ message: 'Os generos devem ser um array' })
    @IsNotEmpty({ message: 'Os generos não podem ser vazios' })
    generos: number[];
}
