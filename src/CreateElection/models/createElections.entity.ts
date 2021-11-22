import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';

@Entity()
export class gorv_data extends BaseEntity {
    @Column({length: 256, nullable: false,unique: true,primary:true})
    citizen_id: string;

    @Column({length: 256, nullable: false})
    area_name: string;

}

export class open_area extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 256, nullable: false})
    area_name: string;

    @Column({ nullable: false })
    start_date: Date;

    @Column({ nullable: false })
    end_date: Date;
}

export class sub_area extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    major_area_id: number;

    @Column({length: 256, nullable: false })
    major_area_name: string;

    @Column({length: 256, nullable: false })
    area_name: string;

}