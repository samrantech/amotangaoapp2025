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
  selector: 'app-workshopitems',
  templateUrl: './workshopitems.page.html',
  styleUrls: ['./workshopitems.page.scss'],
})
export class WorkshopitemsPage implements OnInit {

  public islogged: any;
  data$: Observable<any>;
  data: any;
  public isLoading: any;
  subParams: Subscription;
  subParams1: Subscription;
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

  public cartCount = '';

  public activesbscount:any = 0;
  public arrSubsEventsList: any;

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

   onBack() {
    this.navCtrl.back();
  }

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
              this.eventId =
              this.route.getCurrentNavigation().extras.state.wkgroupid;
              //this.fnGetEventLists();
              this.fnCheckuseractivesubs();
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
      this.objCourserv.getWorkshopItemsById(postFdata).subscribe(
        (data: any) => {         
          if (data.status == 'success') {
            this.arrEventsList = data.splwkslists;
            let pageData = data.wpgroupdetails;
            this.arrSubsEventsList = data.splwokssublists;
            if(pageData){
              this.cpagedata.page_title = pageData?.wtitle + ", " +  pageData?.short_description;
              this.cpagedata.page_content = pageData.wdescription;
              this.cpagedata.page_fimageurl = pageData.banner_image_url;        
            }
            this.dismissLoadctrl();
          }
        },
        (err) => {
          this.dismissLoadctrl();
        }
      );
    }
  }

  async goToModel(itemDetails) {    
    const modal = await this.modalController.create({
      component: BookmarkModelPage,
      cssClass: 'custom_modal',
      componentProps: { itemData: itemDetails,itemCategory: "workshopbooking" }
    });
    await modal.present();
  }


  fnCheckuseractivesubs(){
   
    let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
    let userEmail  = stData.uemail;
    let loguserdata = {
        email : userEmail, 
        itemid: '',
        itemflag:''     
    };
    this.objUsr.getactivesubscriptions(loguserdata).subscribe(
      (data:any) => {
                       
            if(data.status=="success"){  
              this.activesbscount = data.activesubscount;
            }
            this.fnGetEventLists();
               
      },
      (err) => {
        this.fnGetEventLists();
      }
    );
}

}
