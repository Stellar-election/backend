import {Injectable} from "@nestjs/common";
import {user_area} from "./models/elections.entity";
import {CreateUserWallet} from "./dto/UserVote.dto";
require('lodash');
@Injectable()
export class ElectionService {
    async getElectionArea(citizenId: string) {
        return await user_area.find(
            {
                where: {
                    citizen_id: citizenId,
                    area_usea: false
                }
            }
        )
    }

    async createUserWallet(UserWallet:CreateUserWallet){
        const CitizenId = UserWallet.citizenId
        const BackCard = UserWallet.backCard
        const Password = UserWallet.password

        return "Wallet Key"

    }
}