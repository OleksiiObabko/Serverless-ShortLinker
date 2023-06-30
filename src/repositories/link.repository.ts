import {GetItemOutput} from "aws-sdk/clients/dynamodb";

import {dynamodb} from "../dataBases";
import {ILink} from "../interfaces";

const tableName = "LinkTable";

const create = async (linkItem: ILink): Promise<void> => {
	await dynamodb.put({
		TableName: tableName,
		Item: linkItem,
	}).promise();
};

const findByShort = async (shortUrl: string): Promise<ILink | undefined> => {
	const {Item}: GetItemOutput = await dynamodb.get({
		TableName: tableName,
		Key: {shortUrl},
	}).promise();

	return Item as ILink | undefined;
};

const getList = async (userId: string): Promise<ILink[]> => {
	const {Items} = await dynamodb.query({
		TableName: tableName,
		IndexName: "UserIdIndex",
		KeyConditionExpression: "user_id = :userIdValue",
		ExpressionAttributeValues: {
			":userIdValue": userId,
		},
	}).promise();

	return Items as ILink[];
};

export {create, findByShort, getList};
