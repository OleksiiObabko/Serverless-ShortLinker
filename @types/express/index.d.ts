import {ITokenData, IUser} from "../../src/interfaces";

declare global {
	namespace Express {
		interface Request {
			userInDb: IUser;
			userTokens: ITokenData;
		}
	}
}
