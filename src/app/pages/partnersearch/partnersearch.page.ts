import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { BookmarkModelPage } from '../partnersearch-model/partnersearch-model.page';

@Component({
  selector: 'app-myaccount',
  templateUrl: './partnersearch.page.html',
  styleUrls: ['./partnersearch.page.scss'],
})
export class MyaccountPage implements OnInit {
  public arrDobmonth:any;
  
  file: File;
  uData = {
    uname:'',
    urole:'',
    uemail:'',
    allowadminfeatures: '',
    appadminfeatures:[],
    approfilemenulist:[],
  };

  userdata ={
    experience:'',
    thoughts:'',
    ideal:'',
    reason:'',
    reason_other:'',
    part_search: 0,
    profile_url: ''
  }
  public islogged:any;
  data$: Observable<any>;
  data: any;
  subParams2 : Subscription;
  subParams3: Subscription;

  private subscription: Subscription;
  public isLoading:any;
  public appLogoPath = "";
  public arrUserpartners= [];
  public arrUsermatchedpartners= [];
  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }
  public cartCount = "";
  public ncsCount = "";
  public rehis = 1;
  public resubs = 0;
  public cansubs = 0;
  public part_section = 0;
  constructor(
    private router: Router,
    public objAuthSer: AuthService,
    public loadingController: LoadingController,  
    public objUserService: UserService,
    public objCart : CartService,
    private toastController: ToastController,
    private modalController: ModalController,
  ) { 

   }

  ngOnInit() {
    this.checkloginstatus();  
  }

  ngOnDestroy() {   
    this.subscription.unsubscribe();
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

  gotocart(){
    this.router.navigate(['cart']);
  }

  gotonotifications(){
    this.router.navigate(['notifications']);
  }
  
  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subscription = this.data$.subscribe(
      (result) => {
        if(result == true){
            let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
            console.log(stData)
            this.uData.uname = stData.uname;
            this.uData.uemail = stData.uemail;
            this.uData.urole = stData.urole;  
            this.uData.allowadminfeatures = stData.allowadminfeatures;
            this.uData.appadminfeatures = stData.appadminfeatures;  
            this.appLogoPath = this.objUserService.getParterLogo(); 
            this.getCartCount(); 
            this.getNCSCount();   
            let pDetails = this.objUserService.getDPartnerDetails();
            this.partnerDetails.partner_id = pDetails.partner_id;
            this.fngetuserpartnersearch();
            this.fngetuserpartnerdetails();

        } else{
            this.router.navigate(['login']);
        }          
      },
      (error) => {
        this.islogged = false;
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


  fngetuserpartnerdetails(){    
    let postFdata = { 
      uemail: this.uData.uemail,   
      partner_id: this.partnerDetails.partner_id    
    };

    this.objUserService.fngetuserpartnerdetailsbyid(postFdata).subscribe(
      (data:any) => {           
            if(data.status=="success"){   
              this.arrUserpartners = data.partners;
              this.arrUsermatchedpartners = data.matched_partners;            
              this.arrDobmonth = Object.values(data.reason);
              let uddata = data.userdetails;
              this.userdata.experience = uddata.experience;
              this.userdata.ideal = uddata.ideal;
              this.userdata.thoughts = uddata.thoughts;
              this.userdata.reason = uddata.reason;
              this.userdata.reason_other = uddata.reason_other;
              this.userdata.profile_url = uddata.profile_url;
            }
               
      },
      (err) => {
       
      }
    );
}
fngetuserpartnersearch(){      
  let postFdata = { 
    uemail: this.uData.uemail,       
  };

  this.objUserService.fngetuserpartnersearch(postFdata).subscribe(
    (data:any) => {           
          if(data.status=="success"){                
            this.userdata.part_search = data.userdetails.part_search;
            this.part_section = data.userdetails.part_search;
            //this.fngetuserpartnerdetails();
          }
             
    },
    (err) => {
     
    }
  );
}
fnupdatepartnersearch(){    

  this.loadctrlPresent();    
  let postFdata = { 
    uemail: this.uData.uemail,     
    part_search: this.userdata.part_search,  
  };

  this.objUserService.updatepartnersearch(postFdata).subscribe(
    (data:any) => {
          this.dismissLoadctrl();            
          if(data.status=="success"){   
            //this.presentToast('top','Updated Successfully!');             
            //this.fngetuserpartnerdetails();
          }
             
    },
    (err) => {
     
    }
  );
}
   

fnOnchangecheckbox($event){
  if($event.currentTarget.checked == true){
    this.userdata.part_search = 1;
    this.part_section = 1;
  }
  else{
    this.userdata.part_search = 0;
    this.part_section = 0;
  }
  this.fnupdatepartnersearch();
}

fnOnchangeinput($event){
  if($event.target.id == "experience"){     
    this.userdata.experience = $event.target.value
  }else if($event.target.id == "thoughts"){
    this.userdata.thoughts = $event.target.value
  }else if($event.target.id == "ideal"){
    this.userdata.ideal = $event.target.value
  }else if($event.target.id == "reason"){
    this.userdata.reason = $event.target.value
  }else if($event.target.id == "reason_other"){
    this.userdata.reason_other = $event.target.value
  }
}

changeListener($event) : void {
  this.file = $event.target.files[0];
}

fnValidateform(){
  let valid;

  if(this.userdata.experience ==''){
    document.getElementById('euexperience').innerHTML = "Enter the Experience of Tango";
      valid=0;			
  }
  if(this.userdata.thoughts == ''){
    document.getElementById('euthoughts').innerHTML = "Enter the Thoughts about Tango";
    valid=0;
  }
  if(this.userdata.ideal == ''){
    document.getElementById('euideal').innerHTML = "Describe your ideal Tango Partner";
    valid=0;
  }
  if(this.userdata.reason == ''){
    document.getElementById('eureason').innerHTML = "Please specify what you'd like to work on together.";
    valid=0;
  }

  if(valid==0){
    return false;			
  }else{
    return true;
  }	  
}


fnclearmessage(){
  document.getElementById('euexperience').innerHTML = '';
  document.getElementById('euthoughts').innerHTML = '';
  document.getElementById('euideal').innerHTML = '';
  document.getElementById('eureason').innerHTML = '';
}


onSave() {
  this.fnclearmessage();
  let formData = new FormData();
  if(this.file){
    formData.append("file",  this.file, this.file.name);
  }
  formData.append("email",  this.uData.uemail);
  formData.append("experience",  this.userdata.experience);
  formData.append("thoughts",  this.userdata.thoughts);
  formData.append("ideal",  this.userdata.ideal);
  formData.append("reason",  this.userdata.reason);
  formData.append("reason_other",  this.userdata.reason_other);
  formData.append("profile_url",  this.userdata.profile_url);

  if(this.fnValidateform()==true){ 
    this.objUserService.uploadPic(formData).then((res) => {
      if(res['status'] == "success"){  
        this.presentToast('top','Updated Successfully!');
        
      }else{
        this.presentToast('top',res['message']);
      }
    }, (err) => {
        console.log(err);
      });
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

gotopartner(){
  this.rehis = 0;
  this.resubs = 1;
  this.cansubs = 0;
}
gotomatched(){
  this.rehis = 0;
  this.resubs = 0;
  this.cansubs = 1;
}
gotoprofile(){
  this.rehis = 1;
  this.resubs = 0;
  this.cansubs = 0;
}
onLoadEvents(item,status){
  this.loadctrlPresent();    
  let postFdata = { 
    uemail: this.uData.uemail,
    request_to: item.user_id,
    status: status
  };

  this.objUserService.fnupdaterequest(postFdata).subscribe(
    (data:any) => {
          this.dismissLoadctrl();            
          if(data.status == "success"){  
            this.presentToast('top','Updated Successfully!');
            
          }else{
           
          }
             
    },
    (err) => {
     
    }
  );
}

async goToModel(subcriptionDetails) { 
  const modal = await this.modalController.create({
    component: BookmarkModelPage,
    cssClass: 'custom_modal',
    componentProps: { itemData: subcriptionDetails,reason: this.arrDobmonth }
  });
  await modal.present();
}

}
