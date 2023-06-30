import {Router} from "express";

import {checkAccessToken, isBodyCreateValid} from "../middlewares";
import {createLink, getMyLinks} from "../controllers";

const linkRouter: Router = Router();

linkRouter.post(
	"/",
	isBodyCreateValid,
	checkAccessToken,
	createLink,
);

linkRouter.get(
	"/",
	checkAccessToken,
	getMyLinks,
);

export {linkRouter};
