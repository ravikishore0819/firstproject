export interface DepositAccountDetails {
	accountBalance: {
		availableBalance: number;
		currentBalance: number;
		holdBalance: number;
		minimumBalance: number;
		pendingBalance: number;
	};
	accountId: string;
	accountNumber: string;
	accountRewards: [
		{
			amount: number;
			year: string;
		}
	];
	accountServices: [
		{
			id: string;
			status: string;
		}
	];
	accountType: {
		code: string;
		displayName: string;
	};
	eligibleStopCheck: boolean;
	hidden: boolean;
	nickname: string;
	permissions: Array<string>;
	status: string;
	transferCount: number;
	transferMax: number;
}
