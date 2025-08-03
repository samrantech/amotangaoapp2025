import { Component, OnInit } from '@angular/core';
import { NavController,Platform  } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams2 : Subscription;
  subParams3 : Subscription;

  public courseLevel: any;
  public arrClasslist: [];
  public arrLevelDesiptions :[];
  public leveDesc:any;
  public cpagedata = {
    page_slug: 'subcriptions',
    page_title: '',
    page_content:'',
    page_fimageurl: '',   
  };

  slideOptsOne = {
    initialSlide: 0,
    autoplay:true
   };

   public partnerDetails = {
    partner_id : "",
    location_id: ""
  }

  public arrOurclasses = [];
  public appLogoPath = "";
  public cartCount = "";

  public hasPermission: boolean;
  public token: string;

  public ncsCount = "";

  
  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,  
    public objCourserv: CourseService,
    public objUsr : UserService,
    public objCart : CartService,
    private stSer: StripeService,     
  ) { 


  }
  ngOnInit() {
    this.checkloginstatus();    
  }

  gotoSubsriptionpage(){
    this.route.navigate(['subcriptionlist']);
  }

  ngOnDestroy() {
    this.subParams1.unsubscribe();
    this.subParams2.unsubscribe();    
  }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        this.islogged = result; 
        if(result == true){            
          this.appLogoPath = this.objUsr.getParterLogo(); 
          this.fngetpagesdata();
          this.getCartCount();
          this.getnofiticationlist();
          //this.getNCSCount();
          let pDetails = this.objUsr.getDPartnerDetails();
          this.stSer.changeKey(pDetails.stripe_key);  
          this.fnOneSignalInit(); 
             
        }else{
          this.route.navigate(['/']);
        }
      },
      (error) => {
        this.islogged = false;
        this.route.navigate(['/']);
      }
    );
  }


  fnOneSignalInit(){   
    OneSignal.initialize("70e160a8-c22f-418c-87c5-becb50a16aa2");     
    let myClickListener = async function(event) {
        let notificationData = JSON.stringify(event); 
        alert(notificationData);        
    };  
    OneSignal.Notifications.requestPermission().then((accepted: boolean) => {
      if(accepted==true){
        //let subsId = OneSignal.User.pushSubscription.id;
         OneSignal.Notifications.addEventListener("click", myClickListener);           
         this.fnGetOneSignalToken();
      }      
    });
    
}

  fnGetOneSignalToken(){   
    
    if(OneSignal.Notifications.hasPermission){
      let stData = JSON.parse(localStorage.getItem('loggeruserdata')); 
      OneSignal.User.pushSubscription; 
      OneSignal.User.addEmail(stData.uemail);        
      let ogId = OneSignal.User.pushSubscription.id;
      let ogToken = OneSignal.User.pushSubscription.token;        
      this.registerOSGToen(ogId,ogToken);
    }

  }


  registerOSGToen(oId,OToken){
    let pDetails = this.objUsr.getDPartnerDetails();
    let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;    
    let fcmRegisterData = { 
      email: stData.uemail,   
      og_id: oId,
      og_token: OToken,
      partner_id: this.partnerDetails.partner_id,
      partner_location: this.partnerDetails.location_id, 
    };

    this.objUsr.fnRegisterOSGToken(fcmRegisterData).subscribe(
      (data:any) => {
           this.isLoading = false;       
            if(data.status=="success"){                
            }               
      },
      (err) => {
        this.isLoading = false;         
      }
    );
  }

  registerfcmtoken(fcmToken){
    let pDetails = this.objUsr.getDPartnerDetails();
    let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;    
    let fcmRegisterData = { 
      email: stData.uemail,   
      fcm_token: fcmToken,
      partner_id: this.partnerDetails.partner_id,
      partner_location: this.partnerDetails.location_id, 
    };

    this.objUsr.fnRegisterFCMToken(fcmRegisterData).subscribe(
      (data:any) => {
           this.isLoading = false;       
            if(data.status=="success"){                
            }               
      },
      (err) => {
        this.isLoading = false;         
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


  getnofiticationlist() {
    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id; 
    let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
    let useremail = stData.uemail;  
    let postFdata = {
      user_email: useremail,
      partner_id: this.partnerDetails.partner_id,   
    };
  
    this.objCourserv.getNoficationCount(postFdata).subscribe(
      (data: any) => {     
        if (data.status == 'success') {
          this.ncsCount = (data.notificationcounts > 0) ? data.notificationcounts  : '' ;
          sessionStorage.setItem('TCNCSCOUNT',this.ncsCount);           
          this.objCart.ncsCount.next(this.ncsCount);
        }
      },
      (err) => {}
    );
  }

  fngetpagesdata(){

    this.isLoading = true;
    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;    
    let loguserdata = { 
      menu_slug: "homepage",   
      partner_id: this.partnerDetails.partner_id,
      location_id: this.partnerDetails.location_id, 
    };
    this.objCourserv.getmenlistbyslug(loguserdata).subscribe(
      (data:any) => {
           this.isLoading = false;       
            if(data.status=="success"){  
               this.arrOurclasses = data.menudata;      
            }
               
      },
      (err) => {
        this.isLoading = false;         
      }
    );
}

togomyaccount(){

  if(this.islogged == true){
    this.route.navigate(['/myaccount']);
  }else{
    this.route.navigate(['/']);
  }
}

gotohome(){
    this.route.navigate(['/home']);
}

goToTangoEvents(){
  this.route.navigate(['tangoevents']);
}

gotoourclasses(){
  this.route.navigate(['ourclasses']);
}

togosubscriptions(){
  this.route.navigate(['tangosubscriptions']);
}

gotocart(){
  this.route.navigate(['cart']);
}

gotonotifications(){
  this.route.navigate(['notifications']);
}
togomyqr(){
  this.route.navigate(['showmyqrcode']);
}
gotoweeklyschedule(){
  this.route.navigate(['weeklyschedule']);
}


onLoadcoursepage(itemdata){  
  
  if(itemdata.page_flag == "course"){
    let navextra: NavigationExtras = { state: { 'clevel': itemdata.menu_levelflag } };
    this.route.navigateByUrl("/courselist",navextra);    
  }
  
}

}
