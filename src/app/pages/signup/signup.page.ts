import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController,LoadingController,AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public arrCountrylist:any;
  public arrUserCategory:any;
  public arrTangoCommunity:any;
  public arrReferalSource:any;
  public arrDobmonth:any;

  public userData = {
      tangoCommunity: "1",
      entryLevel: "",
      firstname:"",
      lastname:"",
      userphoneno:"",
      useremail:"",
      usercity:"",
      usercountry:"GB",
      userpassword:"",
      unewsletter:"",
      hear_about: "",
      hear_about_others: "",
      dob_month: "",
      dob_day: ""
  }
  public isLoading : any = "";
  public accRegistered : any = false;
  public isTextFieldType: boolean;
  
  constructor(
    private router: Router,
    private navCtrl: NavController,
    public objUserService: UserService,
    public loadingController: LoadingController, 
    private alertController: AlertController,
  ) {

   }


  fnOnchangeinput($event){   

    this.fnclearmessage();
    if($event.target.id == "firstname"){     
      this.userData.firstname = $event.target.value
    }else if($event.target.id == "lastname"){
      this.userData.lastname = $event.target.value
    }else if($event.target.id == "userphoneno"){
      this.userData.userphoneno = $event.target.value
    }else if($event.target.id == "useremail"){
      this.userData.useremail = $event.target.value
    }else if($event.target.id == "usercity"){
      this.userData.usercity = $event.target.value
    }else if($event.target.id == "userpassword"){
      this.userData.userpassword = $event.target.value
    }else if($event.target.id == "dob_month"){
      this.userData.dob_month = $event.target.value
    }else if($event.target.id == "dob_day"){
      this.userData.dob_day = $event.target.value
    }

    

  }

  fnclearmessage(){
    document.getElementById('etangoCommunity').innerHTML = '';
    document.getElementById('eentryLevel').innerHTML = '';
    document.getElementById('efirstname').innerHTML = '';
    document.getElementById('elastname').innerHTML = '';
    document.getElementById('euserphoneno').innerHTML = '';
    document.getElementById('euseremail').innerHTML = '';
    document.getElementById('eusercity').innerHTML = '';
    document.getElementById('eusercountry').innerHTML = '';
    document.getElementById('euserpassword').innerHTML = '';
    document.getElementById('ehear_about').innerHTML = '';
   
  }

  togglemyPasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }

  fnValidateform(){
    let valid;
     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(this.userData.tangoCommunity ==''){
      document.getElementById('etangoCommunity').innerHTML = "Please select the tango community";
        valid=0;			
    }
    if(this.userData.entryLevel == ''){
      document.getElementById('eentryLevel').innerHTML = "Please select the entry level";
      valid=0;
    }

    if(this.userData.firstname == ''){
      document.getElementById('efirstname').innerHTML = "Please enter the first name";
      valid=0;
    }

    if(this.userData.lastname == ''){
      document.getElementById('elastname').innerHTML = "Please enter the last name";
      valid=0;
    }

    if(this.userData.userphoneno == ''){
      document.getElementById('euserphoneno').innerHTML = "Please enter the phone number";
      valid=0;
    }
   
    if(!(this.userData.useremail.match(mailformat))){
      document.getElementById('euseremail').innerHTML = "Enter the valid Email";
      valid=0;
    }

    if(this.userData.usercountry == ''){
      document.getElementById('eusercountry').innerHTML = "Please select the country";
      valid=0;
    }

    if(this.userData.usercity == ''){
      document.getElementById('eusercity').innerHTML = "Please enter the city";
      valid=0;
    }

    if(this.userData.userpassword == ''){
      document.getElementById('euserpassword').innerHTML = "Please enter password";
      valid=0;
    }

    if(this.userData.hear_about == ''){
      document.getElementById('ehear_about').innerHTML = "Please select how did you hear about us?";
      valid=0;
    }
    

    if(valid==0){
			return false;			
		}else{
			return true;
		}	  

    return valid
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

  async showAlertMessage(errorMessage) {
    const alert = await this.alertController.create({
      header: 'Registration Failed',     
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  fnOnSave(){

    this.fnclearmessage();
    if(this.fnValidateform()==true){ 
      this.loadctrlPresent();
      this.objUserService.fnNewRegistration(this.userData).subscribe(
        (data:any) => {  
              this.dismissLoadctrl();
              if(data.status=="success"){                
                this.accRegistered = true;
              }else{
                this.showAlertMessage(data.message);
              }              	 
        },
        (err) => {
          this.dismissLoadctrl();
        }
      );

    }
    else{

    }
  }

  ngOnInit() {
    this.fnGetSignupParams();
  }

  onLogin() {
    this.router.navigate(['/']);
  }

  onBack() {
    this.navCtrl.back();
  }
  onSignUp() {
    //this.router.navigate(['choose-interest']);
  }

  fnGetSignupParams(){  
    this.isLoading = true;      
    let postFdata = { published: 1 };
    this.objUserService.fngetsignupparams(postFdata).subscribe(
      (data:any) => {         
        if(data.status=="success"){                
          this.arrCountrylist = data.countrylists;
          this.arrUserCategory = data.usercategory;
          this.arrTangoCommunity = data.tangocommunity;   
          this.arrReferalSource = data.hearaboutus;     
          this.arrDobmonth = Object.values(data.dob_month);
          this.isLoading = false;
        }                          
      },
      (err) => { }
    );
}

}
