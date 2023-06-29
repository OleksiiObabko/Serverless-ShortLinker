import {generate} from "shortid";

import {findByShort} from "../repositories";
import {ApiError} from "../errors";
import {SHORT_URL_EXISTS} from "../enums";
import {ILink} from "../interfaces";

const generateShortId = async (): Promise<string> => {
	const shortUrl: string = generate();
	const shortUrlInDb: undefined | ILink = await findByShort(shortUrl);

	if (shortUrlInDb) throw new ApiError(SHORT_URL_EXISTS, 409);

	return shortUrl;
};

export {generateShortId};

