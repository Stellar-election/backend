import {Injectable} from "@nestjs/common";
import {Candidate, CreateElectionDto, Issuer, CitizenId} from "./dto/CreateElections.dto";
import {gorv_data, issuer, candidate} from "./models/createElections.entity";
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CreateElectionService {
 
    async GetSubArea(citizenId: CitizenId){
        return [...new Set(await gorv_data.find({
            select:["area_name"],
            where: {
                citizen_id : citizenId.citizenId,
                isvote: false
            },
            
        }))]
    }

    async addIssuer(issuerInfo: Issuer) {
        const new_issuer = issuer.create({
            account: issuerInfo.account,
            secret: issuerInfo.secret,
        })
        await issuer.save(new_issuer);

        return new_issuer
    }

    async getIssuer(){
        return [...new Set(await issuer.find({
            select:["account","secret"],
            take: 1
        }))]
    }

    async deleteIssuer() {
        const old_issuer = await this.getIssuer()
        const delete_issuer = issuer.delete({account: old_issuer[0].account})
        return { account: old_issuer[0].account, success: true }
    }

    async addCandidateInfo(candidateInfo: Candidate) {
        const new_candidate = candidate.create({
            citizenId: candidateInfo.citizenId,
            first_name: candidateInfo.first_name,
            last_name: candidateInfo.last_name,
            major_area_id: candidateInfo.major_area_id,
            major_area_name: candidateInfo.major_area_name,
            party: candidateInfo.party,
            wallet_address: candidateInfo.wallet_address,

        })
        await candidate.save(new_candidate);
    }

    

}