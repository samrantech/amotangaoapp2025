import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { BookmarkModelPage } from '../bookmark-model/bookmark-model.page';
@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.page.html',
  styleUrls: ['./courselist.page.scss'],
})
export class CourselistPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams3: Subscription;


  public courseLevel: any;
  public arrCourseslist: any;
  public arrClasslist: any;
  public arrLevelDesiptions : any;
  public leveDesc:any;
  public courseconfigdata = {
    subscription_flag : '',
    subscription_ntext : '',
    booking_classflag : '',
    bookkingclass_dtexd : '',
    booking_courseflag : '',
    bookingcourse_dtext : '',
    subscription_dtext:'',
    short_descriptions:'',
    course_filter:'',
    filter_flag:'',
    course_level:'',
    courselevelid:'',
    course_img:'',
    subscription_retext: "",
    course_title: "",
  };

  slideOptsOne = {
    initialSlide: 0,
    autoplay:true
   };
   public partnerDetails = {
    partner_id : "",
    location_id: ""
  }
  public appLogoPath = "";

  
  public cartCount = '';
  public ncsCount = "";

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,   
    public objCourserv: CourseService,
    public objUsr : UserService,
    public objCart: CartService,
    private modalController: ModalController,
  ) {  
   
    
   }

  ngOnInit() {
    this.checkloginstatus();
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subParams1.unsubscribe();
    this.subParams3.unsubscribe();
  }


  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        this.islogged = result;   
        if(result == true){    
          this.appLogoPath = this.objUsr.getParterLogo();      
          this.subParams = this.router.params.subscribe(params => {      
            if (this.route.getCurrentNavigation().extras.state != undefined) {
              this.courseLevel = this.route.getCurrentNavigation().extras.state.clevel;       
              this.fngetcourselist(this.courseLevel);  
              this.fngetcouselist(this.courseLevel); 
            }           
          });
          this.getCartCount();
          this.getNCSCount();
        }else{
          this.route.navigate(['/']);
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

  getCartCount() {
    this.data$ = this.objCart.getCartCount();
    this.subParams1 = this.data$.subscribe(
      (result) => {
        this.cartCount = result;
      },
      (error) => {}
    );
  }

  gotonotifications(){
    this.route.navigate(['notifications']);
  }

  gotocart() {
    this.route.navigate(['cart']);
  }


  gotoSubsriptionpage(){

    let filtedata = { 
      course_filter: this.courseconfigdata.course_filter,
      filter_flag: this.courseconfigdata.filter_flag,
      course_level: this.courseconfigdata.course_level, 
    };

    let navextra: NavigationExtras = { state: { 'cdata': filtedata} };
    //this.route.navigate[("tasubcriptions"),navextra);
    console.log(this.partnerDetails.partner_id) 
    if(this.partnerDetails.partner_id == '1' && this.courseconfigdata.course_level == 'Beginners'){   
      this.route.navigate(['tasubcriptions'],navextra);
    }
    else{
      this.route.navigate(['tangosubscriptions']);
    }
  }

  

  gotoclasslistpage(){

    let filtedata = { 
      course_filter: this.courseconfigdata.course_filter,
      filter_flag: this.courseconfigdata.filter_flag,
      course_level: this.courseconfigdata.course_level,
      courselevelid: this.courseconfigdata.courselevelid,  
    };

    let navextra: NavigationExtras = { state: { 'cdata': filtedata} };
    this.route.navigateByUrl("/classlist",navextra);    
  }

  gotocourselistpage(){

    let filtedata = { 
      course_filter: this.courseconfigdata.course_filter,
      filter_flag: this.courseconfigdata.filter_flag,
      course_level: this.courseconfigdata.course_level, 
    };

    let navextra: NavigationExtras = { state: { 'cdata': filtedata} };
    this.route.navigateByUrl("/tcourses",navextra);    
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

  fngetcourselist(courseLevel){
    

    this.loadctrlPresent();

    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;   

    let loguserdata = { 
      course_dept: "Dance",
      course_subject: "Tango",
      course_level: courseLevel,
      course_partner: this.partnerDetails.partner_id, 
      partner_id: this.partnerDetails.partner_id,  
      location_id: this.partnerDetails.location_id,   
    };

    this.objCourserv.getcourseconfigdata(loguserdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){  
              let pdata = data.cconfigdata;
              if(pdata){
                  this.courseconfigdata.subscription_flag = pdata.subscription_flag;
                  this.courseconfigdata.subscription_ntext = pdata.subscription_ntext;
                  this.courseconfigdata.subscription_dtext = pdata.subscription_dtext;
                  this.courseconfigdata.booking_classflag = pdata.booking_classflag;
                  this.courseconfigdata.bookkingclass_dtexd = pdata.bookkingclass_dtexd;
                  this.courseconfigdata.booking_courseflag = pdata.booking_courseflag;
                  this.courseconfigdata.bookingcourse_dtext = pdata.bookingcourse_dtext;
                  this.courseconfigdata.short_descriptions = pdata.short_descriptions;
                  this.courseconfigdata.course_filter = pdata.course_filter;
                  this.courseconfigdata.filter_flag = pdata.filter_flag;
                  this.courseconfigdata.course_level = pdata.course_level;
                  this.courseconfigdata.courselevelid = pdata.courselevelid;
                  this.courseconfigdata.course_img = pdata.course_img;
                  this.courseconfigdata.subscription_retext = pdata.subscription_retext;
                  this.courseconfigdata.course_title = pdata.course_title;
                 
              }else{
                  this.courseconfigdata.subscription_flag = '';
                  this.courseconfigdata.subscription_ntext = '';
                  this.courseconfigdata.subscription_dtext = '';
                  this.courseconfigdata.booking_classflag = '';
                  this.courseconfigdata.bookkingclass_dtexd = '';
                  this.courseconfigdata.booking_courseflag = '';
                  this.courseconfigdata.bookingcourse_dtext = '';
                  this.courseconfigdata.short_descriptions = '';
                  this.courseconfigdata.course_filter = '';
                  this.courseconfigdata.filter_flag = '';
                  this.courseconfigdata.course_level = '';
                  this.courseconfigdata.courselevelid = ''
                  this.courseconfigdata.course_img = '';
                  this.courseconfigdata.subscription_retext = '';
                  this.courseconfigdata.course_title = '';
              }
             
            }else{
                  this.courseconfigdata.subscription_flag = '';
                  this.courseconfigdata.subscription_ntext = '';
                  this.courseconfigdata.subscription_dtext = '';
                  this.courseconfigdata.booking_classflag = '';
                  this.courseconfigdata.bookkingclass_dtexd = '';
                  this.courseconfigdata.booking_courseflag = '';
                  this.courseconfigdata.bookingcourse_dtext = '';
                  this.courseconfigdata.short_descriptions = '';
                  this.courseconfigdata.course_filter = '';
                  this.courseconfigdata.filter_flag = '';
                  this.courseconfigdata.course_level = '';
                  this.courseconfigdata.courselevelid = '';
                  this.courseconfigdata.course_img = '';
                  this.courseconfigdata.subscription_retext = '';
                  this.courseconfigdata.course_title = '';
            }
               
      },
      (err) => {
       
      }
    );
}
fngetcouselist(courseLevel){    
  let pDetails = this.objUsr.getDPartnerDetails();
  this.partnerDetails.partner_id = pDetails.partner_id;
  //this.loadctrlPresent();    
  let postFdata = { 
    course_dept: "Dance",
    course_subject: "Tango",
    course_level: courseLevel,
    course_partner: this.partnerDetails.partner_id, 
    course_title: "Beginners Crash Course"
  };

  this.objCourserv.getcourselist(postFdata).subscribe(
    (data:any) => {
          //this.dismissLoadctrl();            
          if(data.status=="success"){                
           this.arrCourseslist = data.coursedata;
           console.log(data.coursedata)
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

gotosubscrition(){
  this.route.navigate(['tangosubscriptions']);
}

goToTangoEvents(){
  this.route.navigate(['tangoevents']);
}

gotoweeklyschedule(){
  this.route.navigate(['weeklyschedule']);
}
async classBooking(clsData){
  console.log(clsData);
  const modal = await this.modalController.create({
    component: BookmarkModelPage,
    cssClass: 'custom_modal',
    componentProps: { itemData: clsData,itemCategory: "coursebooking" }
  });
  await modal.present();
}
}
