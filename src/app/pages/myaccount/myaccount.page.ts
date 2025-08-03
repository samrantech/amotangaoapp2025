import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

  uData = {
    uname:'',
    urole:'',
    uemail:'',
    allowadminfeatures: '',
    appadminfeatures:[],
    approfilemenulist:[],
  };
  public islogged:any;
  data$: Observable<any>;
  data: any;
  subParams2 : Subscription;
  subParams3: Subscription;

  private subscription: Subscription;
  public isLoading:any;
  public appLogoPath = "";

  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }
  public cartCount = "";
  public ncsCount = "";

  constructor(
    private router: Router,
    public objAuthSer: AuthService,
    public loadingController: LoadingController,  
    public objUserService: UserService,
    public objCart : CartService,
  ) { 

   }

  ngOnInit() {
    this.checkloginstatus();  
  }

  ngOnDestroy() {   
    this.subscription.unsubscribe();
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
    this.router.navigate(['cart']);
  }

  gotonotifications(){
    this.router.navigate(['notifications']);
  }
  
  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subscription = this.data$.subscribe(
      (result) => {
        if(result == true){
            let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
            this.uData.uname = stData.uname;
            this.uData.uemail = stData.uemail;
            this.uData.urole = stData.urole;  
            this.uData.allowadminfeatures = stData.allowadminfeatures;
            this.uData.appadminfeatures = stData.appadminfeatures;  
            this.fngetuserprofilemenus();
            this.appLogoPath = this.objUserService.getParterLogo(); 
            this.getCartCount(); 
            this.getNCSCount();   

        } else{
            this.router.navigate(['login']);
        }          
      },
      (error) => {
        this.islogged = false;
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


  fngetuserprofilemenus(){    

    this.loadctrlPresent();    
    let postFdata = { 
      user_role: this.uData.urole,    
      feature_flag: 'appprofilemenu',
      uemail: this.uData.uemail,          
    };

    this.objUserService.fngetfeateruslistbyflag(postFdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){                
                this.uData.approfilemenulist = data.featuredata;
            }
               
      },
      (err) => {
       
      }
    );
}
   

 onClickmenuitems(mData){

      if(mData.menuflag == "myqr"){
        this.gotomyshowqucode();
      }

      if(mData.menuflag == "myprofile"){
        this.goToEditProfile();
      }
      
      if(mData.menuflag == "mylevel"){
        this.goToMyLevel();
      }

      if(mData.menuflag == "bookinghistory"){
        this.goToBookingHistory();
      }

      if(mData.menuflag == "mysubscriptions"){
        this.gotomysubsription();
      }

      if(mData.menuflag == "adminfeatures"){
        this.gotoadminfeatures();
      }

      if(mData.menuflag == "delmyaccount"){
        this.gotdeleterequest();
      }
      if(mData.menuflag == "partnersearch"){
        this.togopartnersearch();
      }
      if(mData.menuflag == "keyconcepts"){
        this.togokeyconcepts();
      }
      if(mData.menuflag == "managekeyconcepts"){
        this.togomanagekeyconcepts();
      }
      if(mData.menuflag == "managekeymapping"){
        this.togomanagekeymapping();
      }
      if(mData.menuflag == "cardupdate"){
        this.togomanagecardupdate();
      }
      if(mData.menuflag == "classpack"){
        this.togoclasspack();
      }
      if(mData.menuflag == "manageguestpass"){
        this.togomanageguestpass();
      }

 }


  onLogoutuser(){
      this.objAuthSer.userlogout();
  }

  goToEditProfile(){
    this.router.navigateByUrl('/profile')   
  }

  goToBookingHistory(){
    this.router.navigateByUrl('/bookinghistory')   
  }
  goToMyLevel(){
    this.router.navigateByUrl('/mylevel')   
  }

  gotomysubsription(){
    this.router.navigateByUrl('/mysubscriptions')   
  }

  gotoadminfeatures(){
    this.router.navigateByUrl('/adminfeatures')   
  }

  gotomyshowqucode(){
    this.router.navigateByUrl('/showmyqrcode')   
  }


  gotdeleterequest(){
    this.router.navigateByUrl('/deleteacrequest')   
  }

  gotohome(){
    this.router.navigate(['/home']);
}

gotoourclasses(){
  this.router.navigate(['ourclasses']);
}

togosubscriptions(){
  this.router.navigate(['tangosubscriptions']);
}

goToTangoEvents(){
  this.router.navigate(['tangoevents']);
}

gotoweeklyschedule(){
  this.router.navigate(['weeklyschedule']);
}
togopartnersearch(){
  this.router.navigate(['/partnersearch']);
}
togokeyconcepts(){
  this.router.navigate(['/keyconcepts']);
}
togomanagekeyconcepts(){
  this.router.navigate(['/managekeyconcepts']);
}
togomanagekeymapping(){
  this.router.navigate(['/managekeymapping']);
}
togomanagecardupdate(){
  this.router.navigate(['/cardupdate']);
}
togoclasspack(){
  this.router.navigate(['/classpack']);
}
togomanageguestpass(){
  this.router.navigate(['/manageguestpass']);
}
}
