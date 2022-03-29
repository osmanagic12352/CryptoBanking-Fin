import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

@Injectable()
export class coinApiService {

    private baseUrlBTC = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
    private baseUrlETH = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    private baseUrlADA = 'https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd';
    private baseUrlUSDT = 'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd';

    constructor(private http: HttpClient) { }

    coinsPriceBTC(){
        const url = this.baseUrlBTC;
        return this.http.get(url).toPromise().then((data) => {
            return data
        })
    }

    coinsPriceETH(){
        const url = this.baseUrlETH;
        return this.http.get(url).toPromise().then((data) => {
            return data
        })
    }

    coinsPriceADA(){
        const url = this.baseUrlADA;
        return this.http.get(url).toPromise().then((data) => {
            return data
        })
    }

    coinsPriceUSDT(){
        const url = this.baseUrlUSDT;
        return this.http.get(url).toPromise().then((data) => {
            return data
        })
    }
}