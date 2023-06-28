import {NextFunction, Request, Response} from "express";

import {createTokenPair, createUser} from "../repositories";
import {generateTokenPair, hashPassword} from "../services";
import {IRequestBody, ITokenPair, IUser} from "../interfaces";

const signUp = async (req: IRequestBody<IUser>, res: Response, next: NextFunction) => {
	try {
		const {password} = req.body;
		const hashedPassword: string = await hashPassword(password);

		await createUser({...req.body, password: hashedPassword});

		res.sendStatus(201);
	} catch (e) {
		next(e);
	}
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {id, email} = req.userInDb;

		const tokenPair: ITokenPair = generateTokenPair({email});
		const tokenPairInDb = await createTokenPair(tokenPair, id);

		res.status(200).json(tokenPairInDb);
	} catch (e) {
		next(e);
	}
};

export {signUp, signIn};
