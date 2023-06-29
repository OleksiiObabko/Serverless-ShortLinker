import {GetItemOutput} from "aws-sdk/clients/dynamodb";

import {dynamodb} from "../dataBases";
import {ITokenPair, ITokenData} from "../interfaces";

const tableName = "OauthTable";

const createTokenPair = async (tokenPair: ITokenPair, user_id: string): Promise<ITokenData | undefined> => {
	const item: ITokenData = {user_id, ...tokenPair};

	await dynamodb.put({
		TableName: tableName,
		Item: item,
		ReturnValues: "ALL_OLD",
	}).promise();

	return item;
};

const findTokenPair = async (accessToken: string): Promise<ITokenData | undefined> => {
	const {Item}: GetItemOutput = await dynamodb.get({
		TableName: tableName,
		Key: {accessToken},
	}).promise();

	return Item as ITokenData | undefined;
};

export {createTokenPair, findTokenPair};
