import { ISubject } from "../../../Domain/Ports/ISubject";

export class SubjectRepository implements ISubject {
    async createASubject(name: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}