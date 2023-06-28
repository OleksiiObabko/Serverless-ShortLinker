import {dynamodb} from "./dynamoDb";

const getUserById = async (id: string) => {
	const {Item} = await dynamodb.get({
		TableName: "UserTable",
		Key: {id}
	}).promise();
	return Item;
};

const createUser = async (id: string) => {
	await dynamodb.put({
		TableName: "UserTable",
		Item: {id}
	}).promise();
};

export {getUserById, createUser};
