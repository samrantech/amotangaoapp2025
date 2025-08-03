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
  selector: 'app-tasubcriptions',
  templateUrl: './tasubcriptions.page.html',
  styleUrls: ['./tasubcriptions.page.scss'],
})
export class TasubcriptionsPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  public courseLevel: any;
  public arrSubscriptonlist: any;
  public arrLevelDesiptions: any;
  public leveDesc:any;
  public cfilterdata = {
    course_filter: '',
    course_level: '',
    filter_flag:'',
  };

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,   
    public objCourserv: CourseService,
    private modalController: ModalController,
    public objUsr : UserService,
  ) { }

  ngOnInit() {
    
    this.subParams = this.router.params.subscribe(params => {   
      if (this.route.getCurrentNavigation().extras.state != undefined) {
          let scData = this.courseLevel = this.route.getCurrentNavigation().extras.state.cdata;  
          this.cfilterdata.course_filter = scData.course_filter;
          this.cfilterdata.course_level = scData.course_level;
          this.cfilterdata.filter_flag = scData.filter_flag;  
          this.fngetsubcriptionlist();        
      }     
    });
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


  fngetsubcriptionlist(){    
    let pDetails = this.objUsr.getDPartnerDetails();
    this.loadctrlPresent();    
    let postFdata = { 
      partner_id: pDetails.partner_id,      
      level: this.cfilterdata.course_level,      
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
