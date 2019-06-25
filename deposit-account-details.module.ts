import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { depositDetailsReducer } from "./deposit-account-details.reducers";
import { DepositDetailsService } from "./deposit-account-details.service";
import { DepositDetailsEffects } from "./deposit-account-details.effects";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature("depositAccountDetails", depositDetailsReducer),
		EffectsModule.forFeature([DepositDetailsEffects]),
	],
	providers: [DepositDetailsService],
})
export class DepositAccountDetailsModule {}
