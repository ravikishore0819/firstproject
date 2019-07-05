import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
	DownloadTransactions,
	LastTransaction,
	LastTransactionsState,
} from "./download-transactions.model";
import { map } from "rxjs/operators";
import { DownloadTransactionsModule } from "./download.transactions.module";

@Injectable()
export class DownloadService {
	constructor(private http: HttpClient) {}
	public lastTransaction(payload: LastTransaction) {
		const headers = new HttpHeaders();
		let _baseUrl = "/NBO/api/v1/accounts/" + payload.accountId + "/txn-download";
		return this.http.get<LastTransactionsState>(_baseUrl);
	}

	public downloadFile(payload: DownloadTransactions): Observable<Blob> {
		const headers = new HttpHeaders();
		let _baseUrl = "/NBO/api/v1/accounts/" + payload.accountId + "/txn-download";
		headers.append("responseType", "blob");
		return this.http.post(_baseUrl, payload, {
			responseType: "blob",
		});
	}
}
