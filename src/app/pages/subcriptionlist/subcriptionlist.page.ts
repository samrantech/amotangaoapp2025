import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
import { BookmarkModelPage } from '../bookmark-model/bookmark-model.page';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-subcriptionlist',
  templateUrl: './subcriptionlist.page.html',
  styleUrls: ['./subcriptionlist.page.scss'],
})
export class SubcriptionlistPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams3: Subscription;

  public courseLevel: any;
  public arrSubscriptonlist: any;
  public arrLevelDesiptions: any;
  public leveDesc:any;
  public cfilterdata = {
    course_filter: '',
    course_level: '',
    filter_flag:'',
  };
  public cpagedata = {
    page_slug: 'subscriptionlist',
    page_title: '',
    page_content:'',
    page_fimageurl: '',   
  };

 public partnerDetails = {
    partner_id : "",
    location_id: "",
    currency_symbol: "&pound;"
  }

  public cartCount = "";
  public ncsCount = "";

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,   
    public objCourserv: CourseService,
    private modalController: ModalController,
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

  
gotocart(){
  this.route.navigate(['cart']);
}

gotonotifications(){
  this.route.navigate(['notifications']);
}


  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result; 
            this.fngetpagesdata();           
            this. getCartCount();
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

  getCartCount(){
    this.data$ = this.objCart.getCartCount();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
          this.cartCount = result;                    
      },
      (error) => {
       
      }
    );
  }

  onBack() {
    this.navCtrl.back();
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

  fngetpagesdata(){    

    this.loadctrlPresent();
    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;   
    
    let loguserdata = { 
      page_slug: this.cpagedata.page_slug,
      partner_id: this.partnerDetails.partner_id,
      location_id: this.partnerDetails.location_id,     
    };

    this.objCourserv.getpagecontentbyslug(loguserdata).subscribe(
      (data:any) => {                
            if(data.status=="success"){  
              let pdata = data.pagedata;
              if(pdata){
                  this.cpagedata.page_title = pdata.page_title;
                  this.cpagedata.page_content = pdata.page_content;
                  this.cpagedata.page_fimageurl = pdata.page_fimageurl;
                  this.fngetsubcriptionlist();
              }             
            }
               
      },
      (err) => {
       
      }
    );
}


  fngetsubcriptionlist(){    

       
    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;   

    let postFdata = { 
      partner_id: this.partnerDetails.partner_id,      
      level: this.cfilterdata.course_level,  
      location_id: this.partnerDetails.location_id,    
    };

    this.objCourserv.getsubscriptionlist(postFdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){                
             this.arrSubscriptonlist = data.subscription_plans;
            }
               
      },
      (err) => {
       
      }
    );
}

async goToModel(subcriptionDetails) { 
  const modal = await this.modalController.create({
    component: BookmarkModelPage,
    cssClass: 'custom_modal',
    componentProps: { itemData: subcriptionDetails,itemCategory: "subscription" }
  });
  await modal.present();
}

}
