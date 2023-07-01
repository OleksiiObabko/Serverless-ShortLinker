import {getCurrentDate, sendEmail} from "../services";
import {deactivateAllExpired, getOneById} from "../repositories";
import {NO_REPLY_EMAIL} from "../configs";
import {ApiError} from "../errors";
import {ILink, IUser} from "../interfaces";
import {DEACTIVATE_FAILED, EMAIL_NOT_SENT} from "../enums";

export const deactivateExpired = async () => {
	try {
		const currentDate = getCurrentDate();
		const expiredLinks: ILink[] = await deactivateAllExpired(currentDate);

		const emailPromises = expiredLinks.map(async ({user_id, shortUrl}) => {
			const user: IUser | undefined = await getOneById(user_id);

			if (user) {
				return sendEmail(
					NO_REPLY_EMAIL,
					user.email,
					"Deactivated link",
					`Your link ${shortUrl} has been deactivated`,
				);
			}
		});

		try {
			await Promise.all(emailPromises);
		} catch (e) {
			throw new ApiError(EMAIL_NOT_SENT, 500);
		}

	} catch (error) {
		throw new ApiError(DEACTIVATE_FAILED, 500);
	}
};
