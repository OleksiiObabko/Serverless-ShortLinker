import {NextFunction, Response} from "express";

import {createUser} from "../repositories";
import {hashPassword} from "../services";

import {IRequestBody, IUserInterface} from "../interfaces";

const signUp = async (req: IRequestBody<IUserInterface>, res: Response, next: NextFunction) => {
	try {
		const {password} = req.body;

		const hashedPassword: string = await hashPassword(password);

		await createUser({...req.body, password: hashedPassword});

		res.sendStatus(201);
	} catch (e) {
		next(e);
	}
};

export {signUp};
