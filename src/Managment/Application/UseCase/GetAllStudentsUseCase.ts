import { Student } from "../../Domain/Entities/Student";
import { IStudent } from "../../Domain/Ports/IStudent";

export class GetAllStudentsUseCase {
    constructor(readonly studentRepository:IStudent){}

    async run() {
        return await this.studentRepository.getAllStudents();
    }
}