/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Event Booking App Template
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2021-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  current = 1;
  userdata ={
    femail:'',
    frestcode:'',
    fnewpassword:'',
    fcnfmpassword:'',
  };
  public isLoading:any;

  constructor(
    private NavCtrl: NavController,
    private router: Router,
    public loadingController: LoadingController,   
    public objUserService: UserService,
  ) { 


  }

  ngOnInit() {
  }

  onBack() {
    this.NavCtrl.back();
  }
  onDone() {
    this.NavCtrl.back();
  }

  fnOnchangeinput($event){

    this.fnclearmessage();

    if($event.target.id == "femail"){
      this.userdata.femail = $event.target.value
    }
    if($event.target.id == "fcode"){
      this.userdata.frestcode = $event.target.value
    }

  }

  fnOnchangeinput2($event){

    this.fnclearmessage2();
    
    if($event.target.id == "fcode"){
      this.userdata.frestcode = $event.target.value
    }

    if($event.target.id == "fnewpassword"){
      this.userdata.fnewpassword = $event.target.value
    }

    if($event.target.id == "fcnfmpassword"){
      this.userdata.fcnfmpassword = $event.target.value
    }


  }

  fnValidateform(){
    let valid;
     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!(this.userdata.femail.match(mailformat))){
      document.getElementById('efemail').innerHTML = "Enter the valid Email";
      valid=0;
    }

    if(valid==0){
			return false;			
		}else{
			return true;
		}
	  

    return valid
  }

  fnvalidatepasscode(){
    let valid;    

    if(this.userdata.frestcode == ""){
      document.getElementById('efcode').innerHTML = "Enter the Reset Password coder received in the email";
      valid=0;
    }

    if(this.userdata.fnewpassword == ""){
      document.getElementById('efnewpassword').innerHTML = "Enter the new password";
      valid=0;
    }

    if(this.userdata.fnewpassword != this.userdata.fcnfmpassword){
      document.getElementById('efcnfmpassword').innerHTML = "confirn password should be same as password";
      valid=0;
    }

    if(valid==0){
			return false;			
		}else{
			return true;
		}
	  

    return valid
  }

  fnvalidateresetcode(){
     this.fnclearmessage2();
    if(this.fnvalidatepasscode()==true){ 
      this.fnresetpasswordwithcode();
    }
  }


  fnresetpasswordwithcode(){

    document.getElementById('ovrerror_1').innerHTML = '';    
    this.loadctrlPresent();
    let postdata = { 
      user_email: this.userdata.femail,
      email_otp: this.userdata.frestcode,
      new_password: this.userdata.fnewpassword,
      cartsource: 'smta',    
    };

    this.objUserService.fnresetpasswithcode(postdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){  
              this.current = 3;
            } else{
              document.getElementById('ovrerror_1').innerHTML = data.message;    
            }            
      },
      (err) => {
       
      }
    );
}


  fnclearmessage(){
    document.getElementById('efemail').innerHTML = '';    
  }

  fnclearmessage2(){    
    document.getElementById('efcode').innerHTML = '';
    document.getElementById('efnewpassword').innerHTML = '';
    document.getElementById('efcnfmpassword').innerHTML = '';
  }

  fnresentemailcode(){
    this.fnSendemailtouser(2); 
  }
  

  fnsavereqotpform(){
    this.fnclearmessage();
    if(this.fnValidateform()==true){ 
      this.fnSendemailtouser(1); 
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

  fnSendemailtouser(sentflag=1){
    
    if(sentflag == 2){
      document.getElementById('ovrerror_1').innerHTML = ''; 
    }else{
      document.getElementById('ovrerror_2').innerHTML = ''; 
    }
   

    this.loadctrlPresent();
    let fuserdata = {
        email : this.userdata.femail,      
    };

    this.objUserService.fngetemailotprs(fuserdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();            
            if(data.status=="success"){  
             this.current = 2;
            } else{            

              if(sentflag == 2){
                document.getElementById('ovrerror_1').innerHTML = data.message; 
              }else{
                document.getElementById('ovrerror_2').innerHTML = data.message; 
              }
            }              
      },
      (err) => {
       
      }
    );
}

redirectologin() {
  this.router.navigate(['login']);
}
    
}
