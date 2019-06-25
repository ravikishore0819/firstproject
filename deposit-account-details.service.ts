import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DepositAccountDetails } from "./deposit-account-details.model";

@Injectable()
export class DepositDetailsService {
	constructor(private httpClient: HttpClient) {}

	// Need to add type
	public getDepositDetails(id: string) {
		return this.httpClient.get<DepositAccountDetails>("/NBO/api/v1/accounts/" + id);
	}
}
