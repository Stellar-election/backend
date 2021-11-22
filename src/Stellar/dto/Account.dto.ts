import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class Account {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    account: string;

}
