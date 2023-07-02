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

const deactivate = async (shortUrl: string): Promise<void> => {
	await dynamodb.update({
		TableName: tableName,
		Key: {shortUrl},
		UpdateExpression: "SET isActive = :value",
		ExpressionAttributeValues: {
			":value": false,
		},
	}).promise();
};

const deactivateAllExpired = async (date: number): Promise<ILink[]> => {
	const scanResult = await dynamodb.scan({
		TableName: tableName,
		FilterExpression: "activeUntil < :activeUntilValue AND activeUntil <> :zeroValue AND isActive = :isActiveValue",
		ExpressionAttributeValues: {":activeUntilValue": date, ":isActiveValue": true, ":zeroValue": 0},
	}).promise();
	const expiredLinks: ILink[] = scanResult.Items as ILink[];

	const updatePromises: Promise<void>[] = expiredLinks.map(async ({shortUrl}) => {
		await dynamodb.update({
			TableName: tableName,
			Key: {shortUrl},
			UpdateExpression: "SET isActive = :isActiveValue",
			ExpressionAttributeValues: {":isActiveValue": false},
		}).promise();
	});

	await Promise.all(updatePromises);
	return expiredLinks;
};

const incrementVisits = async (shortUrl: string): Promise<void> => {
	await dynamodb.update({
		TableName: tableName,
		Key: {shortUrl},
		UpdateExpression: "SET visits = visits + :inc",
		ExpressionAttributeValues: {":inc": 1},
	}).promise();
};

export {create, findByShort, getList, deactivate, deactivateAllExpired, incrementVisits};
