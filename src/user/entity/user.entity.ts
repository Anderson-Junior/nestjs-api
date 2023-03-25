import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class UserEntity{

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    @PrimaryColumn()
    id: number

    @Column({
        length: 50
    })
    name: string

    @Column({
        length: 50,
        unique: true
    })
    email: string

    @Column({
        length: 50
    })
	password: string

    @Column()
    birthAt: string

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string

    @Column({
        default: 1
    })
    role: number
}