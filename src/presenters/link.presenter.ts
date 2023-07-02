import {BASE_URL} from "../configs";
import {ILink} from "../interfaces";

const linkPresenter = (link: ILink): ILink => {
	const {user_id, originalUrl, shortUrl, isActive, visits, isOneTime, activeUntil} = link;
	return {
		user_id,
		originalUrl,
		shortUrl: BASE_URL + "/" + shortUrl,
		isActive,
		visits,
		isOneTime,
		activeUntil
	};
};

const linksPresenter = (links: ILink[]): ILink[] =>
	links.map(link => {
		const {user_id, originalUrl, shortUrl, isActive, visits, isOneTime, activeUntil} = link;
		return {
			user_id,
			originalUrl,
			shortUrl: BASE_URL + "/" + shortUrl,
			isActive,
			visits,
			isOneTime,
			activeUntil
		};
	});


export {linkPresenter, linksPresenter};
