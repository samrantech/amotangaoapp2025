import { Component, OnInit } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LoadingController } from '@ionic/angular';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  subParams2: Subscription;
  subParams3: Subscription;

  public appLogoPath = "";

  public ncsCount = "";

   public partnerDetails = {
    partner_id : "",
    location_id: "",
    currency_symbol: "&pound;"
  }
  public cartItems: any[] = [];
  public cartId = "";
  public cartCount : any = "";
  public cartTotalAmount = "";

  constructor( 
    public objAuthSer: AuthService, 
    public objUsr : UserService,
    public route: Router,
    public router: ActivatedRoute,
    public objCart : CartService,
    public loadingController: LoadingController, 
    private stSer: StripeService,
  ) {

   }

  ngOnInit() {
    this.checkloginstatus();
    let pDetails = this.objUsr.getDPartnerDetails();
    if(pDetails.currency_symbol){
      this.partnerDetails.currency_symbol = pDetails.currency_symbol;
    }
  }

  ngOnDestroy() {
    this.subParams1.unsubscribe();
    this.subParams2.unsubscribe();
    this.subParams3.unsubscribe();
  }


  getCartId(){
    this.data$ = this.objCart.getCartId();  
    this.subParams2 = this.data$.subscribe(
      (result) => {
          this.cartId = result;  
          if(this.cartId != "0"){
            this.getCartItems();
          }else{
            this.cartItems = [];
            this.cartCount = "";
            this.cartId = "";
          }           
      },
      (error) => {
       
      }
    );
  }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;  
            this.appLogoPath = this.objUsr.getParterLogo(); 
            this.getCartId(); 
            this.getNCSCount();         
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

  getCartItems(){  

    this.loadctrlPresent();
     let cartData = {
      cartId : this.cartId,
      user_id : "0",     
     }
    this.objCart.getCartItems(cartData).subscribe(
      (data:any) => { 
        this.dismissLoadctrl(); 
        if(data){ 
          if(data.status == "success"){
            this.cartItems = (data?.cart_items) ? data.cart_items : [];
            this.cartCount = (data?.cart_count) ? data.cart_count : "";
            this.cartTotalAmount = (data?.grand_total) ? data.grand_total : "0";
            if(data.api_key && data.api_key !== ''){
              this.stSer.changeKey(data.api_key);
            }
          }else{
            this.cartItems = [];
            this.cartCount = "";
          }          
           sessionStorage.setItem('TCCARTCOUNT',this.cartCount);           
           this.objCart.cartCount.next(this.cartCount);
        }               
      },
      (err) => {
        this.dismissLoadctrl();       
      }
    );    
  }

  togomyaccount(){

    if(this.islogged == true){
      this.route.navigate(['/myaccount']);
    }else{
      this.route.navigate(['login']);
    }
  }
  
  oncheckout(){    
    let cartData = { 
      cartItems: this.cartItems,
      cartCount: this.cartCount,
      cartTotalAmount: this.cartTotalAmount, 
      cartId: this.cartId,
    };
    let navextra: NavigationExtras = { state: { 'cartData': cartData} };
    this.route.navigateByUrl("/checkoutuser",navextra);    
}


 addUpdateCartQty(itemData,upFlag){

  let itemQty = parseInt(itemData.item_qty);
  if(upFlag == 1){
   if(itemQty > 1){
    itemData.item_qty = itemQty - 1;
   }
  }

  if(upFlag == 2){
    itemData.item_qty = itemQty + 1;   
  }

  this.updatCartQty(itemData);

 }

 updateAddtionalAtteendee(itemData){
  let navextra: NavigationExtras = { state: { 'itemData': itemData,'cartId':  this.cartId} };
  this.route.navigateByUrl("/additionalattendee",navextra);  
 }


 updatCartQty(itemData){

  this.loadctrlPresent();
  let itemUpdateData = {
    cartId : this.cartId,
    item_id : itemData.item_id, 
    item_qty : itemData.item_qty,     
   }
   this.objCart.updateCartQtyByItemId(itemUpdateData).subscribe(
    (data:any) => { 
      this.dismissLoadctrl(); 
      if(data){ 
        if(data.status == "success"){
          this.getCartItems();
        }else{
          
        } 
      }               
    },
    (err) => {
      this.dismissLoadctrl();       
    }
  );    

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

  gotonotifications(){
    this.route.navigate(['notifications']);
  }

  removeCartItems(itemData){

    this.loadctrlPresent();
    let itemDelData = {
      cartId : this.cartId,
      item_id : itemData.item_id,     
     }
     this.objCart.removeCartItemsByItemId(itemDelData).subscribe(
      (data:any) => { 
        this.dismissLoadctrl(); 
        if(data){ 
          if(data.status == "success"){
            this.getCartItems();
          }else{
            
          } 
        }               
      },
      (err) => {
        this.dismissLoadctrl();       
      }
    );    

  }
  

}
