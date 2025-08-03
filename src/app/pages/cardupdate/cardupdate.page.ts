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
  templateUrl: './cardupdate.page.html',
  styleUrls: ['./cardupdate.page.scss'],  
})
export class CardupdatePage implements OnInit {


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
    location_id: ""
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

  } 

  ngOnDestroy() {   
    this.subParams3.unsubscribe();
  }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;                
            this.subParams = this.router.params.subscribe(params => {           
              this.fnGetUserDetails();   
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
              this.userdata.uemail = uddata.email;
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

  onPaymentProcessStripe(){    
    this.onProcessPayment();
  }

gotocart(){
  this.route.navigate(['cart']);
}

gotonotifications(){
  this.route.navigate(['notifications']);
}

  async showAlertMessage(head_msg,errorMessage) {
    const alert = await this.alertController.create({
      header: head_msg,     
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }


  onProcessPayment(){
    this.loadctrlPresent();
    this.stripeService.createToken(this.card.element).subscribe((result) => {
      if (result.error) {
        this.dismissLoadctrl(); 
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        this.showAlertMessage('Failed',result.error.message);
      } else {
        let pDetails = this.objUsr.getDPartnerDetails();
        let loguserdata = {
          email : this.userdata.uemail,
          card_token : result.token.id,
          cart_source: pDetails.cartsource_flag
         };
    
        this.objUsr.updateCardDetails(loguserdata).subscribe(
          (data:any) => {
                if(data.status=="success"){  
                  this.showAlertMessage('Success',data.message);
                }else{
                  this.showAlertMessage('Success',data.message);
                }
                //this.dataLoadFlag = true;
                   
          },
          (err) => {
           
          }
        );

       
        this.dismissLoadctrl(); 
      }
    }); 

  }


}
