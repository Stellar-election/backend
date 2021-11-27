import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {ElectionService} from "./election.service";
import {CreateUserWallet, AreaName} from "./dto/UserVote.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Vote')
@Controller('api/vote')
export class ElectionController {
    constructor(
        private electionService: ElectionService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Get('/election-area/:citizenId')
    @ApiOperation({ summary: "Get all area citizen id can be vote." })
    @ApiResponse({ status: 200, description: "return all area already to vote." })
    getElectionArea(@Param('citizenId') citizenId: string) {
        return this.electionService.getElectionArea(citizenId);
    }

    @Post('/create-wallet')
    @ApiOperation({ summary: "Create user wallet from citizen id,back laser card id and password." })
    @ApiResponse({ status: 200, description: "return wallet key was create." })
    createWallet(@Body() UserWallet: CreateUserWallet){
        return this.electionService.createUserWallet(UserWallet)
    }

    @Post('/getCandidate')
    @ApiOperation({ summary: "Get all candidate in this area name." })
    @ApiResponse({ status: 200, description: "return all candidate in this area." })
    getCandidate(@Body() areaName: AreaName){
        return this.electionService.getCandidate(areaName)
    }
}