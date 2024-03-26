import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity({ name: 'users_new' })
export class Users {

    @PrimaryGeneratedColumn({type: 'bigint'})
    user_id: number

    @Column({type: 'varchar', length: 200})
    email: string
    
    @Column({type: 'varchar', length: 200})
    username: string
    
    @Column({type: 'varchar', length: 200})
    password: string
    
    @CreateDateColumn({ type: "timestamp", default: null })
    created_at: string
    
    @UpdateDateColumn({ type: "timestamp", default: null })
    updated_at: string
    
    @DeleteDateColumn({ type: "timestamp", default: null })
    deleted_at: string

}