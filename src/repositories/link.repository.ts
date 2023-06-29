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

export {create, findByShort};
