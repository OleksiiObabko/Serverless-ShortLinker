import {Router} from "express";

import {
	isBodyLoginValid,
	isBodySignUpValid,
	isEmailUnique, isPasswordsSame,
	isUserExistsByEmail,
} from "../middlewares";
import {signIn, signUp} from "../controllers";

const oauthRouter = Router();

oauthRouter.post(
	"/sign-up",
	isBodySignUpValid,
	isEmailUnique,
	signUp,
);

oauthRouter.post(
	"/sign-in",
	isBodyLoginValid,
	isUserExistsByEmail,
	isPasswordsSame,
	signIn,
);

export {oauthRouter};
