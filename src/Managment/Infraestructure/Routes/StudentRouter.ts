import { Router } from "express";
import { createStudentController } from "../Dependencies";

const StudentRouter:Router = Router();

// Obtener todos los estudiantes
StudentRouter.get('', );

// Asignar una materia a un alumno
StudentRouter.post('/:student/subjects/:subject');

// Crear un estudiante
StudentRouter.post('', createStudentController.run.bind(createStudentController));

// Obtener las materias de un alumno
StudentRouter.get('/:student/subjects', );

export default StudentRouter;