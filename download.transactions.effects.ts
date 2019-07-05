import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";
import {
	DownloadTransactionsActionTypes,
	GetDownloadTransactionsAction,
	GetLastTransactionsAction,
	GetDownloadTransactionsSuccessAction,
	GetLastTransactionsSuccessAction,
	GetDownloadTransactionsFailureAction,
	GetLastTransactionsFailureAction,
	DownloadTransactionsActionsUnion,
} from "./download.transactions.actions";
import { map, withLatestFrom, tap, switchMap, catchError } from "rxjs/operators";
import { TransactionsState } from "./download.transactions.reducers";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { saveAs as importedSaveAs } from "file-saver";
import { DownloadService } from "./download-transactions.service";
import { toYYYYMMDD } from "../../helpers/date-formater.helper";
import { LastTransactionsState } from "./download-transactions.model";
@Injectable()
export class DownloadTransactionsEffects {
	constructor(
		private actions$: Actions,
		private domainStore: Store<TransactionsState>,
		private downloadService: DownloadService,
	) {}

	@Effect()
	DownloadFile$: Observable<DownloadTransactionsActionsUnion> = this.actions$.pipe(
		ofType(DownloadTransactionsActionTypes.GET_DOWNLOAD_TRANSACTIONS),
		switchMap((action: GetDownloadTransactionsAction) => {
			console.log("inside the effect", action.payload);
			return this.downloadService.downloadFile(action.payload).pipe(
				map(blob =>
					importedSaveAs(
						blob,
						`${toYYYYMMDD(action.payload.selectedMonth)}-${
							action.payload.accountId
						}.${action.payload.fileFormatCode}`,
					),
				),
				map(() => new GetDownloadTransactionsSuccessAction()),
				catchError((error: HttpErrorResponse) =>
					of(new GetDownloadTransactionsFailureAction(error)),
				),
			);
		}),
	);

	@Effect()
	LastTransaction$: Observable<DownloadTransactionsActionsUnion> = this.actions$.pipe(
		ofType(DownloadTransactionsActionTypes.GET_LAST_TRANSACTIONS),
		switchMap((action: GetLastTransactionsAction) => {
			console.log("inside the effect", action.payload);
			return this.downloadService.lastTransaction(action.payload).pipe(
				map(response => new GetLastTransactionsSuccessAction(response)),
				catchError((error: HttpErrorResponse) =>
					of(new GetLastTransactionsFailureAction(error)),
				),
			);
		}),
	);
}
