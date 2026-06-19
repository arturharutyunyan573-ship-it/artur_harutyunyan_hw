import HttpErrors from 'http-errors';

import {
    Courses,
    Students,
} from '../models/index.js';

export default {
    async create(req, res, next) {
        try {
            const course = await Courses.create(req.body);

            res.json(course);
        } catch (e) {
            next(e);
        }
    },

    async list(req, res, next) {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);

            const offset = (page - 1) * limit;

            const { rows, count } = await Courses.findAndCountAll({
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
            const course = await Courses.findByPk(req.params.id, {
                include: {
                    model: Students,
                    as: 'students',
                },
            });

            if (!course) {
                throw new HttpErrors(404, 'Course not found');
            }

            res.json(course);
        } catch (e) {
            next(e);
        }
    },
};