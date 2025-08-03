import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartId: BehaviorSubject<string> = new BehaviorSubject<string>( ( sessionStorage.getItem('TCCARTID') != null ) ? sessionStorage.getItem('TCCARTID') : "0" );
  public cartCount: BehaviorSubject<string> = new BehaviorSubject<string>( ( sessionStorage.getItem('TCCARTCOUNT') != null ) ? sessionStorage.getItem('TCCARTCOUNT') : "" );
  public ncsCount: BehaviorSubject<string> = new BehaviorSubject<string>( ( sessionStorage.getItem('TCNCSCOUNT') != null ) ? sessionStorage.getItem('TCNCSCOUNT') : "" );

  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }

  constructor(
    public http: HttpClient,
    public commonServ: CommonService,
    public objUsr : UserService,
  ) { 


  }

  getCartId(): Observable<string> {     
    return this.cartId.asObservable();
  }


  
  getCartCount(): Observable<string> {     
    return this.cartCount.asObservable();
  } 
    
  getNCSCount(): Observable<string> {     
    return this.ncsCount.asObservable();
  }


  addToCart(tcartData){
    
    let cartid = tcartData.cartId;
    let itemType = tcartData.itemType;
    let cartData = tcartData.cartData;
    let cart_source = tcartData.cart_source;

    let pDetails = this.objUsr.getDPartnerDetails();
    this.partnerDetails.partner_id = pDetails.partner_id;
    this.partnerDetails.location_id = pDetails.location_id;  

    if(itemType == "subscription"){
      
      let itemData = {
        'item_id': cartData.item_id,
        'item_name': cartData.item_name,
        'item_price': cartData.item_price,
        'item_qty': cartData.item_qty,
        'item_category':'subscription',
        'substdate': cartData.substdate, 	
      };
  
    let payLoad = {
        'cart_id': cartid,
        'cart_item': itemData,
        'user_id': 0,
        'partner_id': this.partnerDetails.partner_id ,
        'cart_source': cart_source,
        'bookingsource_flag': "tcapp"
      };
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "addtoCart", payLoad,{headers: headers});    
      return repos;
    } 

    if(itemType == "upgradersubscription"){
      
      let itemData = {
        'item_id': cartData.item_id,
        'item_name': cartData.item_name,
        'item_price': cartData.item_price,
        'item_qty': cartData.item_qty,
        'item_category':'upgradersubscription',
        'item_stdate': cartData.substdate, 	
        'old_plan_id': cartData.old_plan_id,
      };
  
    let payLoad = {
        'cart_id': cartid,
        'cart_item': itemData,
        'user_id': 0,
        'partner_id': this.partnerDetails.partner_id ,
        'cart_source': cart_source,
        'bookingsource_flag': "tcapp"
      };
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "addtoCart", payLoad,{headers: headers});    
      return repos;
    } 
    
    if(itemType == "eventbooking"){
      
      let itemData = {
        'item_id': cartData.item_id,
        'item_name': cartData.item_name,
        'item_price': cartData.item_price,
        'item_qty': cartData.item_qty,
        'item_category':'eventbooking',       
      };
  
      
    let payLoad = {
        'cart_id': cartid,
        'cart_item': itemData,
        'user_id': 0,
        'partner_id': this.partnerDetails.partner_id ,
        'cart_source': cart_source,
        'bookingsource_flag': "tcapp"
      };
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "addtoCart", payLoad,{headers: headers});    
      return repos;
    }   

    if(itemType == "classbooking"){
      
      let itemData = {
        'item_id': cartData.item_id,
        'item_name': cartData.item_name,
        'item_price': cartData.item_price,
        'item_qty': cartData.item_qty,
        'item_category':'classbooking',  
        'place_split_flag': 0,  
        'item_qty_followers': 0,
        'item_qty_leaders': 0,   
      };
  
    let payLoad = {
        'cart_id': cartid,
        'cart_item': itemData,
        'user_id': 0,
        'partner_id': this.partnerDetails.partner_id ,
        'cart_source': cart_source,
        'bookingsource_flag': "tcapp"
      };
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "addtoCart", payLoad,{headers: headers});    
      return repos;
    }

    if(itemType == "coursebooking"){
      
      let itemData = {
        'item_id': cartData.item_id,
        'item_name': cartData.item_name,
        'item_price': cartData.item_price,
        'item_qty': cartData.item_qty,
        'item_category':'coursebooking',  
        'place_split_flag': 0,  
        'item_qty_followers': 0,
        'item_qty_leaders': 0,   
      };
  
    let payLoad = {
        'cart_id': cartid,
        'cart_item': itemData,
        'user_id': 0,
        'partner_id': this.partnerDetails.partner_id ,
        'cart_source': cart_source,
        'bookingsource_flag': "tcapp"
      };
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "addtoCart", payLoad,{headers: headers});    
      return repos;
    }


    if(itemType == "workshopbooking"){
      
      let itemData = {
        'item_id': cartData.item_id,
        'item_name': cartData.item_name,
        'item_price': cartData.item_price,
        'item_qty': cartData.item_qty,
        'item_category':'workshopbooking',  
        'place_split_flag':cartData.place_split_flag,
        'item_qty_followers': cartData.item_qty_followers,
        'item_qty_leaders':cartData.item_qty_leaders,
      };
  
    let payLoad = {
        'cart_id': cartid,
        'cart_item': itemData,
        'user_id': 0,
        'partner_id': this.partnerDetails.partner_id ,
        'cart_source': cart_source,
        'bookingsource_flag': "tcapp"
      };
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "addtoCart", payLoad,{headers: headers});    
      return repos;
    }

  }

  getCartItems(cartFData){
    let payLoad = {
      cart_id: cartFData.cartId,
      user_id: cartFData.user_id,        
    };
    var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "getCart", payLoad,{headers: headers});    
      return repos;
  }

  removeCartItemsByItemId(itemData){
    let payLoad = {
      cart_id: itemData.cartId,
      item_id: itemData.item_id,        
    };
    var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "removecard", payLoad,{headers: headers});    
      return repos;
  }         

  createPaymentIndent(cartId,userData){
    let payLoad = {
      cart_id: cartId,
      user_id: userData.uuid,  
      user_data : {
          salutation: userData.usalutation,
          firstname:userData.ufirstname,
          lastname: userData.ulastname,
          email: userData.uemail,
          phone_number: userData.uphone, 
          address_line1: userData.uaddress1,
          address_line2: userData.uaddress2,
          city: userData.ucity,
          state: null,
          post_code: userData.upostcode,
          country: userData.ucountry,
          user_category: "Leader",
          newsletter_subscription: userData.unewsletter,
          about_us: "5",
          about_us_others: ""
      },
     payment_method: "stripe",
     attendeedata: [],
     credits_pay: 0     
    };

    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');      
    const repos = this.http.post(this.commonServ.apiURL + "createPaymentIntent", payLoad,{headers: headers});    
    return repos;
  }

  getPaymentConfirmation(paymentData){
    let payLoad = {
      cart_id: paymentData.cartId,
      paymentintentid: paymentData.paymentintentid, 
      paymentcredit: paymentData.paymentcredit,    
    };
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');      
    const repos = this.http.post(this.commonServ.apiURL + "bookingconfirmation", payLoad,{headers: headers});    
    return repos;
  }

  updateCartQtyByItemId(itemData){
    let payLoad = {
      cart_id: itemData.cartId,
      item_id: itemData.item_id,
      item_qty: itemData.item_qty,     
    };
    var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "upitemquantity", payLoad,{headers: headers});    
      return repos;
  } 


  updateAttendeeForm(itemData){
      let payLoad = {
        cart_id: itemData.cartId,
        item_id: itemData.item_id,
        attendee_data: itemData.attendee_data,     
      };
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');      
      const repos = this.http.post(this.commonServ.apiURL + "updateattendeedata", payLoad,{headers: headers});    
      return repos;
  }
     

  
}
