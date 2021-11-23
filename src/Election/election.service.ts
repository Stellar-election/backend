import {Injectable} from "@nestjs/common";
import {user_area, candidate} from "./models/elections.entity";
import {CreateUserWallet, AreaName} from "./dto/UserVote.dto";
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

    async getCandidate(areaName: AreaName) {
        return [...new Set(await candidate.find({
            select: ["citizenId","first_name","last_name","party","wallet_address"],
            where: {
                major_area_name : areaName.areaName,
            },
        }))]
    }
}