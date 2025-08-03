import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-showmyqrcode',
  templateUrl: './attendanceqr.page.html',
  styleUrls: ['./attendanceqr.page.scss'],
})
export class AttendanceqrPage implements OnInit {

  uData = {
    uname:'',
    urole:'',
    uemail:''
  };
  qrcodescancode: any;  
  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams2: Subscription;
  subParams1: Subscription;
  subParams3: Subscription;

  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }
  public cartCount = "";
  public ncsCount = "";
  

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public objCart : CartService,
  ) { 
   

  }

  ngOnInit() {
    this.checkloginstatus();  
  }

  ngOnDestroy() {
    this.subParams1.unsubscribe();
    this.subParams2.unsubscribe();
    this.subParams3.unsubscribe();
  }

  getCartCount(){
    this.data$ = this.objCart.getCartCount();  
    this.subParams2 = this.data$.subscribe(
      (result) => {
          this.cartCount = result;                    
      },
      (error) => {
       
      }
    );
  }
  

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;  
            this.fngetuserdetails(); 
            this.getCartCount();  
            this.getNCSCount();       
        }          
      },
      (error) => {
        this.islogged = false;
      }
    );
  }

  getNCSCount(){
    this.data$ = this.objCart.getNCSCount();  
    this.subParams3 = this.data$.subscribe(
      (result) => {
          this.ncsCount = result;                    
      },
      (error) => {
       
      }
    );
  }

  gotocart(){
    this.route.navigate(['cart']);
  }

  gotonotifications(){
    this.route.navigate(['notifications']);
  }
  
  fngetuserdetails(){

    if(localStorage.getItem("loggeruserdata") === null){  
     
      
    }else{

      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      this.uData.uname = stData.uname;
      this.uData.uemail = stData.uemail;
      this.uData.urole = stData.urole;     

      this.qrcodescancode = btoa("attendance");
    }

  }
 
  onBack() {
    this.navCtrl.back();
  }


}
