import {Router} from "express";

import {checkAccessToken, isBodyCreateValid, isLinkActive, isLinkYours, isShortLinkValid} from "../middlewares";
import {createLink, deactivateLink, getMyLinks, redirectToOriginal} from "../controllers";

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

linkRouter.get(
	"/:shortUrl",
	isShortLinkValid,
	isLinkActive,
	redirectToOriginal,
);

export {linkRouter};
