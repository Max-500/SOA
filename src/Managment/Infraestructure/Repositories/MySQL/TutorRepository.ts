import Sequelize from "sequelize";
import sequelize from "../../../../Database/Config/MySQL/Database";
import { Student } from "../../../Domain/Entities/Student";
import { Tutor } from "../../../Domain/Entities/Tutor";
import { ITutor } from "../../../Domain/Ports/ITutor";
import { generateUuid } from "../../Helpers/Functions";
import { isEmpty } from "../../Helpers/Rules";
import { FromDataToTutor } from "../../Mappers/TutorMapper";
import { StudentModel } from "../../Models/MySQL/StudentModel";
import { TutorModel } from "../../Models/MySQL/TutorModel";
import { TutorStudentModel } from "../../Models/MySQL/TutorStudentModel";
import { FromDataToStudent } from "../../Mappers/StudentMapper";

export class TutorMySQLRepository implements ITutor {
    async assignAStudentToATutor(tutor: string, studentUUID: string): Promise<any> {
        try {
            const student = await StudentModel.findByPk(studentUUID);
            if(!student){
                return {
                    status: 404, 
                    error: 'The student was not found.'
                }
            }

            const alreadyHaveATutor = await TutorStudentModel.findOne({ where: { student_uuid: studentUUID } })
            if(alreadyHaveATutor){
                return {
                    status: 400,
                    error: `The student with uuid: ${studentUUID} and his name is: ${student.dataValues.name} ${student.dataValues.lastname} already has an assigned tutor.`
                }
            }

            const tutorIsExists = await TutorModel.findByPk(tutor);
            if(!tutorIsExists){
                return {
                    status: 400,
                    error: 'The tutor was not found.'
                }
            }
            
            await TutorStudentModel.create({
                uuid: generateUuid(),
                tutor_uuid: tutor,
                student_uuid: studentUUID
            });

            return {
                status: 201,
                message: 'The student was assigned correctly.',
                data: {
                    "type": "student",
                    "uuid": studentUUID,
                    "attributes": {
                        "name": student.dataValues.name,
                        "lastname": student.dataValues.lastname,
                        "matricula": student.dataValues.matricula,
                        "relationships": {
                            "tutor": {
                              "data": { "type": "tutored", "uuid": tutor }
                            }
                          }
                    }
                },
                "included": [
                    {
                      "type": "tutored",
                      "uuid": tutor,
                      "attributes": {
                        "name": tutorIsExists.dataValues.name,
                        "lastname": tutorIsExists.dataValues.lastname
                      }
                    }
                  ]
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
    async getAllTutored(): Promise<any | Tutor[]> {
        try {
            const tutored = await TutorModel.findAll();
            return {
                status: 200,
                data: FromDataToTutor(tutored)
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
    async createTutor(name: string, lastname: string): Promise<any> {
        try {
            if(isEmpty([name, lastname])){
                return {
                    status: 400,
                    error: 'You are sending empty fields.'
                }
            }
            const  tutor = new Tutor(name, lastname);
            await TutorModel.create({
                uuid: tutor.uuid,
                name: tutor.name,
                lastname: tutor.lastname
            });
            return {
                status: 201,
                message: "The tutor was created successfully.",
                data: {
                    "type": "tutor",
                    "uuid": tutor.uuid,
                    "attributes": {
                        "name": tutor.name,
                        "lastname": tutor.lastname
                    }
                }
            }
        } catch (error:any) {
            return {
                status: 500,
                error: error.errors[0].message
            }
        }
    }
    async getAllStudentsFromATutor(uuid: string): Promise<any | Student[]> {
        try {
            const query:string = `SELECT * FROM students
            JOIN tutors_tudents ON students.uuid = tutors_tudents.student_uuid
            JOIN tutoreds ON tutors_tudents.tutor_uuid = tutoreds.uuid
            WHERE tutoreds.uuid = '${uuid}';`
            const studentsData: any[] = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

            return {
                status: 200,
                data: FromDataToStudent(studentsData)
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
}