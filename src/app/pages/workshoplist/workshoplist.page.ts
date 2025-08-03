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
  selector: 'app-workshoplist',
  templateUrl: './workshoplist.page.html',
  styleUrls: ['./workshoplist.page.scss'],
})
export class WorkshoplistPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams2 : Subscription;
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

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,   
    public objCourserv: CourseService,
    public objUsr : UserService,
    public objCart : CartService,
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
          this.fnGeWorkhopList();
          this.getCartCount();        
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


  fnGeWorkhopList(){
    this.loadctrlPresent();
    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;   
    
    let payLoadData = { 
      active_status: "active",   
      partner_id: this.partnerDetails.partner_id,     
    };

    this.objCourserv.getWorkShopGroupList(payLoadData).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){  
               this.arrOurclasses = data.courselist;      
            }               
      },
      (err) => {
        this.dismissLoadctrl();         
      }
    );

  }

  fngetpagesdata(){
    

    this.loadctrlPresent();

    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;    
    let loguserdata = { 
      menu_slug: "taspecialevents",   
      partner_id: this.partnerDetails.partner_id,
      location_id: this.partnerDetails.location_id, 
    };
    this.objCourserv.getmenlistbyslug(loguserdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){  
               this.arrOurclasses = data.menudata;      
            }
               
      },
      (err) => {
       
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

gotoourclasses(){
  this.route.navigate(['ourclasses']);
}

togosubscriptions(){
  this.route.navigate(['tangosubscriptions']);
}

gotocart(){
  this.route.navigate(['cart']);
}

gotoweeklyschedule(){
  this.route.navigate(['weeklyschedule']);
}

goToTangoEvents(){
  this.route.navigate(['tangoevents']);
}

onLoadcoursepage(itemdata){  
  
  if(itemdata.page_flag == "mleventdetails"){
    let navextra: NavigationExtras = { state: { 'clevel': itemdata.menu_levelflag } };
    this.route.navigateByUrl("/meventdetails",navextra);    
  }  
  
}

onLoadWorkshopItems(itemdata) {    
  let navextra: NavigationExtras = { state: { wkgroupid: itemdata.id } };
  this.route.navigateByUrl('/workshopitems', navextra);
}

}
