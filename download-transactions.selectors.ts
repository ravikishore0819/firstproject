import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
	TransactionsState,
	initialLastDownload,
	initialState,
} from "./download.transactions.reducers";
import { DownloadTransactions, LastTransaction } from "./download-transactions.model";
import {
	isChecking,
	isSaving,
	isMoneyMarket,
	isDebit,
} from "../../helpers/account-type.helper";

export const selectDownloadTransactionsState = createFeatureSelector<TransactionsState>(
	"lastDownloadTransaction",
);

export const lastDownloadTransactionDetails = createSelector(
	selectDownloadTransactionsState,
	initialState => {
		return initialState.lastTransactionDetails;
	},
);
