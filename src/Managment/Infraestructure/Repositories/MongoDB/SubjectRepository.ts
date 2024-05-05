import { Subject } from "../../../Domain/Entities/Subject";
import { ISubject } from "../../../Domain/Ports/ISubject";
import { isEmpty } from "../../Helpers/Rules";
import SubjectModel from "../../Models/MongoDB/SubjectModel";

export class SubjectMongoDBRepository implements ISubject {
    async createASubject(name: string): Promise<any> {
        try {
            if(isEmpty([name])){
                return {
                    status: 400,
                    error: 'You are sending empty fields.'
                }
            }
            const subject = new Subject(name);
            await SubjectModel.create(subject);
            return {
                status: 201,
                message: "The subject was created correctly.",
                data: {
                    "type": "subject",
                    "uuid": subject.uuid,
                    "attributes": {
                        "name": subject.name
                    }
                }
            }
        } catch (error:any) {
            if(error.errorResponse.errmsg.includes("duplicate key error collection")){
                const keys = Object.keys(error.errorResponse.keyValue);
                const errorMessage = `The following data must be unique: ${keys.join(", ")}`;
                return {
                    status: 400,
                    error: errorMessage
                }
            }
            return {
                status: 500,
                error: error
            }
        }
    }
}