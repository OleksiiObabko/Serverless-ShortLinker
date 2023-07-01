import {config} from "dotenv";

config();
import express, {NextFunction, Request, Response} from "express";
import serverless from "serverless-http";

import {PORT} from "./configs";
import {linkRouter, oauthRouter} from "./routers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", oauthRouter);
app.use("/", linkRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500,
	});
});

app.listen(+PORT, async () => {
	console.log(`Server is listening port: ${PORT}`);
});

export const handler = serverless(app);
