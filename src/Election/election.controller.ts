import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {ElectionService} from "./election.service";
import {CreateUserWallet} from "./dto/UserVote.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Vote')
@Controller('api/vote')
export class ElectionController {
    constructor(
        private electionService: ElectionService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Get('/election-area/:citizenId')
    getElectionArea(@Param('citizenId') citizenId: string) {
        return this.electionService.getElectionArea(citizenId);
    }

    @Post('/create-wallet')
    createWallet(@Body() UserWallet: CreateUserWallet){
        return this.electionService.createUserWallet(UserWallet)
    }
}