import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Genero {
    @PrimaryGeneratedColumn()
    genero_id: number;

    @Column()
    nome: string;
}