import express, {Request, Response, NextFunction} from "express";
import serverless from "serverless-http";

import router from "./router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500
	});
});

app.listen(5000, async () => {
	console.log("Server is listening port: 5000");
});
export const handler = serverless(app);
