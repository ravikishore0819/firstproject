import { Action } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import {
	DownloadTransactions,
	LastTransaction,
	LastTransactionsState,
} from "./download-transactions.model";

export enum DownloadTransactionsActionTypes {
	GET_DOWNLOAD_TRANSACTIONS = "[Download] Get transactions",
	GET_DOWNLOAD_TRANSACTIONS_SUCCESS = "[Download] Get Download transactions Success",
	GET_DOWNLOAD_TRANSACTIONS_FAILURE = "[Download] Get Download transactions Failure",

	GET_LAST_TRANSACTIONS = "[Download] Get Last transactions",
	GET_LAST_TRANSACTIONS_SUCCESS = "[Download] Get Last transactions Success",
	GET_LAST_TRANSACTIONS_FAILURE = "[Download] Get Last transactions Failure",
}

export class GetDownloadTransactionsAction implements Action {
	readonly type = DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS;
	constructor(public payload: DownloadTransactions) {}
}

export class GetLastTransactionsAction implements Action {
	readonly type = DownloadTransactionsActionTypes.GET_LAST_TRANSACTIONS;
	constructor(public payload: LastTransaction) {
		console.log("action hit");
	}
}

export class GetDownloadTransactionsSuccessAction implements Action {
	readonly type = DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS_SUCCESS;
}

export class GetLastTransactionsSuccessAction implements Action {
	readonly type = DownloadTransactionsActionTypes.GET_LAST_TRANSACTIONS_SUCCESS;
	constructor(public payload: LastTransactionsState) {}
}

export class GetDownloadTransactionsFailureAction implements Action {
	readonly type = DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS_FAILURE;

	constructor(public payload: HttpErrorResponse) {}
}

export class GetLastTransactionsFailureAction implements Action {
	readonly type = DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS_FAILURE;

	constructor(public payload: HttpErrorResponse) {}
}

export type DownloadTransactionsActionsUnion =
	| GetDownloadTransactionsAction
	| GetLastTransactionsAction
	| GetDownloadTransactionsSuccessAction
	| GetLastTransactionsSuccessAction
	| GetDownloadTransactionsFailureAction
	| GetLastTransactionsFailureAction;
