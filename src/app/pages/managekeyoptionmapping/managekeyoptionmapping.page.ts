import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { BookmarkModelPage } from '../keyconcepts-model/keyconcepts-model.page';

@Component({
  selector: 'app-myaccount',
  templateUrl: './managekeyoptionmapping.page.html',
  styleUrls: ['./managekeyoptionmapping.page.scss'],
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
    etitle:'',
    level:'',
    short_description:'',
    active_status:'',
    display_status: '2',
    event_groupid: 0,
    media_source: ''
  }
  public islogged:any;
  data$: Observable<any>;
  data: any;
  subParams2 : Subscription;
  subParams3: Subscription;
  subParams : Subscription;
  private subscription: Subscription;
  public isLoading:any;
  public appLogoPath = "";
  public arrUserpartners= [];
  public arrUsermatchedpartners= [];
  public arrkeyoptions = [];
  public arrkeymappings = [];
  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }
  public cartCount = "";
  public ncsCount = "";
  public rehis = 0;
  public resubs = 0;
  public cansubs = 0;
  public valchecked = [];
  public valcheckedoptions = [];
  public part_section = 0;
  public viewconcept = 0;
  public crud_section = 0;
  public edit_id = 0;
  public reasons = [];
  public reasonsoptions = [];
  public courselevels = [];
  public substatus = 1;
  public filterstatus = 'Active';
  constructor(
    private route: Router,
    public router: ActivatedRoute,
    public objAuthSer: AuthService,
    public loadingController: LoadingController,  
    public objUserService: UserService,
    public objCart : CartService,
    private toastController: ToastController,
    private modalController: ModalController,
  ) { 

   }

   genderlist=[
    {
      gender_name:'Active'
    },
    {
      gender_name:'Inactive'
    },
    {
      gender_name:'Archive'
    }

  ]
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
    this.route.navigate(['cart']);
  }

  gotonotifications(){
    this.route.navigate(['notifications']);
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
            // this.fngetuserpartnersearch();
            // this.fngetuserpartnerdetails();

            this.subParams = this.router.params.subscribe((params) => {
              if (this.route.getCurrentNavigation().extras.state != undefined) {
                this.userdata.event_groupid = this.route.getCurrentNavigation().extras.state.subs_id;
                this.fngetuserpartnersearch();
              }
            });

        } else{
            this.route.navigate(['login']);
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

    this.objUserService.fngetuserkeyconceptdetailsbyid(postFdata).subscribe(
      (data:any) => {           
            if(data.status=="success"){   
              if(data.subs_status != 0){
                this.resubs = 1;
                this.arrUserpartners = data.arrdata;
                this.substatus = data.subs_status;
              }
            }
               
      },
      (err) => {
       
      }
    );
}

isChecked(id: number): boolean {
  return this.valchecked.includes(id);
}
isCheckedoptions(id: number): boolean {
  return this.valcheckedoptions.includes(id);
}
fngetuserpartnersearch(){ 
  let postFdata = { 
    event_groupid: this.userdata.event_groupid,
    uemail: this.uData.uemail,
    filterstatus: this.filterstatus,
  };

  this.objUserService.fngetkeyconceptdetailsbyid(postFdata).subscribe(
    (data:any) => {           
          if(data.status=="success"){                
            this.arrkeyoptions = data.splwkslists;
            this.resubs = 1;
            this.arrDobmonth = Object.values(data.active_status);
           // this.courselevels = data.courselevels;
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
    //part_search: this.userdata.part_search,  
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
  var element = $event.currentTarget.value;
// console.log(this.reasons)
  const index = this.reasons.findIndex(item =>{
    console.log(element)
    return  item == element
  });
  // console.log(index)
    if (index === -1) {
      // If element does not exist, add it
      this.reasons.push(element);
    } else {
      // If element exists, remove it
      this.reasons.splice(index, 1);
    }
}

fnOnchangecheckboxoptions($event){
  var element = $event.currentTarget.value;
  // console.log(this.reasons)
    const index = this.reasonsoptions.findIndex(item =>{
      console.log(element)
      return  item == element
    });
    // console.log(index)
      if (index === -1) {
        // If element does not exist, add it
        this.reasonsoptions.push(element);
      } else {
        // If element exists, remove it
        this.reasonsoptions.splice(index, 1);
      }
}

fnOnchangeinput($event){
  if($event.target.id == "etitle"){     
    this.userdata.etitle = $event.target.value
  }
  if($event.target.id == "short_description"){     
    this.userdata.short_description = $event.target.value
  }
  if($event.target.id == "media_source"){     
    this.userdata.media_source = $event.target.value
  }
  if($event.target.id == "level"){     
    this.userdata.level = $event.target.value
  }
  if($event.target.id == "active_status"){     
    this.userdata.active_status = $event.target.value
  }
  if($event.target.id == "display_status"){     
    this.userdata.display_status = $event.target.value
  }
}
fnOnchangefilterlevel($event){
  if($event.target.id == "filterstatus"){     
    this.filterstatus = $event.target.value
  }
  this.fngetuserpartnersearch();
}

changeListener($event) : void {
  this.file = $event.target.files[0];
}

fnValidateform(){
  let valid;

  if(this.userdata.etitle ==''){
    document.getElementById('euexperience').innerHTML = "Please enter the title";
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
}
onEdit(item){
  this.edit_id = item.id;
  this.userdata.etitle = item.title;
  this.userdata.short_description = item.short_description;
  this.userdata.media_source = item.media_source;
  this.userdata.active_status = item.active_status;
  this.userdata.display_status = ""+item.display_status+"";
  this.crud_section = 1;
  this.part_section = 1;
  this.resubs = 0;
}
oncreatenew(){
  this.edit_id = 0;
  this.userdata.etitle = '';
  this.userdata.short_description = '';
  this.userdata.media_source = '';
  this.userdata.level = '';
  this.userdata.active_status = '';
  this.userdata.display_status = '2';
  this.part_section = 1;
  this.crud_section = 1;
  this.resubs = 0;
  this.userdata.etitle = '';
  this.valchecked = [];
  this.valcheckedoptions = [];
}
onback(){
  this.part_section = 0;
  this.crud_section = 0;
  this.viewconcept = 0;
  this.resubs = 1;
 
}
onSave() {
  let pDetails = this.objUserService.getDPartnerDetails();
  let loguserdata = {
    event_title: this.userdata.etitle,
    short_description: this.userdata.short_description,
    media_source: this.userdata.media_source,
    active_status: this.userdata.active_status,
    display_status: this.userdata.display_status,
    event_groupid: this.userdata.event_groupid,
    spleventid: this.edit_id,
    uemail: this.uData.uemail
  };
  
  if(this.fnValidateform()==true){ 
    this.objUserService.fncupdatekeyconoptions(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
              this.fngetuserpartnersearch();
              this.part_section = 0;
              this.crud_section = 0;
              this.resubs = 1;
              this.presentToast('top','Updated Successfully!');
            }else{
              this.presentToast('top',data.status);
            }
      },
      (err) => {
      
      }
    );
  }
}
onremove(item){
  let loguserdata = {
    eventid: item.id,
  };
  
    this.objUserService.fndelkeyconceptoptionsbyid(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
              this.presentToast('top','Deleted Successfully!');
              this.fngetuserpartnersearch();
            }else{
              this.presentToast('top',data.status);
            }
      },
      (err) => {
      
      }
    );
}
onView(item){
  let navextra: NavigationExtras = { state: { subs_id: item.id } };
  this.route.navigateByUrl('/usersubscriptionlist', navextra);
}
onbacktolist(){
  this.route.navigateByUrl('/managekeymapping');
}
create_new(){
  this.rehis = 1;
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
