import {Injectable} from "@nestjs/common";
import {CreateElectionDto} from "./dto/CreateElections.dto";
import {gorv_data, open_area, sub_area} from "./models/createElections.entity";

@Injectable()
export class CreateElectionService {
    async CreateElectionArea(CreateElection: CreateElectionDto) {
        const area = open_area.create({
            area_name: CreateElection.areaName,
            start_date: CreateElection.startDate,
            end_date: CreateElection.endDate
        })
        await area.save();

        for (const sub in CreateElection.areaList) {

            const subArea = sub_area.create({
                major_area_id: area.id,
                major_area_name: area.area_name,
                area_name: sub
            })
            await subArea.save();
        }

        return area
    }

    async GetSubArea(){
        return [...new Set(await gorv_data.find({
            select:["area_name"]
        }))]
    }
}