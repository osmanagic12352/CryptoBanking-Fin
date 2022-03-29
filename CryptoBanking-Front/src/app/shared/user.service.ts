import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  formData: User = new User();
  list: User[] = [];
  readonly BaseURL = "http://localhost:5001/api/ApplicationUser/Registracija_User"
  
  
  postUser(){
    return this.http.post(this.BaseURL, this.formData);
  }

  putUser(){
    return this.http.put(`${'http://localhost:5001/api/ApplicationUser/Edit-user-details'}/${this.formData.id}`, this.formData);
  }

  listUsers(){
    this.http.get('http://localhost:5001/api/ApplicationUser/get-all-users')
      .toPromise()
      .then(res => this.list = res as User[]);
  }

  deleteUser(id:string){
    return this.http.delete('http://localhost:5001/api/ApplicationUser/Delete-user/' + id);
  }

  put1User(){
    return this.http.put(`${'http://localhost:5001/api/ApplicationUser/UpdateUser?password='}${this.formData.password}`, this.formData);
  }

  list1Users(){
    return this.http.get('http://localhost:5001/api/ApplicationUser/get-loged-UserInfo');
  }

  delete1User(id:string){
    return this.http.delete('http://localhost:5001/api/ApplicationUser/DeleteUser');
  }
}
