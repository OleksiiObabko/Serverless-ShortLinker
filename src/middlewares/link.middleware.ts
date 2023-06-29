import {NextFunction, Request, Response} from "express";

import {createLinkValidator} from "../validators";
import {ApiError} from "../errors";

const isBodyCreateValid = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {error, value} = createLinkValidator.validate(req.body);

		if (error) return next(new ApiError(error.message, 400));

		req.body = value;
		next();
	} catch (e) {
		next(e);
	}
};

export {isBodyCreateValid};
