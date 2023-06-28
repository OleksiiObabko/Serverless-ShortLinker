interface IApiError {
	status: number;
	success: boolean;
}

class ApiError extends Error implements IApiError {
	status: number;
	success: boolean;

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
		this.success = false;
	}
}

export { ApiError, IApiError };
