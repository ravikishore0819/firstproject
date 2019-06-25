import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DepositAccountDetailsState } from "./deposit-account-details.reducers";
import { DepositAccountDetails } from "./deposit-account-details.model";
import {
	isChecking,
	isSaving,
	isMoneyMarket,
	isDebit,
} from "../../helpers/account-type.helper";

export const selectDepositAccountDetailsState = createFeatureSelector<
	DepositAccountDetailsState
>("depositAccountDetails");

export const selectDepositAccountDetails = createSelector(
	selectDepositAccountDetailsState,
	(depositAccountDetailsState: DepositAccountDetailsState): DepositAccountDetails =>
		depositAccountDetailsState.data,
);

export const selectIsCheckingAccount = createSelector(
	selectDepositAccountDetails,
	(depositAccountDetails: DepositAccountDetails) => {
		return depositAccountDetails
			? isChecking(depositAccountDetails.accountType)
			: false;
	},
);

export const selectIsSavingsAccount = createSelector(
	selectDepositAccountDetails,
	(depositAccountDetails: DepositAccountDetails) => {
		return depositAccountDetails
			? isSaving(depositAccountDetails.accountType)
			: false;
	},
);

export const selectIsMoneyMarketAccount = createSelector(
	selectDepositAccountDetails,
	(depositAccountDetails: DepositAccountDetails) => {
		return depositAccountDetails
			? isMoneyMarket(depositAccountDetails.accountType)
			: false;
	},
);

export const selectIsDebitAccountType = createSelector(
	selectDepositAccountDetails,
	(depositAccountDetails: DepositAccountDetails) => {
		return depositAccountDetails ? isDebit(depositAccountDetails.accountType) : false;
	},
);

export const selectCourtesyPayStatus = createSelector(
	selectDepositAccountDetails,
	(depositAccountDetails: DepositAccountDetails) => {
		if (depositAccountDetails) {
			const courtesyPayService = depositAccountDetails.accountServices.find(
				service => service.id === "CPAY",
			);
			return courtesyPayService.status;
		}
	},
);

export const selectCourtesyPayStatusDescription = createSelector(
	selectCourtesyPayStatus,
	(courtesyPayStatus: string) => {
		if (courtesyPayStatus) {
			if (courtesyPayStatus === "CAD") {
				return "is activated for Checks, ACH and Debit Card.";
			} else if (courtesyPayStatus === "CA") {
				return "is activated for Checks, ACH only.";
			} else if (courtesyPayStatus === "NOT_ACTIVATE") {
				return "is not activated.";
			} else if (courtesyPayStatus === "NOT_ELIGIBLE") {
				return "is not eligible for this account.";
			}
		}
	},
);
