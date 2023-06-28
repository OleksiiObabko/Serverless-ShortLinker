import {dynamodb} from "../dataBases";
import {QueryOutput} from "aws-sdk/clients/dynamodb";

import {IUserInterface} from "../interfaces";
import {USER_TABLE_NAME} from "../configs";

const tableName = USER_TABLE_NAME;

const getOneByEmail = async (email: string): Promise<IUserInterface | undefined> => {
	const {Items}: QueryOutput = await dynamodb.query({
		TableName: tableName,
		IndexName: "EmailIndex",
		KeyConditionExpression: "email = :emailValue",
		ExpressionAttributeValues: {
			":emailValue": email
		}
	}).promise();

	return Items?.[0] as IUserInterface | undefined;
};

const createUser = async (userData: IUserInterface): Promise<void> => {
	await dynamodb.put({
		TableName: tableName,
		Item: userData
	}).promise();
};

export {createUser, getOneByEmail};
