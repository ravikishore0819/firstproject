import { Action } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { DepositAccountDetails } from "./deposit-account-details.model";

export enum DepositDetailsActionTypes {
	GET_DEPOSIT_DETAILS = "[Deposit] Get details",
	GET_DEPOSIT_DETAILS_SUCCESS = "[Deposit] Get Deposit detail Success",
	GET_DEPOSIT_DETAILS_FAILURE = "[Deposit] Get Deposit detail Failure",
	CLEAR_DEPOSIT_DETAILS = "[Deposit] Clear Deposit detail",
}

export class GetDepositDetailsAction implements Action {
	readonly type = DepositDetailsActionTypes.GET_DEPOSIT_DETAILS;

	constructor(public payload: string) {}
}

export class GetDepositDetailsSuccessAction implements Action {
	readonly type = DepositDetailsActionTypes.GET_DEPOSIT_DETAILS_SUCCESS;

	constructor(public payload: DepositAccountDetails) {}
}

export class GetDepositDetailsFailureAction implements Action {
	readonly type = DepositDetailsActionTypes.GET_DEPOSIT_DETAILS_FAILURE;

	constructor(public payload: HttpErrorResponse) {}
}

export class ClearDepositDetailsAction implements Action {
	readonly type = DepositDetailsActionTypes.CLEAR_DEPOSIT_DETAILS;
}

export type DepositDetailsActionsUnion =
	| GetDepositDetailsAction
	| GetDepositDetailsSuccessAction
	| GetDepositDetailsFailureAction
	| ClearDepositDetailsAction;
