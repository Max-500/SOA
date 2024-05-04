import { Student } from "../../../Domain/Entities/Student";
import { Tutor } from "../../../Domain/Entities/Tutor";
import { ITutor } from "../../../Domain/Ports/ITutor";

export class TutorRepository implements ITutor {
    async assignAStudentToATutor(uuid: string, studentUUID: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getAllTutored(): Promise<any[] | Tutor[]> {
        throw new Error("Method not implemented.");
    }
    async createTutor(name: string, lastname: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getAllStudentsFromATutor(uuid: string): Promise<any[] | Student[]> {
        throw new Error("Method not implemented.");
    }
}