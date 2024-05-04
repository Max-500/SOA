import { Student } from "../../../Domain/Entities/Student";
import { Subject } from "../../../Domain/Entities/Subject";
import { IStudent } from "../../../Domain/Ports/IStudent";

export class StudentMongoDBRepository implements IStudent {
    async getAllStudents(): Promise<any[] | Student[]> {
        throw new Error("Method not implemented.");
    }
    async assignASubjectToAStudent(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async createStudent(name: string, lastname: string, matricula: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getAllSubjectOfAStudent(uuid: string): Promise<any[] | Subject[]> {
        throw new Error("Method not implemented.");
    }
}