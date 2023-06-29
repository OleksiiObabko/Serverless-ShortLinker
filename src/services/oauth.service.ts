import {hash, compare} from "bcryptjs";
import {sign, verify} from "jsonwebtoken";

import {ACCESS_LIFE_TIME, ACCESS_SECRET, REFRESH_LIFE_TIME, REFRESH_SECRET} from "../configs";
import {ITokenPair} from "../interfaces";
import {ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE, TOKEN_NOT_VALID} from "../enums";
import {ApiError} from "../errors";

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

const checkToken = (token = "", tokenType = ACCESS_TOKEN_TYPE) => {
	try {
		let secretWord = "";

		switch (tokenType) {
		case ACCESS_TOKEN_TYPE:
			secretWord = ACCESS_SECRET;
			break;
		case REFRESH_TOKEN_TYPE:
			secretWord = REFRESH_SECRET;
			break;
		}

		return verify(token, secretWord);
	} catch (e) {
		throw new ApiError(TOKEN_NOT_VALID, 401);
	}
};

export {hashPassword, checkPassword, generateTokenPair, checkToken};
