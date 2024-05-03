import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credenciais } from "./credenciais.entity";

@Entity({ name: 'usuario' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @OneToOne(() => Credenciais)
    @JoinColumn({ name: 'credenciais' })
    credenciais: Credenciais;
}