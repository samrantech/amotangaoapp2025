import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Observable,Subscription } from 'rxjs';
//import { FCM } from '@ionic-native/fcm/ngx';
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated-12/ionic/ngx";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams: Subscription;
  subParams1: Subscription;
  public logData = {
    luname:'',
    lpassword:''
  };
  public loggedprofieldata = {
    uname:'',
    uemail:'',
    urole:'',
    allowadminfeatures: '',
    appadminfeatures:[],  
    dpartnerdetails:{
      id: "",
      partner_id: "",
      partner_name: "",
      partner_logo_url: "",
      partner_template_config:{
        primarycolor :"",
        short_desc: "",
      },
      payment_keys:{
        api_key :"",
        secret_key: "",
        cartsource_flag: "",
      },
      dlocationdetails:{
        id:"",
        location_name:""
      },
      currency_symbol: "&pound;"
    }, 
  }
  public isTextFieldType: boolean;
  constructor(
    private router: Router,
    public objUserService: UserService,
    public loadingController: LoadingController,
    public objAuthserv: AuthService,   
  ) { 
      
    }

  ngOnInit() {
    this.checkloginstatus();   
  }

  ngOnDestroy() {
    this.subParams1.unsubscribe();   
  }

  checkloginstatus(){
    this.data$ = this.objAuthserv.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        this.islogged = result;  
        if(result == true){
          this.router.navigate(['home']);
        }                   
      },
      (error) => {
        this.islogged = false;        
      }
    );
  }

  fnClearmessages(){
    document.getElementById('euname').innerHTML = "";
    document.getElementById('eupassword').innerHTML = "";
    document.getElementById('errormsg').innerHTML = "";    
  }

  onChangename($e){
    this. fnClearmessages();
    if($e.target.id == "uname"){     
      this.logData.luname = $e.target.value
    }
    if($e.target.id == "upassword"){
      this.logData.lpassword = $e.target.value
    }    
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


  togglemyPasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  onLogin() {
    this. fnClearmessages();
    if(this.loginerrormessage()==true){
        this.fnLoginprocess();
    }else{

    }

    //this.router.navigate(['choose-interest']);
  }

  fnLoginprocess(){

      this.loadctrlPresent();

      let loguserdata = {
          email : this.logData.luname,
          password: this.logData.lpassword
      };

      this.objUserService.userlogin(loguserdata).subscribe(
        (data:any) => {
              this.dismissLoadctrl();
              
              if(data.status=="success"){  
                let uddata = data.userdetails;
                this.loggedprofieldata.uname = uddata.name;
                this.loggedprofieldata.uemail = uddata.email;
                this.loggedprofieldata.urole = uddata.userrole;  
                this.loggedprofieldata.allowadminfeatures = uddata.allowadminfeatures; 
                this.loggedprofieldata.appadminfeatures = uddata.appadminfeatures; 
                let dpartdetails = uddata.dpartnerdetails;
                if(dpartdetails){
                  this.loggedprofieldata.dpartnerdetails.id = dpartdetails.id;
                  this.loggedprofieldata.dpartnerdetails.partner_id = dpartdetails.partner_id;
                  this.loggedprofieldata.dpartnerdetails.partner_name = dpartdetails.partner_name;
                  this.loggedprofieldata.dpartnerdetails.partner_logo_url = dpartdetails.partner_logo_url;
                  this.loggedprofieldata.dpartnerdetails.partner_template_config.primarycolor = dpartdetails.partner_template_config.primarycolor;
                  this.loggedprofieldata.dpartnerdetails.partner_template_config.short_desc = dpartdetails.partner_template_config.short_desc;
                  this.loggedprofieldata.dpartnerdetails.dlocationdetails.id = dpartdetails.dlocationdetails.id;
                  this.loggedprofieldata.dpartnerdetails.dlocationdetails.location_name = dpartdetails.dlocationdetails.location_name;
                  this.loggedprofieldata.dpartnerdetails.payment_keys.api_key = dpartdetails.payment_keys.api_key;
                  this.loggedprofieldata.dpartnerdetails.payment_keys.secret_key = dpartdetails.payment_keys.secret_key;
                  this.loggedprofieldata.dpartnerdetails.payment_keys.cartsource_flag = dpartdetails.payment_keys.cartsource_flag;
                  this.loggedprofieldata.dpartnerdetails.currency_symbol = dpartdetails.currency_symbol;
                }               
                
                localStorage.setItem('loggeruserdata', JSON.stringify( this.loggedprofieldata));	             
                localStorage.setItem('loggedstatus', "logged");  
                this.objAuthserv.loggedIn.next(true);                 

                this.router.navigateByUrl('/home')
              }else{
                this.objAuthserv.loggedIn.next(false);
                document.getElementById('errormsg').innerHTML = 'Invalid Email or Password';
              }
              	 
        },
        (err) => {
         
        }
      );
  }



  onForgot() {
    this.router.navigate(['forgot-password']);
  }

  

  onSignUp() {
    this.router.navigate(['signup']);
  }


  loginerrormessage(){

	  let valid;
	  if(this.logData.luname ==''){
			 document.getElementById('euname').innerHTML = "Enter Email";
			 	valid=0;			
		}
		if(this.logData.lpassword==''){			
			    document.getElementById('eupassword').innerHTML = "Enter Password";
					valid=0;
		}
		if(valid==0){
			return false;			
		}else{
			return true;
		}
	  
  }

gotohome(){
    this.router.navigate(['/']);
}

gotoourclasses(){
  this.router.navigate(['ourclasses']);
}

gotosubscrition(){
  this.router.navigate(['tangosubscriptions']);
}

}
