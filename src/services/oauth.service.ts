import {hash, compare} from "bcryptjs";
import {sign} from "jsonwebtoken";

import {ACCESS_LIFE_TIME, ACCESS_SECRET, REFRESH_LIFE_TIME, REFRESH_SECRET} from "../configs";
import {ITokenPair} from "../interfaces";

const hashPassword = (password: string): Promise<string> => hash(password, 10);

const checkPassword = (password: string, hashedPassword: string): Promise<boolean> => compare(password, hashedPassword);

interface dataToSign {
	[key: string]: string;
}

const generateTokenPair = (dataToSign: dataToSign): ITokenPair => {
	const accessToken: string = sign(dataToSign, ACCESS_SECRET, {expiresIn: ACCESS_LIFE_TIME});
	const refreshToken: string = sign(dataToSign, REFRESH_SECRET, {expiresIn: REFRESH_LIFE_TIME});

	return {accessToken, refreshToken};
};

export {hashPassword, checkPassword, generateTokenPair};
