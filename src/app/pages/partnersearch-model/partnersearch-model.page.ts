import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bookmark-model',
  templateUrl: './partnersearch-model.page.html',
  styleUrls: ['./partnersearch-model.page.scss'],
})
export class BookmarkModelPage implements OnInit {
  subParams: Subscription;
  public subscriptionData = [];
  public reasonData = [];
  public substdate = '';
  public isLoading: any;
  public islogged: any;
  data$: Observable<any>;
  data: any;
  subParams1: Subscription;
  public cartId = '';
  public isAlertOpen = false;
  public alertButtons = [];

  constructor(
    public modalController: ModalController,
    public router: ActivatedRoute,
    public navParams: NavParams,
    public objCart: CartService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    public route: Router,
    public objUsr: UserService
  ) {
  

     this.reasonData = this.navParams.get('reason');
      let subData = this.navParams.get('itemData');
      console.log(subData)
      this.subscriptionData = subData;
     
  
      
   
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

}
