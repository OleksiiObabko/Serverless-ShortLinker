import {Response, NextFunction, Request} from "express";

import {createUser, getUserById} from "./repository";

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {id} = req.body;
		await createUser(id);

		res.sendStatus(201);
	} catch (e) {
		next(e);
	}
};

const get = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await getUserById(req.params.userId);

		res.status(200).json(user);
	} catch (e) {
		next(e);
	}
};

export {get, create};
