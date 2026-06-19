import { Router } from 'express';

import controller from '../controllers/students.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/students.schema.js';

const router = Router();

router.get(
    '/',
    validation(schema.list, 'query'),
    controller.list,
);

router.post(
    '/',
    validation(schema.createStudent, 'body'),
    controller.create,
);

router.get(
    '/:id',
    validation(schema.idParam, 'params'),
    controller.getById,
);

router.post(
    '/:id/courses',
    validation(schema.idParam, 'params'),
    validation(schema.enroll, 'body'),
    controller.enroll,
);

router.put(
    '/:id/courses/:courseId',
    validation(schema.idParam, 'params'),
    validation(schema.grade, 'body'),
    controller.grade,
);

router.delete(
    '/:id/courses/:courseId',
    validation(schema.idParam, 'params'),
    controller.unenroll,
);

export default router;