const PORT: string = process.env.PORT || "5000";
const AWS_REGION: string = process.env.AWS_REGION || "us-east-1";

const ACCESS_SECRET: string = process.env.ACCESS_SECRET || "secretAccessWord";
const REFRESH_SECRET: string = process.env.REFRESH_SECRET || "secretRefreshWord";
const ACCESS_LIFE_TIME: string = process.env.ACCESS_LIFE_TIME || "60m";
const REFRESH_LIFE_TIME: string = process.env.REFRESH_LIFE_TIME || "1d";

export {
	PORT,
	AWS_REGION,
	ACCESS_SECRET,
	REFRESH_SECRET,
	ACCESS_LIFE_TIME,
	REFRESH_LIFE_TIME,
};
