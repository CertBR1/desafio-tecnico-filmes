import { ApiProperty } from "@nestjs/swagger";
import { isArray, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateFilmeDto {
    @IsString({ message: 'O nome do filme deve ser uma string' })
    @IsNotEmpty({ message: 'O nome do filme não pode ser vazio' })
    @ApiProperty({ description: 'Nome do filme', example: 'Avatar' })
    titulo: string;

    @IsString({ message: 'O nome do diretor deve ser uma string' })
    @IsNotEmpty({ message: 'O nome do diretor não pode ser vazio' })
    @ApiProperty({ description: 'Nome do diretor', example: 'James Cameron' })
    diretor: string;

    @IsNotEmpty({ message: 'O ano do filme não pode ser vazio' })
    @IsString({ message: 'O ano do filme deve ser uma string' })
    @ApiProperty({ description: 'Ano de lançamento do filme', example: '2022' })
    ano: number;

    @IsArray({ message: 'Os generos devem ser um array' })
    @IsNotEmpty({ message: 'Os generos não podem ser vazios' })
    @ApiProperty({ description: 'Generos do filme', example: [1, 2, 3] })
    generos: number[];
}
