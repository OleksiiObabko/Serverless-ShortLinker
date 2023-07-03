import serverless from "serverless-http";

import {getCurrentDate} from "../services";
import {deactivateAllExpired} from "../repositories";
import {DEACTIVATE_FAILED} from "../enums";
import {ILink} from "../interfaces";
import {sqsService} from "../services/sqs.service";

export const deactivateExpired = async () => {
	try {
		const currentDate = getCurrentDate();
		const expiredLinks: ILink[] = await deactivateAllExpired(currentDate);

		await sqsService(expiredLinks);
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
