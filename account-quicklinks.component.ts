import { Component, OnInit, Input, OnChanges, Inject } from "@angular/core";
import {
	Account,
	selectQuickLinksForActivity,
	selectDepositAccountDetails,
	selectGuestUserStatus,
	selectReadOnlyModeStatus,
	QuickLink,
	selectQuickLinksForAccount,
	QuickLinkItemCode,
	GetExclusiveOffersAction,
	AppState,
} from "olb-lib";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AppService } from "@rbfcu/app.service";
import { MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AlertDialogComponent } from "../alert.dialog/alert-dialog.component";
import { quickLinkRouteconfig, QuickLinkRoute } from "../quick-link-route.config";
import { TransactionsState } from "projects/olb-lib/src/engines/download-transactions/download.transactions.reducers";
import { FormBuilder, NgForm, FormGroup, FormControl } from "@angular/forms";
import * as moment from "moment";
import { DownloadTransactionsDialog } from "../download-transactions/download-transactions.component";

export interface DialogData {
	message: string;
}

@Component({
	selector: "account-quicklinks",
	templateUrl: "./account-quicklinks.component.html",
	styleUrls: ["./account-quicklinks.component.scss"],
})
export class AccountQuicklinksComponent implements OnInit, OnChanges {
	@Input() account: Account;
	currentUrl: string;

	message: SafeHtml = "";

	guestUserStatus$: Observable<boolean>;
	realOnlyModeStatus$: Observable<boolean>;
	accountQuickLinks$: Observable<QuickLink[]>;
	imageSource: string;

	constructor(
		private dialog: MatDialog,
		private store: Store<AppState>,
		private router: Router,
		private appService: AppService,
		private matDialog: MatDialog,
		private sanitizer: DomSanitizer,
	) {
		this.guestUserStatus$ = this.store.select(selectGuestUserStatus);
		this.realOnlyModeStatus$ = this.store.select(selectReadOnlyModeStatus);
	}

	ngOnInit() {
		this.currentUrl = this.router.url;
		if (
			this.currentUrl === "/account/summary" ||
			this.currentUrl === "/account/summary?view=mv"
		) {
			this.accountQuickLinks$ = this.store.select(
				selectQuickLinksForAccount(this.account),
			);
			this.imageSource = "assets/images/icons/More-gray.svg";
		} else if (this.currentUrl.includes("activity")) {
			this.accountQuickLinks$ = this.store.select(
				selectQuickLinksForActivity(this.account),
			);
			this.imageSource = "assets/images/icons/more-green.svg";
		}
	}

	ngOnChanges() {
		if (this.currentUrl && this.currentUrl.includes("activity")) {
			this.accountQuickLinks$ = this.store.select(
				selectQuickLinksForActivity(this.account),
			);
		}
	}

	downloadTransactions() {
		const dialogRef = this.dialog.open(DownloadTransactionsDialog, {
			data: {
				message: this.account.accountId,
				accountNumber: this.account.accountNumber,
			},
		});
	}

	//Pass account from template
	handleQuickLink(quickLink: QuickLink, account: Account) {
		let routeTo = this.determineRouteUrl(quickLink);

		if (routeTo.includes("?")) {
			routeTo = routeTo + "&id=" + account.accountId;
		} else if (quickLink.code === QuickLinkItemCode.emailForEdeposit) {
			routeTo = routeTo + "?edepAcctId=" + account.accountId;
		} else {
			routeTo = routeTo + "?id=" + account.accountId;
		}

		if (quickLink.code === QuickLinkItemCode.pickAPay) {
			this.checkPickAPayOfferEligibility(quickLink);
		} else if (quickLink.code === QuickLinkItemCode.make_eDeposit) {
			window.open(
				routeTo,
				"eDeposit_window",
				"width=700,height=800,resizable=0,scrollbars=yes,menubar=no,status=no",
			);
		} else if (quickLink.code === QuickLinkItemCode.eStatements) {
			window.open(
				routeTo,
				"",
				"width=700,height=800,resizable=0,scrollbars=yes,menubar=no,status=no",
			);
		} else if (quickLink.code === QuickLinkItemCode.downloadTransactions) {
			this.downloadTransactions();
		} else {
			window.location.href = routeTo;
		}
	}

	checkPickAPayOfferEligibility(quickLink: QuickLink) {
		this.appService.enableSpinner();
		this.appService.checkOfferEligibility(quickLink.data).subscribe(
			data => {
				this.handlePickAPayQuickLink(String(data), quickLink);
			},
			error => {
				//response in not a proper java script object
				if (error instanceof HttpErrorResponse) {
					if (error.status === 200) {
						let value = error.error.text;
						this.handlePickAPayQuickLink(String(value), quickLink);
					}
				}
				this.appService.disableSpinner();
			},
		);
	}

	handlePickAPayQuickLink(value: string, quickLink: QuickLink) {
		let quickLinkData = quickLink.data;
		if (value === "true") {
			let url = "/NBO/loadOffer?offer=" + quickLinkData;
			window.open(url, "ratereset");
			this.store.dispatch(new GetExclusiveOffersAction());
		} else if (value === "nullKey") {
		} else {
			this.message = this.sanitizer.bypassSecurityTrustHtml(value);
			this.matDialog.open(AlertDialogComponent, {
				width: "40%",
				data: { message: this.message },
			});
		}
		this.appService.disableSpinner();
	}

	determineRouteUrl(quickLink: QuickLink): string {
		let code = quickLink.code;
		let linkRoute: QuickLinkRoute = quickLinkRouteconfig[code];
		quickLink.route = linkRoute.route;
		return quickLink.route;
	}
}
