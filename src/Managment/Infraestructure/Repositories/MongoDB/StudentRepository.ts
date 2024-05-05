import { Document } from "mongoose";
import { Student } from "../../../Domain/Entities/Student";
import { Subject } from "../../../Domain/Entities/Subject";
import { IStudent } from "../../../Domain/Ports/IStudent";
import StudentModel from "../../Models/MongoDB/StudentModel";
import SubjectModel from "../../Models/MongoDB/SubjectModel";
import { isEmpty } from "../../Helpers/Rules";
import { FromDataToStudent } from "../../Mappers/StudentMapper";
import { FromDataToSubject } from "../../Mappers/SubjectMapper";

export class StudentMongoDBRepository implements IStudent {
    async getAllStudents(): Promise<any | Student[]> {
        try {
            const students = await StudentModel.find({});
            return {
                status: 200,
                data: FromDataToStudent(students)
            }
        } catch (error:any) {
            return {
                status: 500, 
                error: error
            }
        }
    }
    async assignASubjectToAStudent(student:string, subject:string): Promise<any> {
        try {
            const studentData = await StudentModel.findOne({ uuid:student });
            if(!studentData){
                return {
                    status:404,
                    error:"The student was not found."
                }
            }
            const data = studentData.subjects_uuid as string[];
            data.push(subject);
            studentData.subjects_uuid = data;
            await studentData.save();
            return {
                status: 201,
                message: 'The subject was assigned correctly.'
            }
        } catch (error) {
            return {
                status:500,
                error: error
            }
        }
    }

    async createStudent(name: string, lastname: string, matricula: string): Promise<Student|any> {
        try {
            if(isEmpty([name, lastname, matricula])){
                return {
                    status: 400,
                    error: 'You are sending empty fields.'
                }
            }
            const student:Student = new Student(name, lastname, matricula);
            await StudentModel.create(student);
            return {
                status: 201,
                message: "The student was created successfully.",
                data: {
                    "type": "student",
                    "uuid": student.uuid,
                    "attributes": {
                        "name": student.name,
                        "lastname": student.lastname,
                        "matricula": student.matricula
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
    async getAllSubjectOfAStudent(uuid: string): Promise<any | Subject[]> {
        try {
            const student:any = await StudentModel.findOne({ uuid:uuid });
            if(!student){
                return {
                    status: 404,
                    error:"The student was not found-"
                }
            }
            const subjects = await SubjectModel.find({ uuid: { $in: student.subjects_uuid } });

            return {
                status: 200,
                data: FromDataToSubject(subjects)
            };
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }
}