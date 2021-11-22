import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserWallet {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    citizenId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    backCard: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

}