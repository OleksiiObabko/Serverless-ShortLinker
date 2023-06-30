import {NextFunction, Request, Response} from "express";

import {create, deactivate, findByShort, getList} from "../repositories";
import {generateShortId, getSomeDaysAfter} from "../services";
import {linkPresenter} from "../presenters";
import {ILink, ILinkBody, IRequestBody} from "../interfaces";
import {ApiError} from "../errors";
import {LINK_NOT_FOUND} from "../enums";

const createLink = async (req: IRequestBody<ILinkBody>, res: Response, next: NextFunction) => {
	try {
		const {userTokens} = req;
		const {originalUrl, activeDays, isOneTime} = req.body;

		const shortUrl: string = await generateShortId();

		const link: ILink = {
			user_id: userTokens.user_id,
			originalUrl,
			shortUrl: shortUrl,
			isActive: true,
			visits: 0,
			isOneTime,
			activeUntil: getSomeDaysAfter(activeDays),
		};

		await create(link);

		res.status(201).json(linkPresenter(link));
	} catch (e) {
		next(e);
	}
};

const getMyLinks = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {user_id} = req.userTokens;

		const myLinks = await getList(user_id);

		res.status(200).json(myLinks);
	} catch (e) {
		next(e);
	}
};

const deactivateLink = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deactivate(req.params.shortUrl);

		res.sendStatus(204);
	} catch (e) {
		next(e);
	}
};

const redirectToOriginal = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {shortUrl} = req.params;
		const link = await findByShort(shortUrl);

		if (!link?.originalUrl) return next(new ApiError(LINK_NOT_FOUND, 404));

		res.redirect(link.originalUrl);
	} catch (e) {
		next(e);
	}
};

export {createLink, getMyLinks, deactivateLink, redirectToOriginal};
