import { IsNotEmpty, IsString } from "class-validator";

export class CreateGeneroDto {
    @IsString({ message: 'O nome deve ser uma string' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;
}