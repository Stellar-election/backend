import {IsArray, IsDate, IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateElectionDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    areaName: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    @ValidateNested({ each: true })
    areaList: [string];

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    endDate: Date;

}

export class Issuer {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    account: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    secret: string;

}
export class Candidate {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    citizenId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    major_area_name: string;

    @IsNotEmpty()
    @ApiProperty()
    major_area_id: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    party: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    wallet_address: string;


}
