import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, HttpCode, HttpStatus, Post} from "@nestjs/common";
import { CreateElectionService } from "./createElection.service";
import {CreateElectionDto} from "./dto/CreateElections.dto";


@ApiTags('CreateElection')
@Controller('api/create-election')
export class CreateElectionController{
    constructor(
        private createElectionService: CreateElectionService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('create-area')
    createArea(@Body() CreateElection:CreateElectionDto){
        return this.createElectionService.CreateElectionArea(CreateElection)
    }

    @Get('all-sub-area')
    getAllSubArea(){
        return this.createElectionService.GetSubArea()
    }
}