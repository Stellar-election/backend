import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';

@Entity("gorv_data")
export class gorv_data extends BaseEntity {
    @Column({length: 256, nullable: false,primary:true})
    citizen_id: string;

    @Column({length: 256, nullable: false,primary:true})
    area_name: string;

    @Column({ nullable: false})
    isvote: boolean;
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

@Entity("sub_area")
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
@Entity("issuer")
export class issuer extends BaseEntity {
    @Column({length: 256, nullable: false, unique: true, primary: true})
    account: string;

    @Column({length: 256, nullable: false})
    secret: string;

}

@Entity("candidate")
export class candidate extends BaseEntity {

    @Column({length: 256, nullable: false, primary:true })
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