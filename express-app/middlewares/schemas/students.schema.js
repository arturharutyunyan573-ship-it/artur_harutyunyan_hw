import Joi from 'joi';

export default {
    createStudent: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().allow('', null),
    }),

    enroll: Joi.object({
        courseId: Joi.number().integer().positive().required(),
        semester: Joi.string().max(20).required(),
    }),

    grade: Joi.object({
        grade: Joi.string()
            .valid('A', 'B', 'C', 'D', 'F')
            .required(),
    }),

    list: Joi.object({
        page: Joi.number().integer().min(1).max(1000).default(1),
        limit: Joi.number().integer().min(5).max(50).default(10),
    }),

    idParam: Joi.object({
        id: Joi.number().integer().positive().required(),
        courseId: Joi.number().integer().positive(),
    }),
};