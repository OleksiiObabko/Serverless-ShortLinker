import {ILink} from "../interfaces";

const linkPresenter = (link: ILink): ILink => {
	const {user_id, originalUrl, shortUrl, isActive, visits, isOneTime, activeUntil} = link;
	return {
		user_id,
		originalUrl,
		shortUrl,
		isActive,
		visits,
		isOneTime,
		activeUntil,
	};
};

export {linkPresenter};
