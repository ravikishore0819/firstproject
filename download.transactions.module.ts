import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DownloadTransactionsReducer } from "./download.transactions.reducers";
import { DownloadService } from "./download-transactions.service";
import { DownloadTransactionsEffects } from "./download.transactions.effects";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature("downloadTransactions", DownloadTransactionsReducer),
		EffectsModule.forFeature([DownloadTransactionsEffects]),
	],
	providers: [DownloadService],
})
export class DownloadTransactionsModule {}
