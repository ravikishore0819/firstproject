import { Component, OnInit, Input, OnChanges, Inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GetDownloadTransactionsAction, GetLastTransactionsAction } from "olb-lib";
import { TransactionsState } from "projects/olb-lib/src/engines/download-transactions/download.transactions.reducers";
import { lastDownloadTransactionDetails } from "projects/olb-lib/src/engines/download-transactions/download-transactions.selectors";
import { FormBuilder, NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";

export interface DialogData {
	message: string;
	accountNumber: string;
}

@Component({
	selector: "download-transactions-dialog",
	templateUrl: "download-transactions.html",
	styleUrls: ["./download-transactions.component.scss"],
})
export class DownloadTransactionsDialog implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<DownloadTransactionsDialog>,
		private sharedStore: Store<TransactionsState>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
	) {}
	month = new FormControl("", [Validators.required]);
	months = [];
	minimumDate: Date;
	noShowMonth: Boolean = false;
	noShowFinancial: Boolean = false;
	noShowFinancial123: Boolean = false;
	noShowStartEnd: Boolean = false;
	checking: "";
	onYesClick(): void {
		this.dialogRef.close(true);
	}
	close() {
		this.dialogRef.close();
	}
	ngOnInit() {
		let currentDate = new Date();
		currentDate.setFullYear(currentDate.getFullYear() - 2);

		let previousDate = new Date(currentDate);
		this.minimumDate = new Date(currentDate);
		let presentDate = new Date();

		let durationBetweenYears = presentDate.getFullYear() - previousDate.getFullYear();
		let durationBetweenMonths = presentDate.getMonth() - previousDate.getMonth();

		let diff = durationBetweenYears * 12 + durationBetweenMonths;

		for (let i = 0; i <= diff; i++) {
			if (i == 0) previousDate.setMonth(previousDate.getMonth() - 1);
			else previousDate.setMonth(previousDate.getMonth() + 1);

			this.months[i] = moment(previousDate).format("MMM YYYY");
		}

		this.months = this.months.reverse();
		setTimeout(() => {
			console.log("dispatch");
			this.sharedStore.dispatch(
				new GetLastTransactionsAction({
					accountId: this.data.message,
				}),
			);
		}, 500);
		setTimeout(() => {
			let det$ = this.sharedStore.select(lastDownloadTransactionDetails);
			console.log(":::", det$);
			console.log(lastDownloadTransactionDetails);
		}, 1000);
	}

	downloadTransaction(monthAndYear, financial123, fromDate, tillDate, financialYear) {
		event.preventDefault();
		const accountId = this.data.message;
		const startDate = fromDate;
		const endDate = tillDate;
		const fileFormatCode = financial123 || financialYear;
		const selectedMonth = monthAndYear;
		const monthSelectionType = monthAndYear ? true : false;
		if ((monthAndYear && financial123) || (fromDate && tillDate && financialYear)) {
			this.sharedStore.dispatch(
				new GetDownloadTransactionsAction({
					accountId,
					fileFormatCode,
					startDate,
					endDate,
					monthSelectionType,
					selectedMonth,
				}),
			);
			setTimeout(() => {}, 1000);
		} else {
			this.noShowFinancial123 = financial123 ? false : true;
			this.noShowFinancial = financialYear ? false : true;
			this.noShowMonth = monthAndYear ? false : true;
			this.noShowStartEnd = fromDate || tillDate ? false : true;
		}
	}
}
