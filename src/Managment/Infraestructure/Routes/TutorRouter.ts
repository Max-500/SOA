import { Router } from "express";

const TutorRouter:Router = Router();

// Asignar un alumno a un tutor
TutorRouter.post('/:tutor/students/:student', );

// Obtener todos los tutores
TutorRouter.get('', );

// Crear a un tutor
TutorRouter.post('', );

// Obtener todos los alumnos de un tutor
TutorRouter.get('/:tutor/students', );

export default TutorRouter;