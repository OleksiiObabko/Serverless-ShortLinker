export interface ILink {
	user_id: string;
	originalUrl: string;
	shortUrl: string;
	isActive: boolean;
	visits: number;
	isOneTime: boolean;
	activeUntil: number;
}
