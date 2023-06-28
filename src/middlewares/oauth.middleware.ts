import {NextFunction, Request, Response} from "express";

import {signUpValidator} from "../validators";
import {ApiError} from "../errors";
import {getOneByEmail} from "../repositories";
import {getV4Uuid} from "../services";

import {IRequestBody, IUserInterface} from "../interfaces";

const isBodySignUpValid = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {error, value} = signUpValidator.validate(req.body);

		if (error) return next(new ApiError(error.message, 400));

		req.body = {
			id: getV4Uuid(),
			email: value!.email,
			password: value!.password
		};
		next();
	} catch (e) {
		next(e);
	}
};

const isEmailUnique = async (req: IRequestBody<IUserInterface>, res: Response, next: NextFunction) => {
	try {
		const userInDb: IUserInterface | undefined = await getOneByEmail(req.body.email);

		if (userInDb) return next(new ApiError("User with this email already exists", 409));

		next();
	} catch (e) {
		next(e);
	}
};

export {isBodySignUpValid, isEmailUnique};
