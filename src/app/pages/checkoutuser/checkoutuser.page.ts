import { Component, OnInit,ViewChild  } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LoadingController,AlertController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-checkoutuser',
  templateUrl: './checkoutuser.page.html',
  styleUrls: ['./checkoutuser.page.scss'],  
})
export class CheckoutuserPage implements OnInit {


  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams2: Subscription;
  subParams3: Subscription;

  public appLogoPath = "";

  public ncsCount = "";

   public partnerDetails = {
    partner_id : "",
    location_id: "",
    currency_symbol: "&pound;"
  }
  public cartItems: any[] = [];
  public cartId = "";
  public cartCount : any = "";
  public cartTotalAmount: any = "";

  public userdata ={
    usalutation:'',
    ufirstname:'',
    ulastname:'',
    uemail:'',
    uphone:'',
    ugender:'',
    uaddress1:'',
    uaddress2:'',
    ucity:'',
    upostcode:'',
    ucountry:'GB',
    unewsletter:'',    
    uuid:'',
   }
   public bilEditFlag : any =  false;
   public arrCountrylist = [];
   public dataLoadFlag : any =  false;

@ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
public cardOptions: StripeCardElementOptions = {
  iconStyle: 'solid',
    style: {
      base: {
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '18px',
        iconColor: '#666EE8',
        color: '#002333',
        '::placeholder': {
          color: '#919191',
        },
      },
      invalid: {
        iconColor: '#ff0000',
        color: '#ff0000'
      }
    },
  };
  
  

public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };  
  
  constructor(
    public objAuthSer: AuthService, 
    public objUsr : UserService,
    public route: Router,
    public router: ActivatedRoute,
    public objCart : CartService,
    public loadingController: LoadingController,   
    private stripeService: StripeService,
    private http: HttpClient,
    private alertController: AlertController,
  ) { 
    
  }

  ngOnInit() {
    this.checkloginstatus();
    let pDetails = this.objUsr.getDPartnerDetails();
    if(pDetails.currency_symbol){
      this.partnerDetails.currency_symbol = pDetails.currency_symbol;
    }
  } 

  ngOnDestroy() {   
    this.subParams3.unsubscribe();
  }

  fngetcountrylists(){   
   
    let postFdata = { published: 1 };
    this.objUsr.fngetcountrylists(postFdata).subscribe(
      (data:any) => {                    
            if(data.status=="success"){                
              this.arrCountrylist = data.countrylists;
            }               
      },
      (err) => { }
    );
}


  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;                
            this.subParams = this.router.params.subscribe(params => {   
              if (this.route.getCurrentNavigation().extras.state != undefined) {
                  let scData = this.route.getCurrentNavigation().extras.state.cartData;  
                  this.cartId = scData.cartId;
                  this.cartItems = scData.cartItems;
                  this.cartCount = scData.cartCount;
                  this.cartTotalAmount = scData.cartTotalAmount;                    
                  this.fnGetUserDetails();   
                              
              }else{
                this.route.navigate(['/cart']);
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

  backToBasket(){
    this.route.navigate(['/cart']);
  }

  fnOnchangeinput($event){
   
    if($event.target.id == "uaddress1"){     
      this.userdata.uaddress1 = $event.target.value
    }else if($event.target.id == "uaddress2"){     
      this.userdata.uaddress2 = $event.target.value
    }else if($event.target.id == "ucity"){     
      this.userdata.ucity = $event.target.value
    }else if($event.target.id == "upostcode"){     
      this.userdata.upostcode = $event.target.value
    }else if($event.target.id == "ucountry"){     
      this.userdata.ucountry = $event.target.value
    }

  }

  fnGetUserDetails(){

    let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
    this.userdata.uemail = stData.uemail;    

    let loguserdata = {
      email : this.userdata.uemail
     };

    this.objUsr.getuserdetails(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
              let uddata = data.userdetails;
              this.userdata.usalutation = uddata.salutation;
              this.userdata.ufirstname = uddata.firstname;
              this.userdata.ulastname = uddata.lastname;
              this.userdata.uemail = uddata.email;
              this.userdata.uphone = uddata.phone_number;
              this.userdata.ugender = uddata.gender;
              this.userdata.uaddress1 = (uddata.address_line1 == null) ? "" : uddata.address_line1 ;
              this.userdata.uaddress2 = uddata.address_line2;
              this.userdata.ucity = (uddata.city == null) ? "" : uddata.city ;
              this.userdata.upostcode = (uddata.post_code == null) ? "" : uddata.post_code ;
              this.userdata.ucountry = (uddata.country == "") ? "GB" : uddata.country ;
              this.userdata.unewsletter = uddata.newsletter_subscription;    
              this.userdata.uuid = uddata.user_id;                
              this.fngetcountrylists();
             
              if(this.userdata.uaddress1 == "" || this.userdata.ucity == "" || this.userdata.upostcode == ""){
                this.bilEditFlag = true;
              }

              if(this.userdata.uaddress1 == null || this.userdata.ucity == null || this.userdata.upostcode == null){
                this.bilEditFlag = true;
              }
              
            }else{
              this.bilEditFlag = true;
            }
            this.dataLoadFlag = true;
               
      },
      (err) => {
       
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

  fnclearmessage(){
    document.getElementById('euaddress1').innerHTML = '';
    document.getElementById('eucity').innerHTML = '';
    document.getElementById('eupostcode').innerHTML = '';
    document.getElementById('eucountry').innerHTML = '';    
  }

  fnValidateform(){
    let valid;
    
    if(this.userdata.uaddress1 ==''){
      document.getElementById('euaddress1').innerHTML = "Enter the Billing Address";
        valid=0;			
    }
    if(this.userdata.ucity == ''){
      document.getElementById('eucity').innerHTML = "Enter the city";
      valid=0;
    }
    
    if(this.userdata.upostcode == ''){
      document.getElementById('eupostcode').innerHTML = "Enter the Post Code";
      valid=0;
    }
    if(this.userdata.ucountry == ''){
      document.getElementById('eucountry').innerHTML = "Select the country";
      valid=0;
    }

    if(valid==0){
			return false;			
		}else{
			return true;
		}	  

    return valid
  }

  onPaymentProcessStripe(){    
    if(this.bilEditFlag == true){
        this.fnclearmessage();
        if(this.fnValidateform()==true){ 
          this.onProcessPayment();
        }
    }else{    
      this.onProcessPayment();
    }

  }

  onEditBillingDetails(){
    this.bilEditFlag = true;
  }

  
gotocart(){
  this.route.navigate(['cart']);
}

gotonotifications(){
  this.route.navigate(['notifications']);
}


  onProcessPayment2(){
  
    let payData = {
      cart_id : this.cartId,
      paymentintentid: "",
      paymentcredit: "",
   };
  let navextra: NavigationExtras = { state: { 'paymentData': payData} };
  this.route.navigateByUrl("/bookingconfirm",navextra);   
  }

  async showAlertMessage(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Payment Failed',     
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  onProcessFreePayment(){

    this.loadctrlPresent();
    
     this.objCart.createPaymentIndent(this.cartId, this.userdata).subscribe(
      (data:any) => { 
        this.dismissLoadctrl(); 
        if(data){ 
          if(data.status == "payment_success"){
          sessionStorage.removeItem('TCCARTID');
          sessionStorage.removeItem('TCCARTCOUNT'); 
          this.objCart.cartId.next("0");
          this.objCart.cartCount.next("");
          // Show a success message to your customer
          let payData = {
              cart_id : this.cartId,
              paymentintentid: "",
              paymentcredit: "true",
          };
          let navextra: NavigationExtras = { state: { 'paymentData': payData} };
          this.route.navigateByUrl("/bookingconfirm",navextra);   
          }
        }               
      },
      (err) => {
        this.dismissLoadctrl();       
      }
    );    

  }

  onProcessPayment(){

    this.loadctrlPresent();
    
    this.objCart.createPaymentIndent(this.cartId, this.userdata)
    .pipe(
      switchMap((pi:any) =>
        this.stripeService.confirmCardPayment(pi.clientsecret, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              name: this.userdata.ufirstname + " " + this.userdata.ulastname
            },
          },
        })
      )
    )
    .subscribe((result) => {
      if (result.error) {
        this.dismissLoadctrl(); 
        // Show error to your customer (e.g., insufficient funds)
        //console.log(result.error.message);
        this.showAlertMessage(result.error.message);
      } else {
        this.dismissLoadctrl(); 
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          sessionStorage.removeItem('TCCARTID');
          sessionStorage.removeItem('TCCARTCOUNT'); 
          this.objCart.cartId.next("0");
          this.objCart.cartCount.next("");
          // Show a success message to your customer
          let payData = {
              cart_id : this.cartId,
              paymentintentid: result.paymentIntent.id,
              paymentcredit: "",
          };
          let navextra: NavigationExtras = { state: { 'paymentData': payData} };
          this.route.navigateByUrl("/bookingconfirm",navextra);   

        }
      }
    }); 

  }


}
