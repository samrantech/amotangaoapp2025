import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams,
  LoadingController,
  AlertController, ToastController
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bookmark-model',
  templateUrl: './bookmark-model.page.html',
  styleUrls: ['./bookmark-model.page.scss'],
})
export class BookmarkModelPage implements OnInit {
  subParams: Subscription;
  public subscriptionData = {
    item_name: '',
    item_category: 'subscription',
    item_desc: '',
    item_plan_disp_text: '',
    item_price: '',
    item_id: '',
    substdate: '',
    item_qty: 1,
  };
  public substdate = '';
  public isLoading: any;
  public islogged: any;
  data$: Observable<any>;
  data: any;
  subParams1: Subscription;
  public cartId = '';
  public isAlertOpen = false;
  public alertButtons = [];
  public itemCategory = '';

  public eventBookingData = {
    item_name: '',
    item_category: 'eventbooking',
    item_price: '',
    item_id: '',
    item_qty: 1,
    item_qty_followers: 0,
    item_qty_leaders: 0,
  };

  public classBookingData = {
    item_name: '',
    item_category: 'classbooking',
    item_price: '',
    item_id: '',
    item_qty: 1,
    item_qty_followers: 0,
    item_qty_leaders: 0,
    place_split_flag: 0,
  };

  public partnerDetails = {
    partner_id : "",
    location_id: "",
    currency_symbol: "&pound;"
  }

  public courseBookingData = {
    item_name: '',
    item_category: 'coursebooking',
    item_price: '',
    item_id: '',
    item_qty: 1,
    item_qty_followers: 0,
    item_qty_leaders: 0,
    place_split_flag: 0,
  };

  public workshopBookingData = {
    item_name: '',
    item_category: 'eventbooking',
    item_price: '',
    item_id: '',
    item_qty: 1,
    item_qty_followers: 0,
    item_qty_leaders: 0,
    place_split_flag: 0,
    favailable_qty:0,
    ledavailable_qty:0,
    totavailableqty : 0,
  };

  constructor(
    public modalController: ModalController,
    public router: ActivatedRoute,
    public navParams: NavParams,
    public objCart: CartService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    public route: Router,
    public objUsr: UserService,
    private toastController: ToastController,
  ) {
    this.itemCategory = this.navParams.get('itemCategory');

    if (this.itemCategory == 'subscription') {
      let subData = this.navParams.get('itemData');
      this.subscriptionData.item_name = subData.item_name;
      this.subscriptionData.item_desc = subData.item_desc;
      this.subscriptionData.item_plan_disp_text = subData.item_plan_disp_text;
      this.subscriptionData.item_price = subData.item_price;
      this.subscriptionData.item_id = subData.item_id;
      this.substdate = this.getCurrentDate();
    }

    if (this.itemCategory == 'eventbooking') {
      let bookingData = this.navParams.get('itemData');
      this.eventBookingData.item_name = bookingData.cart_disp_name;
      this.eventBookingData.item_id = bookingData.itemid;
      this.eventBookingData.item_price = bookingData.price;
      this.eventBookingData.item_qty = 1;
    }

    if (this.itemCategory == 'classbooking') {
      let classData = this.navParams.get('itemData');
      this.classBookingData.item_name = classData.class_displayname;
      this.classBookingData.item_id = classData.class_id;
      this.classBookingData.item_price = classData.class_price;
      this.classBookingData.item_qty = 1;
    }

    if (this.itemCategory == 'coursebooking') {
      let classData = this.navParams.get('itemData');
      this.classBookingData.item_name = classData.course_title + " (" + classData.course_date + ")";
      this.classBookingData.item_id = classData.course_id;
      this.classBookingData.item_price = classData.course_price;
      this.classBookingData.item_qty = 1;
    }


    if (this.itemCategory == 'workshopbooking') {
      let bookingData = this.navParams.get('itemData');
      this.workshopBookingData.item_name = bookingData.cart_disp_name;
      this.workshopBookingData.item_id = bookingData.itemid;
      this.workshopBookingData.item_price = bookingData.price;

      if(bookingData.split_flag == 1){
        this.workshopBookingData.item_qty = 0;
      }else{
        this.workshopBookingData.item_qty = 1;
      }

      
      this.workshopBookingData.item_qty_followers = 0;
      this.workshopBookingData.item_qty_leaders = 0;
      this.workshopBookingData.place_split_flag = bookingData.split_flag;
      this.workshopBookingData.favailable_qty =  bookingData.followers_capacity;
      this.workshopBookingData.ledavailable_qty =  bookingData.leader_capacity;
      
    }

    this.isAlertOpen = true;
    this.alertButtons = ['OK'];
  }

  async showAlertMessage() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'This is an issue in adding to cart.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let rtDate = yyyy + '-' + mm + '-' + dd;
    return rtDate;
  }

  ngOnInit() {
    this.getCartId();
    let pDetails = this.objUsr.getDPartnerDetails();
    if(pDetails.currency_symbol){
    this.partnerDetails.currency_symbol = pDetails.currency_symbol;
    }
  }

  ngOnDestroy() {
    this.subParams1.unsubscribe();
  }

  onClose() {
    this.modalController.dismiss();
  }

  getCartId() {
    this.data$ = this.objCart.getCartId();
    this.subParams1 = this.data$.subscribe(
      (result) => {
        this.cartId = result;
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

  addToCart() {
    let pDetails = this.objUsr.getDPartnerDetails();
    let cartSource = pDetails.cartsource_flag;
    let cartItemData: any = '';

    if (this.itemCategory == 'subscription') {
      this.subscriptionData.substdate = this.substdate;
      cartItemData = {
        cartId: this.cartId,
        itemType: 'subscription',
        cartData: this.subscriptionData,
        cart_source: cartSource,
      };
    }

    if (this.itemCategory == 'eventbooking') {     
      cartItemData = {
        cartId: this.cartId,
        itemType: 'eventbooking',
        cartData: this.eventBookingData,
        cart_source: cartSource,
      };
      
      if(this.eventBookingData.item_qty == 0){
        this.presentToast('top','Please select at least one place');
        return;
      }
    }

    if (this.itemCategory == 'classbooking') {     
      cartItemData = {
        cartId: this.cartId,
        itemType: 'classbooking',
        cartData: this.classBookingData,
        cart_source: cartSource,
      };
      
      if(this.classBookingData.item_qty == 0){
        this.presentToast('top','Please select at least one place');
        return;
      }
    }

    if (this.itemCategory == 'coursebooking') {     
      cartItemData = {
        cartId: this.cartId,
        itemType: 'coursebooking',
        cartData: this.classBookingData,
        cart_source: cartSource,
      };
    
      if(this.classBookingData.item_qty == 0){
        this.presentToast('top','Please select at least one place');
        return;
      }
    }

    if (this.itemCategory == 'workshopbooking') {     
      cartItemData = {
        cartId: this.cartId,
        itemType: 'workshopbooking',
        cartData: this.workshopBookingData,
        cart_source: cartSource,
      };

      if(this.workshopBookingData.item_qty == 0){
        this.presentToast('top','Please select at least one place');
        return;
      }
    }
   
    this.loadctrlPresent();

    this.objCart.addToCart(cartItemData).subscribe(
      (data: any) => {
        if (data) {
          let cartId = data.cart_id;
          sessionStorage.setItem('TCCARTID', cartId);
          this.objCart.cartId.next(cartId);
          this.dismissLoadctrl();
          this.modalController.dismiss();
          this.route.navigateByUrl('cart');
        }
      },
      (err) => {
        this.showAlertMessage();
        this.modalController.dismiss();
      }
    );
  }



  addUpdateCartQty(leveltype,upFlag){


    if(leveltype == "followers"){
      let itemQty = this.workshopBookingData.item_qty_followers;
      let faQty = this.workshopBookingData.favailable_qty;
      if(upFlag== 1){
        if(itemQty >= 1){
          this.workshopBookingData.item_qty_followers = itemQty - 1;
         }
      }
      if(upFlag == 2){
        if(faQty > itemQty){
        this.workshopBookingData.item_qty_followers = itemQty + 1;
        }   
      }
      this.workshopBookingData.item_qty = (this.workshopBookingData.item_qty_followers + this.workshopBookingData.item_qty_leaders);
    }  

    if(leveltype == "leaders"){
      let itemQty2 = this.workshopBookingData.item_qty_leaders;
      let laQty= this.workshopBookingData.ledavailable_qty;
      if(upFlag== 1){
        if(itemQty2 >= 1){
          this.workshopBookingData.item_qty_leaders = itemQty2 - 1;
         }
      }
      if(upFlag == 2){
        if(laQty > itemQty2){
        this.workshopBookingData.item_qty_leaders = itemQty2 + 1;
        }   
      }
      this.workshopBookingData.item_qty = (this.workshopBookingData.item_qty_followers + this.workshopBookingData.item_qty_leaders);
    }  
  
    
   }

   async presentToast(position,mess) {
    const toast = await this.toastController.create({
      message: mess,
      duration: 3000,
      position: position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }

}
