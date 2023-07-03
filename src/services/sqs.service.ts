import {AWSError, SQS} from "aws-sdk";
import {Message} from "aws-sdk/clients/sqs";
import {PromiseResult} from "aws-sdk/lib/request";

import {getOneById} from "../repositories";
import {sendEmail} from "./ses.service";
import {BASE_URL, QUEUE_URL} from "../configs";
import {ILink, IUser} from "../interfaces";

const sqs = new SQS();

const sqsService = async (expiredLinks: ILink[]) => {
	try {
		const queueUrl = QUEUE_URL;

		for (const expiredLink of expiredLinks) {
			await sqs.sendMessage({
				MessageBody: JSON.stringify(expiredLink),
				QueueUrl: queueUrl
			}).promise();
		}

		const allMessages: Message[] = [];
		let response: PromiseResult<SQS.ReceiveMessageResult, AWSError>;

		do {
			const receiveParams = {
				QueueUrl: queueUrl,
				MaxNumberOfMessages: 10,
				WaitTimeSeconds: 0
			};
			response = await sqs.receiveMessage(receiveParams).promise();

			if (response.Messages) {
				allMessages.push(...response.Messages);
			}
		} while (response.Messages && response.Messages.length);

		while (allMessages.length >= 2) {
			const expiredLinks: Message[] = allMessages.slice(0, 2);

			const emailPromises: Promise<void>[] = expiredLinks.map(async (message: Message) => {
				if (message.Body && message.ReceiptHandle) {
					const expLink: ILink = JSON.parse(message.Body);

					const {user_id, shortUrl} = expLink;
					const user: IUser | undefined = await getOneById(user_id);

					if (user) {
						return sendEmail(
							user.email,
							"Deactivated link",
							`Your link ${BASE_URL}/${shortUrl} has been deactivated`
						);
					}
				}
			});

			await Promise.allSettled(emailPromises);

			for (const message of expiredLinks) {
				if (message.ReceiptHandle) {
					await sqs.deleteMessage({
						QueueUrl: queueUrl,
						ReceiptHandle: message.ReceiptHandle
					}).promise();
				}
			}

			allMessages.splice(0, 2);
		}

		return {status: 200, message: "All messages sent successfully"};
	} catch (e) {
		console.log("error", e);
	}
};

export {sqsService};
