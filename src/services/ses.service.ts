import {SES} from "aws-sdk";

import {NO_REPLY_EMAIL} from "../configs";

const ses = new SES();

const sendEmail = async (destination: string, subject: string, body: string) => {
	const params = {
		Source: NO_REPLY_EMAIL,
		Destination: {
			ToAddresses: [destination],
		},
		Message: {
			Subject: {
				Data: subject,
			},
			Body: {
				Text: {
					Data: body,
				},
			},
		},
	};
	await ses.sendEmail(params).promise();
};

export {sendEmail};
