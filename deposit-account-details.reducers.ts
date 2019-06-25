import {
	DepositDetailsActionsUnion,
	DepositDetailsActionTypes,
} from "./deposit-account-details.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { DepositAccountDetails } from "./deposit-account-details.model";

export interface DepositAccountDetailsState {
	data: DepositAccountDetails;
	error: null | HttpErrorResponse;
	isLoading: boolean;
}

export const initialdepositAccountDetails: DepositAccountDetailsState = {
	data: null,
	error: null,
	isLoading: false,
};

export function depositDetailsReducer(
	state = initialdepositAccountDetails,
	action: DepositDetailsActionsUnion,
) {
	switch (action.type) {
		case DepositDetailsActionTypes.GET_DEPOSIT_DETAILS:
			return {
				...state,
				isLoading: true,
			};
		case DepositDetailsActionTypes.GET_DEPOSIT_DETAILS_SUCCESS:
			return {
				...state,
				data: action.payload,
				isLoading: false,
			};
		case DepositDetailsActionTypes.GET_DEPOSIT_DETAILS_FAILURE:
			return {
				...state,
				error: action.payload,
				isLoading: false,
			};
		case DepositDetailsActionTypes.CLEAR_DEPOSIT_DETAILS:
			return {
				...state,
				data: initialdepositAccountDetails,
				error: null,
				isLoading: false,
			};
		default:
			return state;
	}
}
