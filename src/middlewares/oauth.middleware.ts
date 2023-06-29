import {NextFunction, Request, Response} from "express";

import {signUpValidator} from "../validators";
import {ApiError} from "../errors";
import {findTokenPair, getOneByEmail} from "../repositories";
import {checkPassword, checkToken, getV4Uuid} from "../services";
import {
	ACCESS_TOKEN_TYPE, NO_TOKEN,
	NO_TOKEN_IN_DB,
	USER_EMAIL_EXISTS,
	WRONG_LOGIN_OR_PASS,
} from "../enums";
import {removeBearer} from "../helpers";
import {IRequestBody, ITokenData, IUser} from "../interfaces";

const isBodySignUpValid = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {error, value} = signUpValidator.validate(req.body);

		if (error) return next(new ApiError(error.message, 400));

		req.body = {
			id: getV4Uuid(),
			email: value!.email,
			password: value!.password,
		};
		next();
	} catch (e) {
		next(e);
	}
};

const isEmailUnique = async (req: IRequestBody<IUser>, res: Response, next: NextFunction) => {
	try {
		const userInDb: IUser | undefined = await getOneByEmail(req.body.email);

		if (userInDb) return next(new ApiError(USER_EMAIL_EXISTS, 409));

		next();
	} catch (e) {
		next(e);
	}
};

const isBodyLoginValid = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const validatedBody = signUpValidator.validate(req.body);

		if (validatedBody.error) return next(new ApiError(WRONG_LOGIN_OR_PASS, 401));

		req.body = validatedBody.value;
		next();
	} catch (e) {
		next(e);
	}
};

const isUserExistsByEmail = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userInDb: IUser | undefined = await getOneByEmail(req.body.email);

		if (!userInDb) return next(new ApiError(WRONG_LOGIN_OR_PASS, 401));

		req.userInDb = userInDb;
		next();
	} catch (e) {
		next(e);
	}
};

const isPasswordsSame = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {body, userInDb} = req;

		const isPasswordsSame: boolean = await checkPassword(body.password, userInDb.password);

		if (!isPasswordsSame) return next(new ApiError(WRONG_LOGIN_OR_PASS, 401));

		next();
	} catch (e) {
		next(e);
	}
};

const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const header = req.get("Authorization");
		if (!header) return next(new ApiError(NO_TOKEN, 401));

		const accessToken: string = removeBearer(header);
		checkToken(accessToken, ACCESS_TOKEN_TYPE);

		const tokensInDb: ITokenData | undefined = await findTokenPair(accessToken);
		if (!tokensInDb) return next(new ApiError(NO_TOKEN_IN_DB, 401));

		req.userTokens = tokensInDb;
		next();
	} catch (e) {
		next(e);
	}
};

export {
	isBodySignUpValid,
	isEmailUnique,
	isBodyLoginValid,
	isUserExistsByEmail,
	isPasswordsSame,
	checkAccessToken,
};
