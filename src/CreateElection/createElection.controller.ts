import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, HttpCode, HttpStatus, Post} from "@nestjs/common";
import { CreateElectionService } from "./createElection.service";
import {Candidate, CreateElectionDto, Issuer, CitizenId} from "./dto/CreateElections.dto";


@ApiTags('CreateElection')
@Controller('api/create-election')
export class CreateElectionController{
    constructor(
        private createElectionService: CreateElectionService,
    ) {
    }

    @Post('all-sub-area')
    getAllSubArea(@Body() citizenId: CitizenId){
        return this.createElectionService.GetSubArea(citizenId)
    }

    @HttpCode(HttpStatus.OK)
    @Post('addIssuer')
    addIssuer(@Body() issuer: Issuer){
        return this.createElectionService.addIssuer(issuer)
    }
    
    @HttpCode(HttpStatus.OK)
    @Get('getIssuer')
    getIssuer(){
        return this.createElectionService.getIssuer() 
    }

    @HttpCode(HttpStatus.OK)
    @Get('deleteIssuer')
    deleteIssuer(){
        return this.createElectionService.deleteIssuer()
    }

    @HttpCode(HttpStatus.OK)
    @Post('addCandidate')
    addCandidateInfo(@Body() candidate: Candidate){
        return this.createElectionService.addCandidateInfo(candidate)
    }

}