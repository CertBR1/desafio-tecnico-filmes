
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Genero } from './genero.entity';

@Entity()
export class Filme {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    ano: number;

    @Column()
    diretor: string;

    @ManyToMany(() => Genero)
    @JoinTable()
    generos: Genero[];
}
