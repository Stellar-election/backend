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

