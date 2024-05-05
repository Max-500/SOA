import Sequelize from "sequelize";
import sequelize from "../../../../Database/Config/MySQL/Database";
import { Student } from "../../../Domain/Entities/Student";
import { Subject } from "../../../Domain/Entities/Subject";
import { IStudent } from "../../../Domain/Ports/IStudent";
import { isEmpty } from "../../Helpers/Rules";
import { FromDataToStudent } from "../../Mappers/StudentMapper";
import { StudentModel } from "../../Models/MySQL/StudentModel";
import { StudentSubjectModel } from "../../Models/MySQL/StudentSubjectModel";
import { SubjectModel } from "../../Models/MySQL/SubjectModel";
import { FromDataToSubject } from "../../Mappers/SubjectMapper";
import { generateUuid } from "../../Helpers/Functions";

export class StudentMySQLRepository implements IStudent {
    async getAllStudents(): Promise<any | Student[]> {
        try {
            const students = await StudentModel.findAll();
            return {
                status: 200,
                data: FromDataToStudent(students)
            }
        } catch (error) {
            return {
                status:500,
                error: error
            }
        }
    }
    async assignASubjectToAStudent(student:string, subject:string): Promise<any> {
        try {
            const uuid = generateUuid()

            const isExistsStudent = await StudentModel.findByPk(student);
            if(!isExistsStudent){
                return {
                    status: 400,
                    error: 'The student was not found.'
                }
            }

            const subjectData = await SubjectModel.findByPk(subject);
            if (!subjectData){
                return {
                    status: 400,
                    error: 'The subject was not found.'
                }
            }

            const isExists = await StudentSubjectModel.findOne({ where: { subject_uuid: subject, student_uuid:student } })
            
            if(isExists){
                return {
                    status: 400,
                    error: `The student width uuid ${student} already takes the subject with uuid ${subject}.`
                }
            }

            await StudentSubjectModel.create({
                uuid: uuid,
                student_uuid: student,
                subject_uuid: subject
            });


            return {
                status: 201,
                message: "The subject was assigned correctly.",
                data: {
                    "type": "subject",
                    "uuid": subject,
                    "attributes": {
                        "name":subjectData?.dataValues.name
                    }
                }
            }
        } catch (error) {
            return {
                status:500,
                error:error
            }
        }
    }
    async createStudent(name: string, lastname: string, matricula: string): Promise<any> {
        try {
            if(isEmpty([name, lastname, matricula])){
                return {
                    status: 400,
                    error: 'You are sending empty fields.'
                }
            }
            const student:Student = new Student(name, lastname, matricula);
            await StudentModel.create({
                uuid: student.uuid,
                name: student.name,
                lastname: student.lastname,
                matricula: student.matricula
            })
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
            if(error.name == "SequelizeUniqueConstraintError"){
                return {
                    status: 400,
                    error: error.errors[0].message
                }
            }
            return {
                status: 500,
                error: error.errors[0].message
            }
        }
    }
    async getAllSubjectOfAStudent(uuid: string): Promise<any | Subject[]> {
        try {
            const query:string = `SELECT s.*
            FROM subjects s
            JOIN student_subjects ss ON s.uuid = ss.subject_uuid
            JOIN students st ON st.uuid = ss.student_uuid
            WHERE st.uuid = '${uuid}'`;

            const subjectsData: any[] = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

            return {
                status: 200,
                data: FromDataToSubject(subjectsData)
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }

}