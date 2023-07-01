import {GetItemOutput, QueryOutput} from "aws-sdk/clients/dynamodb";

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

const getOneById = async (id: string): Promise<IUser | undefined> => {
	const {Item}: GetItemOutput = await dynamodb.get({
		TableName: tableName,
		Key: {id},
	}).promise();

	return Item as IUser | undefined;
};

export {createUser, getOneByEmail, getOneById};
