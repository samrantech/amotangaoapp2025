import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { LoadingController,ToastController } from '@ionic/angular';
import { Observable,Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public arrDobmonth:any;

   userdata ={
    usalutation:'',
    ufirstname:'',
    ulastname:'',
    uemail:'',
    uphone:'',
    ugender:'',
    uaddress1:'',
    uaddress2:'',
    ucity:'',
    upostcode:'',
    ucountry:'GB',
    unewsletter:'',    
    uuid:'',
    dob_day: "",
    dob_month: "",
    member_type: "",
    cont_month: "",
    member_description: ""
   }
   arrCountrylist: any;

  genderlist=[
    {
      gender_name:'Male'
    },
    {
      gender_name:'Female'
    },
    {
      gender_name:'Other'
    },
    {
      gender_name:'prefer no to say'
    }


  ]

  salutationlist=[{
    salutation_name:'Mr.'
  },{
    salutation_name:'Mrs.'
  },{
    salutation_name:'Miss.'
  },{
    salutation_name:'Other'
  }]

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams2: Subscription;
  subParams1: Subscription;
  subParams3: Subscription;

  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }
  public cartCount = "";
  public ncsCount = "";

  constructor(
    private router: Router,
    public objUserService: UserService,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private toastController: ToastController,
    public objCart : CartService,
    public objAuthSer: AuthService,
  ) {
     
   }


  ngOnInit() {
    this.checkloginstatus();
  }
  ngOnDestroy() {
    this.subParams1.unsubscribe();
    this.subParams2.unsubscribe();
    this.subParams3.unsubscribe();
  }

  getCartCount(){
    this.data$ = this.objCart.getCartCount();  
    this.subParams2 = this.data$.subscribe(
      (result) => {
          this.cartCount = result;                    
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
            this.fngetcountrylists();
            this.fnGetUserDetails();
            this.getCartCount();   
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

  onBack() {
    this.navCtrl.back();
  }

  gotocart(){
    this.router.navigate(['cart']);
  }

  gotonotifications(){
    this.router.navigate(['notifications']);
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

  fnGetUserDetails(){

    if(localStorage.getItem("loggeruserdata") === null){  
     
      
    }else{

      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      this.userdata.uemail = stData.uemail;    
    }

    let loguserdata = {
      email : this.userdata.uemail
  };

    this.objUserService.getuserdetails(loguserdata).subscribe(
      (data:any) => {
            
            
            if(data.status=="success"){  
              this.userdata.member_type = data.member_details.member_type;
              this.userdata.cont_month = data.member_details.cont_month;
              this.userdata.member_description = data.member_details.member_description;
              let uddata = data.userdetails;
              this.userdata.usalutation = uddata.salutation;
              this.userdata.ufirstname = uddata.firstname;
              this.userdata.ulastname = uddata.lastname;
              this.userdata.uemail = uddata.email;
              this.userdata.uphone = uddata.phone_number;
              this.userdata.ugender = uddata.gender;
              this.userdata.uaddress1 = uddata.address_line1;
              this.userdata.uaddress2 = uddata.address_line2;
              this.userdata.ucity = uddata.city;
              this.userdata.upostcode = uddata.post_code;
              this.userdata.ucountry = uddata.country;
              this.userdata.unewsletter = uddata.newsletter_subscription;    
              this.userdata.dob_day = uddata.dob_day;
              this.userdata.dob_month = uddata.dob_month;   
              this.arrDobmonth = Object.values(data.dob_month);
              this.userdata.uuid = uddata.user_id;          
              
            }else{
             
            }
               
      },
      (err) => {
       
      }
    );

  }

  fnOnchangeinput($event){

    this.fnclearmessage();

    if($event.target.id == "ufirstname"){     
      this.userdata.ufirstname = $event.target.value
    }else if($event.target.id == "ulastname"){
      this.userdata.ulastname = $event.target.value
    }else if($event.target.id == "uemail"){
      this.userdata.uemail = $event.target.value
    }else if($event.target.id == "ugender"){
      this.userdata.ugender = $event.target.value
    }else if($event.target.id == "uphone"){
      this.userdata.uphone = $event.target.value
    }else if($event.target.id == "dob_day"){
      this.userdata.dob_day = $event.target.value
    }else if($event.target.id == "dob_month"){
      this.userdata.dob_month = $event.target.value
    }

  }

  fnValidateform(){
    let valid;
     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(this.userdata.ufirstname ==''){
      document.getElementById('eufirstname').innerHTML = "Enter the Firstname";
        valid=0;			
    }
    if(this.userdata.ulastname == ''){
      document.getElementById('eulastname').innerHTML = "Enter the Lastname";
      valid=0;
    }
    if(!(this.userdata.uemail.match(mailformat))){
      document.getElementById('euemail').innerHTML = "Enter the valid Email";
      valid=0;
    }
    if(this.userdata.ugender == ''){
      document.getElementById('eugender').innerHTML = "Select the Gender";
      valid=0;
    }
    if(this.userdata.uphone == ''){
      document.getElementById('euphone').innerHTML = "Enter the Phone Number";
      valid=0;
    }

    if(valid==0){
			return false;			
		}else{
			return true;
		}	  

    return valid
  }


  fnclearmessage(){
    document.getElementById('eufirstname').innerHTML = '';
    document.getElementById('eulastname').innerHTML = '';
    document.getElementById('euemail').innerHTML = '';
    document.getElementById('eugender').innerHTML = '';
    document.getElementById('euphone').innerHTML = '';
  }


  onSave() {
   this.fnclearmessage();
   this.loadctrlPresent();
   
    if(this.fnValidateform()==true){ 
      
      this.objUserService.updateuserprofiledata(this.userdata).subscribe(
        (data:any) => {
          this.dismissLoadctrl();
              
              if(data.status=="success"){ 
               
                this.presentToast('top','Updated Successfully!');
                
              }else{
                this.presentToast('top',data.message);
              }
              	 
        },
        (err) => {
         
        }
      );
      
    }else{
      this.dismissLoadctrl();
      this.presentToast('top','Please complete all the required fields');
     }
  }


  fngetcountrylists(){    

    this.loadctrlPresent();    
    let postFdata = { published: 1 };
    this.objUserService.fngetcountrylists(postFdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){                
              this.arrCountrylist = data.countrylists;
            }               
      },
      (err) => { }
    );
}

}
