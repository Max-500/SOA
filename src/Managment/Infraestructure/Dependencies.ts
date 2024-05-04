import { DatabaseConfig } from "../../Database/Config/IDatabaseConfig";
import { MongoConfig } from "../../Database/Config/MongoDB/MongoDBConfig";
import { MySQLConfig } from "../../Database/Config/MySQL/MySQLConfig";
import { CreateStudenUseCase } from "../Application/UseCase/CreateStudentUseCase";
import { CreateStudentController } from "./Controllers/CreateStudentController";
import { GetStudentRepository, GetSubjectRepository, GetTutorRepository } from "./Repositories/GetRepositories";
import { StudentMongoDBRepository } from "./Repositories/MongoDB/StudentRepository";
import { SubjectMongoDBRepository } from "./Repositories/MongoDB/SubjectRepository";
import { TutorMongoDBRepository } from "./Repositories/MongoDB/TutorRepository";
import { StudentMySQLRepository } from "./Repositories/MySQL/StudentRepository";
import { SubjectMySQLRepository } from "./Repositories/MySQL/SubjectRepository";
import { TutorMySQLRepository } from "./Repositories/MySQL/TutorRepository";

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

const StudentRepository: StudentMySQLRepository | StudentMongoDBRepository = GetStudentRepository(dbType);
const SubjectRepository: SubjectMySQLRepository | SubjectMongoDBRepository = GetSubjectRepository(dbType);
const TutorRepository: TutorMySQLRepository | TutorMongoDBRepository = GetTutorRepository(dbType); 

const createStudenUseCase = new CreateStudenUseCase(StudentRepository);
export const createStudentController = new CreateStudentController(createStudenUseCase);