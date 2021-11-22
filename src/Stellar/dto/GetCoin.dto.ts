import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class GetCoin {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    coinName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    account: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    issuer: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    issuer_secret: string;

}
