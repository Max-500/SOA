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

export type DatabaseType = 'MySQL' | 'MongoDB';
const dbType: DatabaseType = 'MongoDB';

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

const StudentRepository = GetStudentRepository(dbType);
const SubjectRepository = GetSubjectRepository(dbType);
const TutorRepository = GetTutorRepository(dbType); 

const createSubjectUseCase = new CreateSubjectUseCase(SubjectRepository);
export const createSubjectController = new CreateSubjectController(createSubjectUseCase);

const createStudenUseCase = new CreateStudenUseCase(StudentRepository);
export const createStudentController = new CreateStudentController(createStudenUseCase);

const assignSubjectToStudentUseCase = new AssignSubjectToStudentUseCase(StudentRepository);
export const assignSubjectToStudentController = new AssignToSubjectToStudentController(assignSubjectToStudentUseCase);

const getAllStudentsUseCase = new GetAllStudentsUseCase(StudentRepository);
export const getAllStudentsController = new GetAllStudentsController(getAllStudentsUseCase);

const getStudentSubjectUseCase = new GetStudentSubjectsUseCase(StudentRepository);
export const getStudentSubjectsController = new GetStudentSubjectController(getStudentSubjectUseCase);

const createTutorUseCase = new CreateTutorUseCase(TutorRepository);
export const createTutorController = new CreateTutorController(createTutorUseCase);

const assignStudentToTutorUseCase = new AssignStudentToTutorUseCase(TutorRepository);
export const assingStudentToTutorController = new AssignStudentToATutorController(assignStudentToTutorUseCase);

const getAllTutoredUseCase = new GetAllTutoredUseCase(TutorRepository);
export const getAllTutoredController = new GetAllTutoredController(getAllTutoredUseCase);

const getAllStudentsFromATutorUseCase = new GetAllStudentsFromATutorUseCase(TutorRepository);
export const getAllStudentsFromATutorController = new GetAllStudentsFromATutorController(getAllStudentsFromATutorUseCase);