import {Module} from "@nestjs/common";
import {CreateElectionService} from "./createElection.service";
import {CreateElectionController} from "./createElection.controller";

@Module({
    providers:[CreateElectionService],
    controllers:[CreateElectionController],
    exports:[CreateElectionService]
})

export class CreateElectionModule{}