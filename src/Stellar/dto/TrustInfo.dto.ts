import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {CreateUserWallet} from "./UserVote.dto";

export class TrustInfo {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    coinName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    issuer: string;

    @IsNotEmpty()
    @ApiProperty()
    userWallet: CreateUserWallet

}
