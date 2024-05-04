import { IStudent } from "../../Domain/Ports/IStudent";

export class CreateStudenUseCase {
    constructor(readonly studentRepository:IStudent){}

    async run(name:string, lastname:string, matricula:string):Promise<any> {
        return await this.studentRepository.createStudent(name, lastname, matricula);
    }
}