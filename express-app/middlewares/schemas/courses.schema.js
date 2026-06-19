import Joi from 'joi';

export default {
    createCourse: Joi.object({
        title: Joi.string().min(2).max(100).required(),
        credits: Joi.number().integer().min(1).max(20),
    }),

    list: Joi.object({
        page: Joi.number().integer().min(1).max(1000).default(1),
        limit: Joi.number().integer().min(5).max(50).default(10),
    }),

    idParam: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};