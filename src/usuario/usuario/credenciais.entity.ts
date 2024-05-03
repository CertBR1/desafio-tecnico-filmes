import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity("credenciais")
export class Credenciais {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    senha: string;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: "usuario" })
    usuario: Usuario;
}