import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { DepositDetailsService } from "./deposit-account-details.service";
import { Observable, of } from "rxjs";
import { map, switchMap, tap, catchError } from "rxjs/operators";

import { HttpErrorResponse } from "@angular/common/http";
import {
	DepositDetailsActionsUnion,
	DepositDetailsActionTypes,
	GetDepositDetailsAction,
	GetDepositDetailsFailureAction,
	GetDepositDetailsSuccessAction,
} from "./deposit-account-details.actions";

@Injectable()
export class DepositDetailsEffects {
	constructor(
		private action$: Actions,
		private depositDetailsService: DepositDetailsService,
	) {}

	@Effect()
	getDepositDetails$: Observable<DepositDetailsActionsUnion> = this.action$.pipe(
		ofType(DepositDetailsActionTypes.GET_DEPOSIT_DETAILS),
		switchMap((action: GetDepositDetailsAction) =>
			this.depositDetailsService.getDepositDetails(action.payload).pipe(
				map(response => new GetDepositDetailsSuccessAction(response)),
				catchError((error: HttpErrorResponse) =>
					of(new GetDepositDetailsFailureAction(error)),
				),
			),
		),
	);
}
