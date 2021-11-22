import {Module} from "@nestjs/common";
import {ElectionController} from "./election.controller";
import {ElectionService} from "./election.service";

@Module({
    providers: [ElectionService],
    controllers: [ElectionController],
    exports: [ElectionService],
})
export class ElectionModule {
}