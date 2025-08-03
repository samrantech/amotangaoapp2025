import { Injectable } from '@angular/core';
import{Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    public objCart : CartService,
    ) { }

  userlogout(){
   
    localStorage.removeItem('loggeruserdata');
    localStorage.removeItem('loggedstatus');  
    sessionStorage.clear();   
    this.objCart.cartId.next("0");
    this.objCart.cartCount.next("");  
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
  
  isLoggedIn(): Observable<boolean> {     
    return this.loggedIn.asObservable();
  }

}
