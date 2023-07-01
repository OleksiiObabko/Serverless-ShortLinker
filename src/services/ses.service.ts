import {SES} from "aws-sdk";

const ses = new SES();

const sendEmail = async (source: string, destination: string, subject: string, body: string) => {
	const params = {
		Source: source,
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
