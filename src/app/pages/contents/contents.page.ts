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
  selector: 'app-contents',
  templateUrl: './contents.page.html',
  styleUrls: ['./contents.page.scss'],
})
export class ContentsPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams2 : Subscription;
  subParams3: Subscription;

  public courseLevel: any;
  public arrClasslist: [];
  public arrLevelDesiptions :[];
  public leveDesc:any;
  public cpagedata = {
    page_slug: '',
    page_title: '',
    page_content:'',
    page_fimageurl: '',   
  };

  slideOptsOne = {
    initialSlide: 0,
    autoplay:true
   };
  public appLogoPath = "";

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
    this.subParams.unsubscribe()
    this.subParams1.unsubscribe();
    this.subParams2.unsubscribe();
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
                this.cpagedata.page_slug = this.route.getCurrentNavigation().extras.state.pageflag;       
                this.fngetpagesdata();
              }           
            });



          
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
            this.dismissLoadctrl();            
            if(data.status=="success"){  
              let pdata = data.pagedata;
              if(pdata){
                  this.cpagedata.page_title = pdata.page_title;
                  this.cpagedata.page_content = pdata.page_content;
                  this.cpagedata.page_fimageurl = pdata.page_fimageurl;
                 
              }             
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

gotoweeklyschedule(){
  this.route.navigate(['weeklyschedule']);
}
gotonotifications(){
  this.route.navigate(['notifications']);
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

goToTangoEvents(){
  this.route.navigate(['tangoevents']);
}
}
