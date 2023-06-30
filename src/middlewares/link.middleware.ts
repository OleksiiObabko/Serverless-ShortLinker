import {NextFunction, Request, Response} from "express";

import {createLinkValidator} from "../validators";
import {ApiError} from "../errors";
import {checkShortId} from "../services";
import {LINK_NOT_ACTIVE, LINK_NOT_FOUND, LINK_NOT_YOURS, SHORT_URL_NOT_VALID} from "../enums";
import {findByShort} from "../repositories";
import {ILink} from "../interfaces";

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

const isShortLinkValid = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const isValid = checkShortId(req.params.shortUrl);

		if (!isValid) return next(new ApiError(SHORT_URL_NOT_VALID, 400));

		next();
	} catch (e) {
		next(e);
	}
};

const isLinkYours = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const link: ILink | undefined = await findByShort(req.params.shortUrl);

		if (!link) return next(new ApiError(LINK_NOT_FOUND, 404));
		if (link?.user_id !== req.userTokens.user_id) return next(new ApiError(LINK_NOT_YOURS, 400));

		next();
	} catch (e) {
		next(e);
	}
};

const isLinkActive = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const link: ILink | undefined = await findByShort(req.params.shortUrl);

		if (!link) return next(new ApiError(LINK_NOT_FOUND, 404));
		if (!link.isActive) return next(new ApiError(LINK_NOT_ACTIVE, 400));

		req.link = link;
		next();
	} catch (e) {
		next(e);
	}
};

export {isBodyCreateValid, isShortLinkValid, isLinkYours, isLinkActive};
