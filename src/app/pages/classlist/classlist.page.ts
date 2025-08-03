import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { BookmarkModelPage } from '../bookmark-model/bookmark-model.page';


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.page.html',
  styleUrls: ['./classlist.page.scss'],
})
export class ClasslistPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  public courseLevel: any;
  public arrClasslist: any;
  public arrLevelDesiptions : any;
  public leveDesc:any;
  public cfilterdata = {
    course_dept: 'Dance',
    course_subject: 'Tango',
    course_level:'',
    course_partner: '1',
    course_filter: '',  
    filter_flag:'',  
    courselevelid:'',
  };
    public partnerDetails = {
    partner_id : "",
    location_id: "",
    currency_symbol: "&pound;"
  }

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,   
    public objCourserv: CourseService,
    public objUsr : UserService,
    private modalController: ModalController,
  ) { 

  }

  ngOnInit() {
    
    this.subParams = this.router.params.subscribe(params => {   
      if (this.route.getCurrentNavigation().extras.state != undefined) {
          let scData = this.courseLevel = this.route.getCurrentNavigation().extras.state.cdata;  
          this.cfilterdata.course_filter = scData.course_filter;
          this.cfilterdata.course_level = scData.course_level;
          this.cfilterdata.filter_flag = scData.filter_flag;  
          this.cfilterdata.courselevelid = scData.courselevelid; 
          this.fngetclassbycustom();
      }     
    });

    let pDetails = this.objUsr.getDPartnerDetails();
    if(pDetails.currency_symbol){
      this.partnerDetails.currency_symbol = pDetails.currency_symbol;
    }
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
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


  fngetClasslist(){    
    let pDetails = this.objUsr.getDPartnerDetails();
    this.loadctrlPresent();    
    let postFdata = { 
      course_dept: this.cfilterdata.course_dept,      
      course_subject: this.cfilterdata.course_subject,  
      course_level: this.cfilterdata.course_level, 
      course_partner: pDetails.partner_id,  
    };

    this.objCourserv.getClassdetails(postFdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){                
             this.arrClasslist = data.coursclases;
            }               
      },
      (err) => {
       
      }
    );
}


fngetclassbycustom(){    
  let pDetails = this.objUsr.getDPartnerDetails();
  this.loadctrlPresent();    

  let fDate = (this.cfilterdata.filter_flag == "level") ? "all" : this.cfilterdata.course_filter;
  let postFdata = { 
    filterdate: fDate,      
    rflag: "all",  
    course_level: this.cfilterdata.courselevelid, 
    course_location: "all", 
    course_partner: pDetails.partner_id,
  };

  this.objCourserv.getclasslistbycustom(postFdata).subscribe(
    (data:any) => {
          this.dismissLoadctrl();            
          if(data.status=="success"){                
           this.arrClasslist = data.coursclases;
          }               
    },
    (err) => {
     
    }
  );
}

async classBooking(clsData){
  console.log(clsData);
  const modal = await this.modalController.create({
    component: BookmarkModelPage,
    cssClass: 'custom_modal',
    componentProps: { itemData: clsData,itemCategory: "classbooking" }
  });
  await modal.present();
}

}
