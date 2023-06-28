import {config, DynamoDB} from "aws-sdk";

import {AWS_REGION} from "../configs";

config.update({
	region: AWS_REGION
});

const dynamodb = new DynamoDB.DocumentClient();

export {dynamodb};
