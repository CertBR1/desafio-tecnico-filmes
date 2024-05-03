import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateLoginDto {
    @IsNotEmpty({ message: 'O campo username deve ser informado.' })
    @IsString({ message: 'O campo username deve ser uma string.' })
    @Length(6, 20, { message: 'O campo username deve ter entre 6 e 20 caracteres.' })
    @ApiProperty({ example: 'joaquim' })
    username: string;

    @IsNotEmpty({ message: 'O campo password deve ser informado.' })
    @IsString({ message: 'O campo password deve ser uma string.' })
    @Length(6, 20, { message: 'O campo password deve ter entre 6 e 20 caracteres.' })
    @ApiProperty({ example: '123456' })
    senha: string;
}