const PORT: string | number = process.env.PORT || 5000;
const AWS_REGION: string = process.env.AWS_REGION || "us-east-1";
const USER_TABLE_NAME: string = process.env.USER_TABLE_NAME || "UserTable";

export {PORT, AWS_REGION, USER_TABLE_NAME};
