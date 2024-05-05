import { Subject } from "../../../Domain/Entities/Subject";
import { ISubject } from "../../../Domain/Ports/ISubject";
import { isEmpty } from "../../Helpers/Rules";
import { SubjectModel } from "../../Models/MySQL/SubjectModel";

export class SubjectMySQLRepository implements ISubject {
    async createASubject(name: string): Promise<any> {
        try {
            if(isEmpty([name])){
                return {
                    status: 400,
                    message: 'You are sending empty fields.'
                }
            }
            const subject =  new Subject(name);
            await SubjectModel.create({
                uuid: subject.uuid,
                name: subject.name
            })
            return {
                status: 201,
                message: "Matter was created correctly.",
                data: {
                    "type": "subject",
                    "uuid": subject.uuid,
                    "attributes": {
                        "name": subject.name
                    }
                }
            }
        } catch (error:any) {
            if(error.name == "SequelizeUniqueConstraintError"){
                return {
                    status: 400,
                    message: error.errors[0].message
                }
            }
            return {
                status: 500,
                error: error.errors[0].message
            }
        }
    }
}