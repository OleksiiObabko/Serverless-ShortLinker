import {Router} from "express";

import {isBodySignUpValid, isEmailUnique} from "../middlewares";
import {signUp} from "../controllers";

const oauthRouter = Router();

oauthRouter.post(
	"/sign-up",
	isBodySignUpValid,
	isEmailUnique,
	signUp
);

export {oauthRouter};
