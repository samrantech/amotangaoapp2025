import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { FiltermodelPage } from '../filtermodel/filtermodel.page';
import { BookmarkModelPage } from '../bookmark-model/bookmark-model.page';


@Component({
  selector: 'app-weeklyschedule',
  templateUrl: './weeklyschedule.page.html',
  styleUrls: ['./weeklyschedule.page.scss'],
})
export class WeeklyschedulePage implements OnInit {

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
    location_id: "",
    currency_symbol: "&pound;"
  }


  public arrOurclasses = [];
  public appLogoPath = "";
  public cartCount = "";
  public ncsCount = "";

  public cfilterdata = {
    filterdate: 'all',
    rflag: 'all',
    course_level:'all',
    course_location: 'all',
    course_partner: '1',     
  };

  public courseData = {
    coursclases: [],
    classcount: 0,
    classmsgflag: 0,
    weekdays: [],
    courselevels: [],
    courselocations: [], 
    nextweekclasses: [],
    thisweekcoures: [],
    thisweekevents: [],
  };

 public selectedSegment = "classes";
 
  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,   
    public objCourserv: CourseService,
    public objUsr : UserService,
    public objCart : CartService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.checkloginstatus();
    let pDetails = this.objUsr.getDPartnerDetails();
    if(pDetails.currency_symbol){
      this.partnerDetails.currency_symbol = pDetails.currency_symbol;
    }
  }

  gotoSubsriptionpage(){
    this.route.navigate(['subcriptionlist']);
  }

  ngOnDestroy() {
    this.subParams1.unsubscribe();
    this.subParams2.unsubscribe();  
    this.subParams3.unsubscribe();  
  }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        this.islogged = result; 
        if(result == true){            
          this.appLogoPath = this.objUsr.getParterLogo(); 
          let pDetails = this.objUsr.getDPartnerDetails();
          this.partnerDetails.partner_id = pDetails.partner_id;
          this.partnerDetails.location_id = pDetails.location_id;             
          this.getCartCount();  
          this.getNCSCount();   
          this.fngetClasslist();   
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

async goToModel() { 

  console.log(this.courseData);
  const modal = await this.modalController.create({
    component: FiltermodelPage,
    cssClass: 'custom_modal',
    componentProps: { courseData: this.courseData }
  });  

  modal.onDidDismiss().then((modelData) => {
    if (modelData !== null) {      
      this.cfilterdata.course_level = modelData.data.filerLevel;
      this.cfilterdata.filterdate = modelData.data.filterDay;
      this.cfilterdata.course_location = modelData.data.filterLocation; 

      if(this.cfilterdata.filterdate == "all"){
        this.cfilterdata.rflag = "all";
      }else{
        this.cfilterdata.rflag = "datewise";
      }
    
      this.fngetClasslist();     
    }
  });

  await modal.present();
}


fngetClasslist(){    

  this.loadctrlPresent();  
  let partner_id = this.partnerDetails.partner_id;
  let postFdata = { 
    filterdate: this.cfilterdata.filterdate,      
    rflag: this.cfilterdata.rflag,  
    course_level: this.cfilterdata.course_level, 
    course_location: this.cfilterdata.course_location, 
    course_partner: partner_id,   
  };

  this.objCourserv.getWeeklyScheduleList(postFdata).subscribe(
    (data:any) => {
          this.dismissLoadctrl();            
          if(data.status=="success"){  
           
            if(data.classcount > 0){
              this.courseData.coursclases = data.coursclases;
            }else{
              this.courseData.classmsgflag = 1;
              this.courseData.coursclases = [];
            }
          
           this.courseData.thisweekcoures = data.thisweekcoures;
           this.courseData.thisweekevents = data.thisweekevents;
           this.courseData.nextweekclasses = data.nextweekclasses
           
           this.courseData.weekdays = data.weekdays;
           this.courseData.courselevels = data.courselevels;
           this.courseData.courselocations = data.courselocations;


          }
          else{
            this.courseData.classmsgflag = 1;
          }               
    },
    (err) => {
      this.courseData.classmsgflag = 1;
    }
  );
}

fnreturnbookingcategory(iCategory){

  let rtText = "Class";
  if(iCategory == "workshopbooking"){
    rtText = "Workshop";
  }
  return rtText;

}

fneventbooking(eventData){
  let navextra: NavigationExtras = { state: { eventid: eventData.id } };
  this.route.navigateByUrl('/mevents', navextra);
}

gotonotifications(){
  this.route.navigate(['notifications']);
}

async classBooking(clsData){ 
  const bCategory = clsData.bookingcategory; 
  if(bCategory == "workshopbooking"){   
    let navextra: NavigationExtras = { state: { wkgroupid: clsData.item_id } };
    this.route.navigateByUrl('/workshopitems', navextra);
  }else{
    const modal = await this.modalController.create({
      component: BookmarkModelPage,
      cssClass: 'custom_modal',
      componentProps: { itemData: clsData,itemCategory: bCategory }
    });
    await modal.present();
  }
  
}


}
