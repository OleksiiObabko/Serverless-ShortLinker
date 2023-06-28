import {dynamodb} from "../dataBases";
import {ITokenPair, ITokenData} from "../interfaces";

const tableName = "OauthTable";

const createTokenPair = async (tokenPair: ITokenPair, user_id: string): Promise<ITokenData> => {
	const item: ITokenData = {user_id, ...tokenPair};

	await dynamodb.put({
		TableName: tableName,
		Item: item,
		ReturnValues: "ALL_OLD",
	}).promise();

	return item;
};

export {createTokenPair};
