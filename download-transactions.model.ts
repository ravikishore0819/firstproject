export interface DownloadTransactions {
	accountId: string;
	fileFormatCode: string;
	startDate: Date;
	endDate: Date;
	monthSelectionType: boolean;
	selectedMonth: string;
}

export interface LastTransaction {
	accountId: string;
}

export interface LastTransactionsState {
	fromDate: Date;
	lastDownloadfileFormatCode: string;
	lastTxnDownloadEndDate: Date;
	lastTxnDownloadStartDate: Date;
	periodStartDate: Date;
	toDate: Date;
}
