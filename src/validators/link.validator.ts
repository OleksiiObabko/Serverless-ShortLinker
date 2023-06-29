import Joi, {ObjectSchema} from "joi";

import {ILinkBody} from "../interfaces";
import {URL} from "../enums";

const createLinkValidator: ObjectSchema<ILinkBody> = Joi.object({
	originalUrl: Joi.string().regex(URL).required().messages({
		"string.base": "originalUrl must be a string",
		"string.pattern.base": "Invalid URL",
		"any.required": "originalUrl is required",
	}),
	isOneTime: Joi.boolean().required().messages({
		"boolean.base": "isOneTime must be a boolean",
		"any.required": "isOneTime is required",
	}),
	activeDays: Joi.number().required().when("isOneTime", {
		is: true,
		then: Joi.number().valid(0),
		otherwise: Joi.number().valid(1, 3, 7),
	}),
});

export {createLinkValidator};
