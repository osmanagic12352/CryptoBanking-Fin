import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Coin } from '../shared/coinApi.model';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {

  switch: boolean;
  switchButton: 'login' | 'tecaj';

  api: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  coins: Coin[] = [];
  titles: string[] = ['#', 'Valuta', 'Cijena (BAM)', 'Promjena 24h', 'Kupovni (BAM)', 'Prodajni (BAM)'];
  searchText: string = '';
  filteredCoins: Coin[] = [];

  constructor(private http: HttpClient, private router: Router, private config: NgbCarouselConfig, private helper: JwtHelperService) {

    config.interval = 7000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    this.coinList();
    this.userAuth();
  }

  userAuth(){
    const Token = localStorage.getItem("token");
    if (Token && !this.helper.isTokenExpired(Token) != null) {
      this.router.navigate(['/home']);
    }
  }

  coinList() {
    this.http.get<Coin[]>(this.api).subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoins = this.coins;
      },
      (err) => console.error(err)
    );
  }

  button(type: 'login' | 'tecaj') {
    this.switch = true;
    this.switchButton = type;
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
