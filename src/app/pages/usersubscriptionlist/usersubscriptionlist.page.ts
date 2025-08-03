import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { LoadingController,ToastController } from '@ionic/angular';
import { Observable,Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './usersubscriptionlist.page.html',
  styleUrls: ['./usersubscriptionlist.page.scss'],
})
export class LevelPage implements OnInit {

  public subscriptionData = {
    item_name: '',
    item_category: 'subscription',
    item_desc: '',
    item_plan_disp_text: '',
    item_price: '',
    item_id: '',
    substdate: '',
    item_qty: 1,
    item_stdate: '',
    old_plan_id: ''
  };
   userdata ={
    uemail:'', 
    uuid:'',
    cartsource_flag: '',
    subscription_id: '',
    other_reason: '',
    feedback: '',
    reason_pause: ''
   }
   SubsPlanslist: any;
   salutationlist = [];
  public reasons = [];
  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams2: Subscription;
  subParams1: Subscription;
  subParams3: Subscription;

  public partnerDetails = {
    partner_id : "",
    location_id: "",
    currency_symbol: "&pound;"
  }
  public userData = {
    tangoCommunity: "1",
    entryLevel: "",
    firstname:"",
    lastname:"",
    userphoneno:"",
    useremail:"",
    usercity:"",
    usercountry:"GB",
    userpassword:"",
    unewsletter:"",
    hear_about: "",
    hear_about_others: "",
    other_reason: "",
    feedback: "",
    reason_pause: ""
}
  public nsubsplanid = "";
  public showcancelpop = 0;
  public showpausepop = 0;
  public cartCount = "";
  public ncsCount = "";
  public arrOurclasses = [];
  public subsplan = [];
  public cancel_reasons:any;
  public subscription_menu_flag = [];
  public rehis = 1;
  public resubs = 0;
  public cansubs = 0;
  public upsubs = 0;
  public substdate = this.getCurrentDate();
  public pausestdate = this.getCurrentDate();
  public pauseetdate : any;
  public upsubstdate = this.getCurrentDate();
  public upgrade_msg = '';
  public upgradefee = '';
  public upsubsplan : any;
  public buttonDisabled = false;
  minDate: string;

  constructor(
    public route: Router,
    public router: ActivatedRoute,
    public objUserService: UserService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private toastController: ToastController,
    public objCart : CartService,
    public objAuthSer: AuthService,
    private location: Location
  ) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      this.minDate = `${year}-${month}-${day}`;
    
   }


  ngOnInit() {
    this.checkloginstatus();
    let pDetails = this.objUserService.getDPartnerDetails();
    if(pDetails.currency_symbol){
      this.partnerDetails.currency_symbol = pDetails.currency_symbol;
    }
  }
  ngOnDestroy() {
    this.subParams.unsubscribe();
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
  getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let rtDate = yyyy + '-' + mm + '-' + dd;
    return rtDate;
  }


  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;  
            this.getCartCount();   
            this.getNCSCount();   
            this.subParams = this.router.params.subscribe((params) => {
              if (this.route.getCurrentNavigation().extras.state != undefined) {
                this.userdata.subscription_id = this.route.getCurrentNavigation().extras.state.subs_id;
                this.fnGetUserDetails();
              }
            });
        }          
      },
      (error) => {
        this.islogged = false;
      }
    );
  }

  fnGetUserDetails(){

    let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
    this.userdata.uemail = stData.uemail;    

    let loguserdata = {
      email : this.userdata.uemail
     };

    this.objUserService.getuserdetails(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
              this.userdata.uuid = data.userdetails.user_id;
              this.fnGetBookings();    
            }
               
      },
      (err) => {
       
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

  gotocart(){
    this.route.navigate(['cart']);
  }

  gotonotifications(){
    this.route.navigate(['notifications']);
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

    let loguserdata = {
      student_id : this.userdata.uuid,
      subscription_id : this.userdata.subscription_id
    };
    console.log(loguserdata)
    this.objUserService.getsubsdetails(loguserdata).subscribe(
      (data:any) => {
            
            
            if(data.status=="success"){  
              this.arrOurclasses = data.student_plan_history;
              this.subsplan = data.subs_plan;
              this.subscriptionData.item_id = data.subs_plan.subscriptionid;
              this.subscriptionData.item_name = data.subs_plan.subscription_title+ '- Renewal';
              this.subscriptionData.item_price = data.subs_plan.paid_amount;
              this.subscriptionData.item_qty = 1;
              this.subscriptionData.item_category = 'subscription';
              this.substdate = this.getCurrentDate();
              this.cancel_reasons = Object.values(data.cancel_reasons);
              this.SubsPlanslist = data.subscription_plans;
              this.subscription_menu_flag = data.subscription_menu_flag;
              
            }else{
             
            }
               
      },
      (err) => {
       
      }
    );

  }

  gotorehis(){
    this.rehis = 1;
    this.resubs = 0;
    this.cansubs = 0;
    this.upsubs = 0;
  }
  gotoresubs(){
    this.rehis = 0;
    this.resubs = 1;
    this.cansubs = 0;
    this.upsubs = 0;
  }
  gotocansubs(){
    this.rehis = 0;
    this.resubs = 0;
    this.cansubs = 1;
    this.upsubs = 0;
  }
  goupgradesubs(){
    this.rehis = 0;
    this.resubs = 0;
    this.cansubs = 0;
    this.upsubs = 1;
  }
  onLoadcontsubs(){
    let loguserdata = {
      student_id : this.userdata.uuid,
      subscription_id : this.userdata.subscription_id
    };
    
    this.objUserService.sendsubcontinueemail(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
             alert(data.message)
              
            }else{
             
            }
               
      },
      (err) => {
       
      }
    );
  }
  onLoadpausesubs(){
    this.showpausepop = 1;
  }
  onLoadcansubs(){
    this.showcancelpop = 1;
  }

  addToCart(type) {
  
    let pDetails = this.objUserService.getDPartnerDetails();
    let cartSource = pDetails.cartsource_flag;
    let cartItemData: any = '';

   
      this.subscriptionData.substdate = this.substdate;
      if(type == "upgradersubscription"){
        this.subscriptionData.item_name = this.upsubsplan.subscription_title;
        this.subscriptionData.item_price = this.upgradefee;
        this.subscriptionData.item_stdate = this.upsubstdate;
        this.subscriptionData.old_plan_id = this.subscriptionData.item_id;
        this.subscriptionData.item_id = this.nsubsplanid;
      }
      cartItemData = {
        cartId: '',
        itemType: type,
        cartData: this.subscriptionData,
        cart_source: cartSource,
      };
    
   
    this.loadctrlPresent();

    this.objCart.addToCart(cartItemData).subscribe(
      (data: any) => {
        if (data) {
          let cartId = data.cart_id;
          sessionStorage.setItem('TCCARTID', cartId);
          this.objCart.cartId.next(cartId);
          this.dismissLoadctrl();
          //this.modalController.dismiss();
          this.route.navigateByUrl('cart');
        }
      },
      (err) => {
        // this.showAlertMessage();
        // this.modalController.dismiss();
      }
    );
  }

  fnOnchangecheckbox($event){   
    console.log($event.currentTarget.value)
    var newItem = $event.currentTarget.value;
    if($event.currentTarget.checked == true){
      //var b = [1, 7, 8, 4, 3];
      this.reasons.indexOf(newItem) === -1 && this.reasons.push(newItem)
    }
    else{
      console.log(false)
      this.reasons.splice(newItem,1)
    }
    console.log(this.reasons)
  }
  fnOnchangeupgrade($event){
    if(this.nsubsplanid != ''){
      this.onupgradefees();
    }
  }
  fnOnchangeinput($event){   
    //this.fnclearmessage();
    if($event.target.id == "other_reason"){     
      this.userData.other_reason = $event.target.value
    }else if($event.target.id == "feedback"){
      this.userData.feedback = $event.target.value
    }
    else if($event.target.id == "reason_pause"){
      this.userData.reason_pause = $event.target.value
    }
   
  }
  onLoadcansubmit(){
    this.buttonDisabled = true;
    let loguserdata = {
      user_id : this.userdata.uuid,
      subs_id : this.userdata.subscription_id,
      admin_userid: this.userdata.uuid,
      other_reason: this.userData.other_reason,
      feedback: this.userData.feedback,
      reasons: this.reasons
    };
    
    this.objUserService.sendcancelsubs(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
             alert(data.message)
             this.location.back();
              
            }else{
              this.buttonDisabled = null;
            }
               
      },
      (err) => {
       
      }
    );
  }
  onLoadpausesubmit(){
    let loguserdata = {
      user_id : this.userdata.uuid,
      subs_id : this.userdata.subscription_id,
      admin_userid: this.userdata.uuid,
      pause_start_date: this.pausestdate.split('T')[0],
      pause_end_date: this.pauseetdate.split('T')[0],
      reason_pause: this.userData.reason_pause
    };
    
    this.objUserService.sendpausesubs(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
             alert(data.message)
              
            }else{
              alert(data.message)
            }
               
      },
      (err) => {
       
      }
    );
  }
  onupgradefees(){
    let loguserdata = {
      user_id : this.userdata.uuid,
      csubsplanid : this.userdata.subscription_id,
      upgradstdate: this.upsubstdate,
      nsubsplanid: this.nsubsplanid
    };
    
    this.objUserService.sendupgradesubs(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
             this.upgrade_msg = data.message;
             this.upsubsplan = data.upplandetails;
             this.upgradefee = data.upgradefee;
            }else{
              alert(data.message)
            }
               
      },
      (err) => {
       
      }
    );
  }
}

