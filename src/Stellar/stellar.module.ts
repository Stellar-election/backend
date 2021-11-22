import {Module} from "@nestjs/common";
import {StellarController} from "./stellar.controller";
import {StellarService} from "./stellar.service";

@Module({
    providers: [StellarService],
    controllers: [StellarController],
    exports: [StellarService],
})
export class StellarModule {
}
