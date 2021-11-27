import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {StellarService} from "./stellar.service";
import {CreateUserWallet, SendCoin} from "./dto/UserVote.dto";
import {TrustInfo, TrustInfoForCandidate} from "./dto/TrustInfo.dto";
import {Account} from "./dto/Account.dto";
import {GetCoin} from "./dto/GetCoin.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Stellar')
@Controller('stellar')
export class StellarController {
    constructor(
        private stellarService: StellarService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Get('/createIssuer')
    @ApiOperation({summary: 'Create the issuer account', description: 'There will be only one issuer.'})
    @ApiResponse({status: 200, description: 'Issuer is successfully created'})
    createIssuer() {
        return this.stellarService.createIssuer()
    }

    @HttpCode(HttpStatus.OK)
    @Post('/createWallet')
    @ApiOperation({summary: 'Create new wallet', description: 'Create new wallet from stellar'})
    @ApiResponse({status: 200, description: 'New wallet is successfully created'})
    createWallet(@Body() UserWallet: CreateUserWallet) {
        return this.stellarService.createWallet(UserWallet)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/getBalance')
    @ApiOperation({summary: 'Get balance in the account', description: 'Get balance in the account from stellar. You can also check this on https://laboratory.stellar.org/#explorer?resource=accounts&endpoint=single&network=test'})
    @ApiResponse({status: 200, description: 'Successfully get and return balance'})
    getBalance(@Body() account: Account) {
        return this.stellarService.getBalance(account)
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('/trustCoin')
    @ApiOperation({summary: 'Make wallet trust new coin type', description: 'Before transfer any coin type. Wallet must trust that coin type first. You can also check this on https://laboratory.stellar.org/#explorer?resource=accounts&endpoint=single&network=test . This service did not set limit on the maximun coin this wallet can receive. Used with candidate wallet only'})
    @ApiResponse({status: 200, description: 'The wallet is successfully trust new type of coin'})
    trustCoin(@Body() trustInfo: TrustInfoForCandidate) {
        return this.stellarService.trustCoin(trustInfo)
    }
        
    @HttpCode(HttpStatus.OK)
    @Post('/trustCoinWithLimit')
    @ApiOperation({summary: 'Make wallet trust new coin type', description: 'Before transfer any coin type. Wallet must trust that coin type first. You can also check this on https://laboratory.stellar.org/#explorer?resource=accounts&endpoint=single&network=test . This service limit on the maximun coin this wallet can receive (which is 1). Used with voter wallet only'})
    @ApiResponse({status: 200, description: 'The wallet is successfully trust new type of coin with limit of 1'})
    trustCoinWithLimit(@Body() trustInfo: TrustInfo) {
        return this.stellarService.trustCoinWithLimit(trustInfo)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/getCoin')
    @ApiOperation({summary: 'Generate new coin for the wallet', description: 'Add new coin to the wallet'})
    @ApiResponse({status: 200, description: 'Successfully add new coin'})
    getCoin(@Body() GetCoin: GetCoin) {
        return this.stellarService.getCoin(GetCoin)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/vote')
    @ApiOperation({summary: 'Transfer one coin to another wallet', description: 'Represent voting by transfering a coin'})
    @ApiResponse({status: 200, description: 'Successfully vote'})
    vote(@Body() SendCoin: SendCoin) {
        return this.stellarService.vote(SendCoin)
    }
}