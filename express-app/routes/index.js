import { Router } from 'express';

import usersRouter from './users.js';
import postsRouter from './posts.js';

import studentsRouter from './students.js';
import coursesRouter from './courses.js';

const router = Router();

router.get('/', function (req, res, next) {
    res.render('home');
});

router.use('/users', usersRouter);
router.use('/posts', postsRouter);

router.use('/students', studentsRouter);
router.use('/courses', coursesRouter);

export default router;