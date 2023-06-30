import {ILink, ITokenData, IUser} from "../../src/interfaces";

declare global {
	namespace Express {
		interface Request {
			userInDb: IUser;
			userTokens: ITokenData;
			link: ILink;
		}
	}
}
