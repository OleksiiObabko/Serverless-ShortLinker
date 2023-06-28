import {QueryOutput} from "aws-sdk/clients/dynamodb";

import {dynamodb} from "../dataBases";
import {IUser} from "../interfaces";

const tableName = "UserTable";

const getOneByEmail = async (email: string): Promise<IUser | undefined> => {
	const {Items}: QueryOutput = await dynamodb.query({
		TableName: tableName,
		IndexName: "EmailIndex",
		KeyConditionExpression: "email = :emailValue",
		ExpressionAttributeValues: {
			":emailValue": email,
		},
	}).promise();

	return Items?.[0] as IUser | undefined;
};

const createUser = async (userData: IUser): Promise<void> => {
	await dynamodb.put({
		TableName: tableName,
		Item: userData,
	}).promise();
};

export {createUser, getOneByEmail};
