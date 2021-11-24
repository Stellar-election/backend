import {Injectable} from "@nestjs/common";
import {Candidate, CreateElectionDto, Issuer, CitizenId} from "./dto/CreateElections.dto";
import {gorv_data, open_area, sub_area, issuer, candidate} from "./models/createElections.entity";
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CreateElectionService {
    // constructor(
    //     @InjectRepository(Album)
    //     private readonly albumRepository: Repository<Album>,
    //   ) {}
    async CreateElectionArea(CreateElection: CreateElectionDto) {
        const area = open_area.create({
            area_name: CreateElection.areaName,
            start_date: CreateElection.startDate,
            end_date: CreateElection.endDate
        })
        await area.save();

        // for (const sub in CreateElection.areaList) {

        //     const subArea = sub_area.create({
        //         major_area_id: area.id,
        //         major_area_name: area.area_name,
        //         area_name: sub
        //     })
        //     await subArea.save();
        // }

        return area
    }

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