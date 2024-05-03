import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Genero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
}