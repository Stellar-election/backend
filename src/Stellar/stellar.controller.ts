import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {StellarService} from "./stellar.service";
import {CreateUserWallet, SendCoin} from "./dto/UserVote.dto";
import {TrustInfo, TrustInfoForCandidate} from "./dto/TrustInfo.dto";
import {Account} from "./dto/Account.dto";
import {GetCoin} from "./dto/GetCoin.dto";
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
    @Post('/createWallet')
    createWallet(@Body() UserWallet: CreateUserWallet) {
        return this.stellarService.createWallet(UserWallet)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/getBalance')
    getBalance(@Body() account: Account) {
        return this.stellarService.getBalance(account)
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('/trustCoin')
    trustCoin(@Body() trustInfo: TrustInfoForCandidate) {
        return this.stellarService.trustCoin(trustInfo)
    }
        
    @HttpCode(HttpStatus.OK)
    @Post('/trustCoinWithLimit')
    trustCoinWithLimit(@Body() trustInfo: TrustInfo) {
        return this.stellarService.trustCoinWithLimit(trustInfo)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/getCoin')
    getCoin(@Body() GetCoin: GetCoin) {
        return this.stellarService.getCoin(GetCoin)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/vote')
    vote(@Body() SendCoin: SendCoin) {
        return this.stellarService.vote(SendCoin)
    }
}