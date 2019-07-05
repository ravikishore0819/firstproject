import {
	DownloadTransactionsActionsUnion,
	DownloadTransactionsActionTypes,
} from "./download.transactions.actions";
import { LastTransactionsState } from "./download-transactions.model";

export enum DownloadTransactionsStatus {
	Ready = "Ready",
	Requested = "Requested",
	Started = "Started",
	Failed = "Failed",
	Completed = "Completed",
}

export interface TransactionsState {
	status: DownloadTransactionsStatus;
	lastTransactionDetails: LastTransactionsState;
	error: string | null;
	progress: number | null;
}

export const initialLastDownload: LastTransactionsState = {
	fromDate: null,
	lastDownloadfileFormatCode: "",
	lastTxnDownloadEndDate: null,
	lastTxnDownloadStartDate: null,
	periodStartDate: null,
	toDate: null,
};

export const initialState: TransactionsState = {
	status: DownloadTransactionsStatus.Ready,
	lastTransactionDetails: initialLastDownload,
	error: null,
	progress: null,
};

export function DownloadTransactionsReducer(
	state = initialState,
	action: DownloadTransactionsActionsUnion,
): TransactionsState {
	switch (action.type) {
		case DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS: {
			return { ...state, status: DownloadTransactionsStatus.Started, progress: 0 };
		}
		case DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS_SUCCESS: {
			return {
				...state,
				status: DownloadTransactionsStatus.Completed,
				error: null,
			};
		}
		case DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS_FAILURE: {
			return {
				...state,
				status: DownloadTransactionsStatus.Failed,
				error: action.payload.error,
			};
		}
		case DownloadTransactionsActionTypes.GET_LAST_TRANSACTIONS: {
			return { ...state, status: DownloadTransactionsStatus.Started, progress: 0 };
		}
		case DownloadTransactionsActionTypes.GET_LAST_TRANSACTIONS_SUCCESS: {
			return {
				...state,
				lastTransactionDetails: action.payload,
				status: DownloadTransactionsStatus.Completed,
				error: null,
			};
		}
	}

	return state;
}
