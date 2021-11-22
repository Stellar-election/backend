import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';


@Entity()
export class user_area extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 256, nullable: false})
    area: string;

    @Column({nullable: false})
    area_id: number;

    @Column({length: 256, nullable: false})
    citizen_id: string;

    @Column({nullable: false})
    area_use: boolean;

}