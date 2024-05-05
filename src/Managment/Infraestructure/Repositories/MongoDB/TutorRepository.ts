import { Student } from "../../../Domain/Entities/Student";
import { Tutor } from "../../../Domain/Entities/Tutor";
import { ITutor } from "../../../Domain/Ports/ITutor";
import { isEmpty } from "../../Helpers/Rules";
import { FromDataToStudent } from "../../Mappers/StudentMapper";
import { FromDataToTutor } from "../../Mappers/TutorMapper";
import StudentModel from "../../Models/MongoDB/StudentModel";
import TutorModel from "../../Models/MongoDB/TutorModel";

export class TutorMongoDBRepository implements ITutor {
    async assignAStudentToATutor(uuid: string, studentUUID: string): Promise<any> {
        try {
            const studentIsExists = await StudentModel.findOne({ uuid: studentUUID })
            if (!studentIsExists) {
                return {
                    status: 404,
                    error: 'The student was not found.'
                }
            }

            const tutor = await TutorModel.findOne({ uuid: uuid });
            if (!tutor) {
                return {
                    status: 400,
                    error: 'The tutor was not found.'
                }
            }

            const students = tutor.students as string[];
            if (students.includes(studentUUID)) {
                return {
                    status: 400,
                    error: `The tutor with the uuid ${uuid} and his name is ${tutor.name} ${tutor.lastname} has already assigned the student with uuid ${studentUUID} and his name is ${studentIsExists.name} ${studentIsExists.lastname}.`
                }
            }

            students.push(studentUUID);
            tutor.students = students;
            await tutor.save();

            return {
                status: 201,
                message: 'The student was assigned correctly.',
                data: {
                    "type": "student",
                    "uuid": studentUUID,
                    "attributes": {
                        "name": studentIsExists.name,
                        "lastname": studentIsExists.lastname,
                        "matricula": studentIsExists.matricula,
                        "relationships": {
                            "tutor": {
                              "data": { "type": "tutored", "uuid": uuid }
                            }
                          }
                    }
                },
                "included": [
                    {
                      "type": "tutored",
                      "uuid": uuid,
                      "attributes": {
                        "name": tutor.name,
                        "lastname": tutor.lastname
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
            const tutored = await TutorModel.find({});
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
            if (isEmpty([name, lastname])) {
                return {
                    status: 400,
                    message: 'You are sending empty fields.'
                }
            }
            const tutor = new Tutor(name, lastname);
            await TutorModel.create(tutor);
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
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
    async getAllStudentsFromATutor(uuid: string): Promise<any | Student[]> {
        try {
            const tutor: any = await TutorModel.findOne({ uuid: uuid });
            if (!tutor) {
                return {
                    status: 404,
                    message: 'The tutor was not found.'
                }
            }
        
            const students = await StudentModel.find({ uuid: { $in: tutor.students } });

            return {
                status: 200,
                data: FromDataToStudent(students)
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
}