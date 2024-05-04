import { DatabaseConfig } from "../../Database/Config/IDatabaseConfig";
import { MongoConfig } from "../../Database/Config/MongoDB/MongoDBConfig";
import { MySQLConfig } from "../../Database/Config/MySQL/MySQLConfig";
import { CreateStudenUseCase } from "../Application/UseCase/CreateStudentUseCase";
import { CreateStudentController } from "./Controllers/CreateStudentController";
import { GetStudentRepository } from "./Repositories/GetRepositories";
import { StudentMongoRepository } from "./Repositories/MongoDB/StudentRepository";
import { StudentMySQLRepository } from "./Repositories/MySQL/StudentRepository";

export type DatabaseType = 'MySQL' | 'MongoDB';
const dbType: DatabaseType = 'MySQL';

function getDatabaseConfig(): DatabaseConfig {
    if (dbType === 'MySQL') {
      return new MySQLConfig();
    } else if (dbType === 'MongoDB') {
      return new MongoConfig();
    }
    throw new Error('Unsupported repository type');
}

const dbConfig = getDatabaseConfig();
dbConfig.initialize().then(() => {
  console.log('Database initialized.')
});

const StudentRepository: StudentMySQLRepository|StudentMongoRepository = GetStudentRepository(dbType);

const createStudenUseCase = new CreateStudenUseCase(StudentRepository);
export const createStudentController = new CreateStudentController(createStudenUseCase);