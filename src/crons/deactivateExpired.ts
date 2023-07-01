import serverless from "serverless-http";

import {getCurrentDate, sendEmail} from "../services";
import {deactivateAllExpired, getOneById} from "../repositories";
import {NO_REPLY_EMAIL} from "../configs";
import {DEACTIVATE_FAILED} from "../enums";
import {ILink, IUser} from "../interfaces";

const deactivateExpired = async () => {
	try {
		const currentDate = getCurrentDate();
		deactivateAllExpired(currentDate).then(async (expiredLinks: ILink[]) => {
			const emailPromises = expiredLinks.map(async ({user_id, shortUrl}) => {
				const user: IUser | undefined = await getOneById(user_id);
				if (user) {
					return sendEmail(
						NO_REPLY_EMAIL,
						user.email,
						"Deactivated link",
						`Your link ${shortUrl} has been deactivated`
					);
				}
			});

			if (emailPromises.length) {
				await Promise.all(emailPromises);
			}
		});
	} catch (e: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: DEACTIVATE_FAILED,
				errorMsg: e?.message,
				errorStack: e?.stack
			})
		};
	}
};

export const handler = serverless(deactivateExpired);
