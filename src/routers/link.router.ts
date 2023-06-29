import {Router} from "express";

import {checkAccessToken, isBodyCreateValid} from "../middlewares";
import {createLink} from "../controllers";

const linkRouter: Router = Router();

linkRouter.post(
	"/",
	isBodyCreateValid,
	checkAccessToken,
	createLink,
);

export {linkRouter};
