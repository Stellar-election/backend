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

@Entity("candidate")
export class candidate extends BaseEntity {
    @Column({length: 256, nullable: false , primary:true })
    citizenId: string;

    @Column({length: 256, nullable: false })
    first_name: string;

    @Column({length: 256, nullable: false })
    last_name: string;

    @Column({ nullable: false })
    major_area_id: number;

    @Column({length: 256, nullable: false })
    major_area_name: string;

    @Column({length: 256, nullable: false })
    party: string;

    @Column({length: 256, nullable: false })
    wallet_address: string;

}