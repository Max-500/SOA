import { IStudent } from "../../Domain/Ports/IStudent";

export class GetStudentSubjectsUseCase {
    constructor(readonly studentRepository:IStudent){}

    async run(student:string) {
        return this.studentRepository.getAllSubjectOfAStudent(student);
    }
}