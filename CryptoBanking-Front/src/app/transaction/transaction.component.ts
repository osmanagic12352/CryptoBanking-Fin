import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Coin } from '../shared/coinApi.model';
import { LoginService } from '../shared/login.service';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styles: [
  ]
})
export class TransactionComponent implements OnInit {
  userDetails: any;

  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['Valuta', 'Cijena (BAM)', 'Kupovni (BAM)', 'Sellni (BAM)'];
  searchText: string = '';
  filteredCoins: Coin[] = [];

  constructor(private service: UserService, private helper: JwtHelperService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.userAuth();
    
    this.service.list1Users().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      (err: any) => {
        console.log(err);
      },
    );

    this.http.get<Coin[]>(this.api).subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoins = this.coins;
      },
      (err) => console.error(err)
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  userAuth() {
    const Token = localStorage.getItem("token");
    if (Token && !this.helper.isTokenExpired(Token)) {
      return true;
    }
    else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
