import { Router } from 'express';

import controller from '../controllers/courses.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/courses.schema.js';

const router = Router();

router.get(
    '/',
    validation(schema.list, 'query'),
    controller.list,
);

router.post(
    '/',
    validation(schema.createCourse, 'body'),
    controller.create,
);

router.get(
    '/:id',
    validation(schema.idParam, 'params'),
    controller.getById,
);

export default router;