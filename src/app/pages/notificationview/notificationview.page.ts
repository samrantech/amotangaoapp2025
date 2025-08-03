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
  selector: 'app-notificationview',
  templateUrl: './notificationview.page.html',
  styleUrls: ['./notificationview.page.scss'],
})
export class NotificationviewPage implements OnInit {

  public islogged: any;
  data$: Observable<any>;
  data: any;
  public isLoading: any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams3: Subscription;


  public eventId: any;
  public arrEventsList: any;
  public arrLevelDesiptions: any;
  public leveDesc: any;
  public cfilterdata = {
    active_status: '',
    spwsgroupid: '',
  };

  public cpagedata = {
    page_slug: '',
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

  public ncsData = {
    notification_id: '',
    notification_title: '',
    promo_description: '',
    promo_type: '',
    promo_img: '',
  };

  public cartCount = '';
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
  ) { }

  onBack() {
    this.navCtrl.back();
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

  checkloginstatus() {
    this.data$ = this.objAuthSer.isLoggedIn();
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if (result == true) {
          this.islogged = result;
          this.subParams = this.router.params.subscribe((params) => {
            if (this.route.getCurrentNavigation().extras.state != undefined) {
              let ncsDetails =
                this.route.getCurrentNavigation().extras.state.itemData;
                this.ncsData.notification_id = ncsDetails.notification_id;
                this.ncsData.notification_title = ncsDetails.notification_title;
                this.ncsData.promo_description = ncsDetails.promo_description;
                this.ncsData.promo_img = ncsDetails.media_url;
                this.ncsData.promo_type = ncsDetails.promo_type;
             
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

  async loadctrlPresent() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        // duration: 5000,
      })
      .then((a) => {
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

  fnGetEventLists() {
    if (this.eventId) {
      let postFdata = {
        active_status: 'Active',
        spwsgroupid: this.eventId,
      };
      this.loadctrlPresent();
      this.objCourserv.getEventItemsById(postFdata).subscribe(
        (data: any) => {
          this.dismissLoadctrl();
          if (data.status == 'success') {
            this.arrEventsList = data.splwkslists;
            let pageData = data.wpgroupdetails;
            if(pageData){
              this.cpagedata.page_title = pageData?.etitle + ", " +  pageData?.stdatetext;             
            }
            
          }
        },
        (err) => {}
      );
    }
  }



}
