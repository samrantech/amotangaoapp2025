import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { LoadingController,ToastController } from '@ionic/angular';
import { Observable,Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './classpack.page.html',
  styleUrls: ['./classpack.page.scss'],
})
export class LevelPage implements OnInit {

  qrcodescancode: any; 
   userdata ={
    uemail:'', 
    uuid:'',
    cartsource_flag: ''
   }
   arrCountrylist: any;
   salutationlist = [];

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
  public arrOurclasses = [];
  constructor(
    private router: Router,
    public objUserService: UserService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private toastController: ToastController,
    public objCart : CartService,
    public objAuthSer: AuthService,
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
            this.fnGetBookings();
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

  onBack() {
    this.navCtrl.back();
  }

  onatob(scantext){
    return btoa(scantext);
  }
  gotocart(){
    this.router.navigate(['cart']);
  }

  gotonotifications(){
    this.router.navigate(['notifications']);
  }


  async loadctrlPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
      
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoadctrl() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => '');
  }


  fnGetBookings(){

    if(localStorage.getItem("loggeruserdata") === null){  
     
      
    }else{

      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      let pDetails = this.objUserService.getDPartnerDetails();
      this.userdata.cartsource_flag = pDetails.cartsource_flag;
      this.userdata.uemail = stData.uemail;    
    }

    let loguserdata = {
      email : this.userdata.uemail,
      bsource : this.userdata.cartsource_flag
  };

    this.objUserService.fngetclasspackshistory(loguserdata).subscribe(
      (data:any) => {
            
            
            if(data.status=="success"){  
              this.arrOurclasses = data.bookinghistory;
              this.qrcodescancode = btoa("attendance");
              
            }else{
             
            }
               
      },
      (err) => {
       
      }
    );

  }



}
