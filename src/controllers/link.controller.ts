import {NextFunction, Request, Response} from "express";

import {create, getList} from "../repositories";
import {generateShortId, getSomeDaysAfter} from "../services";
import {linkPresenter} from "../presenters";
import {ILink, ILinkBody, IRequestBody} from "../interfaces";

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

export {createLink, getMyLinks};
