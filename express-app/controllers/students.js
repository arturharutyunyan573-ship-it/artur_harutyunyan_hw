import HttpErrors from 'http-errors';

import {
    Students,
    Courses,
    Enrollments,
} from '../models/index.js';

export default {
    async create(req, res, next) {
        try {
            const student = await Students.create(req.body);

            res.json(student);
        } catch (e) {
            next(e);
        }
    },

    async list(req, res, next) {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);

            const offset = (page - 1) * limit;

            const { rows, count } = await Students.findAndCountAll({
                limit,
                offset,
            });

            res.json({
                result: rows,
                count,
                page,
                offset,
            });
        } catch (e) {
            next(e);
        }
    },

    async getById(req, res, next) {
        try {
            const student = await Students.findByPk(req.params.id, {
                include: {
                    model: Courses,
                    as: 'courses',
                    through: {
                        attributes: ['grade', 'semester'],
                    },
                },
            });

            if (!student) {
                throw new HttpErrors(404, 'Student not found');
            }

            res.json(student);
        } catch (e) {
            next(e);
        }
    },

    async enroll(req, res, next) {
        try {
            const student = await Students.findByPk(req.params.id);

            if (!student) {
                throw new HttpErrors(404, 'Student not found');
            }

            const course = await Courses.findByPk(req.body.courseId);

            if (!course) {
                throw new HttpErrors(404, 'Course not found');
            }

            const exists = await Enrollments.findOne({
                where: {
                    studentId: student.id,
                    courseId: course.id,
                },
            });

            if (exists) {
                throw new HttpErrors(422, {
                    errors: {
                        courseId: 'Student already enrolled',
                    },
                });
            }

            await student.addCourse(course, {
                through: {
                    semester: req.body.semester,
                    grade: null,
                },
            });

            res.json({
                message: 'Student enrolled successfully',
            });
        } catch (e) {
            next(e);
        }
    },

    async grade(req, res, next) {
        try {
            await Enrollments.update(
                {
                    grade: req.body.grade,
                },
                {
                    where: {
                        studentId: req.params.id,
                        courseId: req.params.courseId,
                    },
                },
            );

            res.json({
                message: 'Grade updated',
            });
        } catch (e) {
            next(e);
        }
    },

    async unenroll(req, res, next) {
        try {
            const student = await Students.findByPk(req.params.id);

            const course = await Courses.findByPk(req.params.courseId);

            await student.removeCourse(course);

            res.json({
                message: 'Ուսանողը հանված է դասընթացից',
            });
        } catch (e) {
            next(e);
        }
    },
};