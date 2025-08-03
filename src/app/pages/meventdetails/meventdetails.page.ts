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
  selector: 'app-meventdetails',
  templateUrl: './meventdetails.page.html',
  styleUrls: ['./meventdetails.page.scss'],
})
export class MeventdetailsPage implements OnInit {
  public islogged: any;
  data$: Observable<any>;
  data: any;
  public isLoading: any;
  subParams: Subscription;
  subParams1: Subscription;
  public courseLevel: any;
  public arrEventsList: any;
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
  ) {}

  ngOnInit() {
    this.checkloginstatus();
  }

  ngOnDestroy() {
    this.subParams.unsubscribe();
    this.subParams1.unsubscribe();
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
              this.courseLevel =
                this.route.getCurrentNavigation().extras.state.clevel;
              this.fngetpagesdata();
            }
          });

          this.getCartCount();
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

  onBack() {
    this.navCtrl.back();
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

  fngetpagesdata() {
    this.loadctrlPresent();
    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;

    let loguserdata = {
      page_slug: this.courseLevel,
      partner_id: this.partnerDetails.partner_id,
      location_id: this.partnerDetails.location_id,
    };

    this.objCourserv.getpagecontentbyslug(loguserdata).subscribe(
      (data: any) => {
        if (data.status == 'success') {
          let pdata = data.pagedata;
          if (pdata) {
            this.cpagedata.page_title = pdata.page_title;
            this.cpagedata.page_content = pdata.page_content;
            this.cpagedata.page_fimageurl = pdata.page_fimageurl;
            if (pdata.custom_paramas) {
              let cParams = pdata.custom_paramas;
              this.cfilterdata.event_template = cParams.event_template;
              this.cfilterdata.active_status = 'Active';
              this.cfilterdata.date_flag = 'filter';
              this.fnGetEventLists();
            }
          }
        }
      },
      (err) => {}
    );
  }

  fnGetEventLists() {
    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;

    let postFdata = {
      active_status: this.cfilterdata.active_status,
      date_flag: this.cfilterdata.date_flag,
      event_template: this.cfilterdata.event_template,
    };

    this.objCourserv.getEventsByTemplateId(postFdata).subscribe(
      (data: any) => {
        this.dismissLoadctrl();
        if (data.status == 'success') {
          this.arrEventsList = data.courselist;
        }
      },
      (err) => {}
    );
  }

  onLoadEvents(itemdata) {    
    let navextra: NavigationExtras = { state: { eventid: itemdata.id } };
    this.route.navigateByUrl('/mevents', navextra);
  }
}
