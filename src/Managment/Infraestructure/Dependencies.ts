import { DatabaseConfig } from "../../Database/Config/IDatabaseConfig";
import { MongoConfig } from "../../Database/Config/MongoDB/MongoDBConfig";
import { MySQLConfig } from "../../Database/Config/MySQL/MySQLConfig";
import { AssignStudentToTutorUseCase } from "../Application/UseCase/AssignStudentToATutorUseCase";
import { AssignSubjectToStudentUseCase } from "../Application/UseCase/AssignToSubjectToStudentUseCase";
import { CreateStudenUseCase } from "../Application/UseCase/CreateStudentUseCase";
import { CreateSubjectUseCase } from "../Application/UseCase/CreateSubjectUseCase";
import { CreateTutorUseCase } from "../Application/UseCase/CreateTutorUseCase";
import { GetAllStudentsFromATutorUseCase } from "../Application/UseCase/GetAllStudentsFromATutorUseCase";
import { GetAllStudentsUseCase } from "../Application/UseCase/GetAllStudentsUseCase";
import { GetAllTutoredUseCase } from "../Application/UseCase/GetAllTutoredUseCase";
import { GetStudentSubjectsUseCase } from "../Application/UseCase/GetStudentSubjectsUseCase";
import { AssignStudentToATutorController } from "./Controllers/AssignStudentToATutorController";
import { AssignToSubjectToStudentController } from "./Controllers/AssignToSubjectStudentController";
import { CreateStudentController } from "./Controllers/CreateStudentController";
import { CreateSubjectController } from "./Controllers/CreateSubjectController";
import { CreateTutorController } from "./Controllers/CreateTutorController";
import { GetAllStudentsController } from "./Controllers/GetAllStudentsController";
import { GetAllStudentsFromATutorController } from "./Controllers/GetAllStudentsFromATutorController";
import { GetAllTutoredController } from "./Controllers/GetAllTutoredController";
import { GetStudentSubjectController } from "./Controllers/GetStudentSubjectsController";
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

const StudentRepository: StudentMySQLRepository | StudentMongoDBRepository= GetStudentRepository(dbType);
const SubjectRepository: SubjectMySQLRepository | SubjectMongoDBRepository = GetSubjectRepository(dbType);
const TutorRepository: TutorMySQLRepository | TutorMongoDBRepository = GetTutorRepository(dbType); 

const createSubjectUseCase: CreateSubjectUseCase = new CreateSubjectUseCase(SubjectRepository);
export const createSubjectController: CreateSubjectController = new CreateSubjectController(createSubjectUseCase);

const createStudenUseCase: CreateStudenUseCase = new CreateStudenUseCase(StudentRepository);
export const createStudentController: CreateStudentController = new CreateStudentController(createStudenUseCase);

const assignSubjectToStudentUseCase: AssignSubjectToStudentUseCase = new AssignSubjectToStudentUseCase(StudentRepository);
export const assignSubjectToStudentController: AssignToSubjectToStudentController = new AssignToSubjectToStudentController(assignSubjectToStudentUseCase);

const getAllStudentsUseCase: GetAllStudentsUseCase = new GetAllStudentsUseCase(StudentRepository);
export const getAllStudentsController: GetAllStudentsController = new GetAllStudentsController(getAllStudentsUseCase);

const getStudentSubjectUseCase: GetStudentSubjectsUseCase = new GetStudentSubjectsUseCase(StudentRepository);
export const getStudentSubjectsController: GetStudentSubjectController = new GetStudentSubjectController(getStudentSubjectUseCase);

const createTutorUseCase: CreateTutorUseCase = new CreateTutorUseCase(TutorRepository);
export const createTutorController: CreateTutorController = new CreateTutorController(createTutorUseCase);

const assignStudentToTutorUseCase: AssignStudentToTutorUseCase = new AssignStudentToTutorUseCase(TutorRepository);
export const assingStudentToTutorController: AssignStudentToATutorController = new AssignStudentToATutorController(assignStudentToTutorUseCase);

const getAllTutoredUseCase: GetAllTutoredUseCase = new GetAllTutoredUseCase(TutorRepository);
export const getAllTutoredController: GetAllTutoredController = new GetAllTutoredController(getAllTutoredUseCase);

const getAllStudentsFromATutorUseCase: GetAllStudentsFromATutorUseCase = new GetAllStudentsFromATutorUseCase(TutorRepository);
export const getAllStudentsFromATutorController: GetAllStudentsFromATutorController = new GetAllStudentsFromATutorController(getAllStudentsFromATutorUseCase);