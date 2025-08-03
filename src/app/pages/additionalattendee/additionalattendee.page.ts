import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CourseService } from '../../services/course.service';
import { BookmarkModelPage } from '../bookmark-model/bookmark-model.page';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-additionalattendee',
  templateUrl: './additionalattendee.page.html',
  styleUrls: ['./additionalattendee.page.scss'],
})
export class AdditionalattendeePage implements OnInit {

  public islogged: any;
  data$: Observable<any>;
  data: any;
  public isLoading: any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams3: Subscription;

  public itemData: any;
  public arrAttendeeList: any;
  public arrLevelDesiptions: any;
  public leveDesc: any;
  public cfilterdata = {
    active_status: '',
    date_flag: '',
    event_template: '',
  };

  public cpagedata = {
    page_slug: 'subscriptionlist',
    page_title: '',
    page_content: '',
    page_fimageurl: '',
  };

  public partnerDetails = {
    partner_id: '',
    location_id: '',
  };

  slideOptsOne = {
    initialSlide: 0,
    autoplay: true,
  };

  public cartCount = '';
  public cartId = '';
  public ncsCount = "";

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    public route: Router,
    public router: ActivatedRoute,
    public loadingController: LoadingController,
    public objCourserv: CourseService,
    private modalController: ModalController,
    public objUsr: UserService,
    public objCart: CartService
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

  gotocart() {
    this.route.navigate(['cart']);
  }
  



  checkloginstatus() {
    this.data$ = this.objAuthSer.isLoggedIn();
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if (result == true) {
          this.islogged = result;

          this.subParams = this.router.params.subscribe((params) => {
            if (this.route.getCurrentNavigation().extras.state != undefined) {
              this.itemData =
                this.route.getCurrentNavigation().extras.state.itemData;
                this.cartId = this.route.getCurrentNavigation().extras.state.cartId;                
              
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


  fnOnchangeinput($event,arrIndex){   
    this.fnclearmessage();    
    if($event.target.id == "firstname"){       
      this.itemData.attendeelist[arrIndex].firstname =  $event.target.value;    
    }else if($event.target.id == "lastname"){
      this.itemData.attendeelist[arrIndex].lastname =  $event.target.value;    
    }else if($event.target.id == "useremail"){
      this.itemData.attendeelist[arrIndex].email =  $event.target.value;    
    }
    this.itemData.attendeelist[arrIndex].usercategory = "Leader";
  }

  fnclearmessage(){
    document.getElementById('efirstname').innerHTML = '';
    document.getElementById('elastname').innerHTML = '';   
    document.getElementById('euseremail').innerHTML = '';    
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

  onSubmitAtteendee(){
    let itemUpdateData = {
      cartId : this.cartId,
      item_id : this.itemData.item_id, 
      attendee_data : this.itemData.attendeelist,   
     }  

     this.loadctrlPresent();

    this.objCart.updateAttendeeForm(itemUpdateData).subscribe(
      (data:any) => {       
        if(data){ 
          if(data.status == "success"){
          this.dismissLoadctrl();
          this.route.navigate(['cart']);
          }else{
            this.dismissLoadctrl();
          } 
        }               
      },
      (err) => {
        this.dismissLoadctrl();
      }
    );    
  }

}
