import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-bookingconfirm',
  templateUrl: './bookingconfirm.page.html',
  styleUrls: ['./bookingconfirm.page.scss'],
})
export class BookingconfirmPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription; 
  subParams3: Subscription;
  
    public appLogoPath = "";

  public partnerDetails = {
    partner_id : "",
    location_id: "",
    currency_symbol: "&pound;"
  }
  
  public paymentData = {
    cart_id : "",
    paymentintentid: "",
    paymentcredit: "",
  }; 
  
  public payConfirmData = {
    cart_id : "",
    cartitems: [],
    totalamount: "",
    discountamount: "",
    grand_total: "",
  };  
  public cartCount = "";
  public ncsCount = "";

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,   
    public objCourserv: CourseService,
    public objUsr : UserService,
    public objCart : CartService,
  ) { }

  ngOnInit() {
    this.checkloginstatus(); 
    let pDetails = this.objUsr.getDPartnerDetails();
    if(pDetails.currency_symbol){
      this.partnerDetails.currency_symbol = pDetails.currency_symbol; 
    }
  }

  ngOnDestroy() {
    this.subParams1.unsubscribe(); 
    this.subParams3.unsubscribe();
  }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;  
            this.appLogoPath = this.objUsr.getParterLogo();  
            
           
            
            this.subParams = this.router.params.subscribe(params => {   
              if (this.route.getCurrentNavigation().extras.state != undefined) {
                  let scData = this.route.getCurrentNavigation().extras.state.paymentData; 
                  this.paymentData.cart_id = scData.cart_id;
                  this.paymentData.paymentcredit = scData.paymentcredit;
                  this.paymentData.paymentintentid = scData.paymentintentid;    
                  this.getBookingConfirmationData();                   
              }else{
                  //this.route.navigate(['/cart']);
              }     
            });
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


  getBookingConfirmationData(){  

    this.objCart.cartId.next("0");
    this.objCart.cartCount.next("");

    this.loadctrlPresent();
    let payLoad = {
      cartId: this.paymentData.cart_id,
      paymentintentid: this.paymentData.paymentintentid, 
      paymentcredit: this.paymentData.paymentcredit,    
    };
    this.objCart.getPaymentConfirmation(payLoad).subscribe(
      (data:any) => { 
        this.dismissLoadctrl(); 
        if(data){ 
          if(data.status == "success"){
            this.payConfirmData.cart_id = data.cart_id;
            this.payConfirmData.cartitems = data.cart_items;
            this.payConfirmData.discountamount = data.discount_value;
            this.payConfirmData.grand_total = data.grand_total;  
          }
        }               
      },
      (err) => {
        this.dismissLoadctrl();       
      }
    );    
  }

  togomyaccount(){

    if(this.islogged == true){
      this.route.navigate(['/myaccount']);
    }else{
      this.route.navigate(['login']);
    }
  }
  
  gotohome(){
      this.route.navigate(['/home']);
  }
  
  gotoourclasses(){
    this.route.navigate(['ourclasses']);
  }
  
  gotocart(){
    this.route.navigate(['cart']);
  }

  togosubscriptions(){
    this.route.navigate(['tangosubscriptions']);
  }

  gotonotifications(){
    this.route.navigate(['notifications']);
  }

}
