import { DatabaseType } from "../Dependencies";
import { StudentMongoRepository } from "./MongoDB/StudentRepository";
import { StudentMySQLRepository } from "./MySQL/StudentRepository";

export function GetStudentRepository(dbType:DatabaseType): StudentMySQLRepository | StudentMongoRepository {
    if (dbType === 'MySQL') return new StudentMySQLRepository();
    else return new StudentMongoRepository();
}