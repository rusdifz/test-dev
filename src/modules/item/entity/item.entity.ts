import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity({ name: 'item' })
export class ItemEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    item_id: number

    @Column({type: 'varchar', length: 200})
    item_name: string
    
    @Column({type: 'varchar', length: 200})
    category: string

    @Column({type: 'varchar', length: 200})
    type: string

    @Column({type: 'varchar', length: 200})
    username: string
    
    @CreateDateColumn({ type: "timestamp", default: null })
    created_at: string
    
    @UpdateDateColumn({ type: "timestamp", default: null })
    updated_at: string
    
    @DeleteDateColumn({ type: "timestamp", default: null })
    deleted_at: string

}