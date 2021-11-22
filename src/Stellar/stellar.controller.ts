import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {StellarService} from "./stellar.service";
import {CreateUserWallet} from "./dto/UserVote.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Stellar')
@Controller('stellar')
export class StellarController {
    constructor(
        private stellarService: StellarService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Get('/createIssuer')
    createIssuer() {
        return this.stellarService.createIssuer()
    }

    @HttpCode(HttpStatus.OK)
    @Post('createWallet')
    createWallet(@Body() UserWallet: CreateUserWallet){
        return this.stellarService.createWallet(UserWallet)
    }
}