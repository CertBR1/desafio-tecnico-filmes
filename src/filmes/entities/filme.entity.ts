
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Genero } from './genero.entity';

@Entity()
export class Filme {
    @PrimaryGeneratedColumn()
    filme_id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    ano_lancamento: number;

    @Column()
    diretor: string;

    @ManyToMany(() => Genero)
    @JoinTable()
    generos: Genero[];
}
