import {Router} from "express";

import {checkAccessToken, isBodyCreateValid, isLinkYours, isShortLinkValid} from "../middlewares";
import {createLink, deactivateLink, getMyLinks} from "../controllers";

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

linkRouter.put(
	"/:shortUrl",
	isShortLinkValid,
	checkAccessToken,
	isLinkYours,
	deactivateLink,
);

export {linkRouter};
