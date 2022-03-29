import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-card-insert',
  templateUrl: './card-insert.component.html',
  styles: [
  ]
})
export class CardInsertComponent implements OnInit {
  userDetails: any;

  constructor(public service: PaymentDetailService,
    private toastr: ToastrService,
    private router: Router,
    private service_user: UserService,
    private helper: JwtHelperService,) {

  }


  ngOnInit(): void {

    this.listUser();
    this.userAuth();
  }

  listUser() {
    this.service_user.list1Users().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  onSubmit(form: NgForm) {
    this.service.postCard().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Uspješno unešeno!', 'Kartični podaci');
      },
      err => {
        console.log(err);
        this.toastr.error('Možda već imate karticu? (jedna kartica po osobi dozvoljena)', 'Neuspješno!')
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
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

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }


}
