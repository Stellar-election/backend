import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateElectionService } from "./createElection.service";
import { Candidate, CreateElectionDto, Issuer, CitizenId } from "./dto/CreateElections.dto";


@ApiTags('CreateElection')
@Controller('api/create-election')
export class CreateElectionController {
    constructor(
        private createElectionService: CreateElectionService,
    ) {
    }

    @Post('all-sub-area')
    @ApiOperation({ summary: "Get all area this citizen is can be vote." })
    @ApiResponse({ status: 200, description: "return all area already to vote." })
    getAllSubArea(@Body() citizenId: CitizenId) {
        return this.createElectionService.GetSubArea(citizenId)
    }

    @HttpCode(HttpStatus.OK)
    @Post('addIssuer')
    @ApiOperation({ summary: "Add new account to database" })
    @ApiResponse({ status: 200, description: "return account has recently add and secret" })
    addIssuer(@Body() issuer: Issuer) {
        return this.createElectionService.addIssuer(issuer)
    }

    @HttpCode(HttpStatus.OK)
    @Get('getIssuer')
    @ApiOperation({ summary: "Get account from database" })
    @ApiResponse({ status: 200, description: "return account and secret" })
    getIssuer() {
        return this.createElectionService.getIssuer()
    }

    @HttpCode(HttpStatus.OK)
    @Get('deleteIssuer')
    @ApiOperation({ summary: "Delete account in database" })
    @ApiResponse({ status: 200, description: "return account and suscess status" })
    deleteIssuer() {
        return this.createElectionService.deleteIssuer()
    }

    @HttpCode(HttpStatus.OK)
    @Post('addCandidate')
    @ApiOperation({ summary: "Add new candidate to database" })
    @ApiResponse({ status: 200, description: "Nothing return" })
    addCandidateInfo(@Body() candidate: Candidate) {
        return this.createElectionService.addCandidateInfo(candidate)
    }

}