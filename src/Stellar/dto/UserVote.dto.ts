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

export class SendCoin {

    @IsNotEmpty()
    @ApiProperty()
    userWallet: CreateUserWallet;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    destination: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    coinName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    issuer: string;

}