import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { LoadingController,ToastController,ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { BookmarkModelPage } from '../keyconcepts-model/keyconcepts-model.page';

@Component({
  selector: 'app-myaccount',
  templateUrl: './keyconcepts.page.html',
  styleUrls: ['./keyconcepts.page.scss'],
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
    profile_url: '',
    title: ''
  }

  users: any[] = [];
  pagination: any = {};
  currentPage: number = 1;
  searchTerm: string = '';


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
  public substatus = 0;
  public courselevels = [];
  public filterlevel = '';
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

    this.objUserService.fngetuserkeyconceptdetailsbyid(postFdata).subscribe(
      (data:any) => {           
            if(data.status=="success"){   
              if(data.subs_status != 0){
                this.resubs = 1;
                this.arrUserpartners = data.arrdata;
                this.substatus = 0;
              }
              else{
                this.substatus = 1;
              }
            }
            else{
              this.substatus = 1;
            }
               
      },
      (err) => {
       
      }
    );
}


isChecked(id: number): boolean {
  if(this.edit_id == 0){
    return this.reasons.includes(id.toString());
  }
  else{
    return this.valchecked.includes(id);
  }
}
isCheckedoptions(id: number): boolean {
  if(this.edit_id == 0){
    return this.reasonsoptions.includes(id.toString());
  }
  else{
    return this.valcheckedoptions.includes(id);
  }
}
fngetuserpartnersearch(page: number = 1){ 
  let pDetails = this.objUserService.getDPartnerDetails();  
  let postFdata = { 
    partner_id: pDetails.partner_id,   
    filterlevel: this.filterlevel,
    uemail: this.uData.uemail,
    page: page,
    search: this.searchTerm
  };
  this.objUserService.fngetkeyconceptsoptions(postFdata).subscribe(
    (data:any) => {           
          if(data.status=="success"){                
            this.arrkeyoptions = data.keyconcepts;
            this.courselevels = data.courselevels;

            this.pagination = data.pagination;
            this.currentPage = data.pagination.current_page;
          }
             
    },
    (err) => {
     
    }
  );
}

nextPage() {
  if (this.currentPage < this.pagination.last_page) {
    this.fngetuserpartnersearch(this.currentPage + 1);
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.fngetuserpartnersearch(this.currentPage - 1);
  }
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
  var element = $event.currentTarget.value;
console.log(this.reasons)
  const index = this.reasons.findIndex(item =>{
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
  if($event.target.id == "title"){     
    this.userdata.title = $event.target.value
  }
}
fnOnchangefilterlevel($event){
  this.filterlevel = $event.target.value;
  this.fngetuserpartnersearch();
  
}
changeListener($event) : void {
  this.file = $event.target.files[0];
}

fnValidateform(){
  let valid;

  if(this.userdata.title ==''){
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
  this.filterlevel = '';
  this.valchecked = [];
  this.valcheckedoptions = [];
  this.reasons = [];
  this.reasonsoptions = [];
  item.key_concept.forEach((element: any) => {
    this.valchecked.push(element.id)
  });

  item.key_concept_option.forEach((element: any) => {
    this.valcheckedoptions.push(element.id)
  });

  this.edit_id = item.id;
  this.userdata.title = item.title;
  this.crud_section = 1;
  this.part_section = 1;
  this.resubs = 0;
  this.reasons = this.valchecked;
  this.reasonsoptions = this.valcheckedoptions;
}
oncreatenew(){
  this.filterlevel = '';
  this.part_section = 1;
  this.crud_section = 1;
  this.resubs = 0;
  this.edit_id = 0;
  this.userdata.title = '';
  this.valchecked = [];
  this.valcheckedoptions = [];
  this.reasons = [];
  this.reasonsoptions = [];
}
onback(){
  this.part_section = 0;
  this.crud_section = 0;
  this.viewconcept = 0;
  this.resubs = 1;
 
}
onSave() {
  let loguserdata = {
    title: this.userdata.title,
    reasons: this.reasons,
    reasonsoptions: this.reasonsoptions,
    uemail: this.uData.uemail,
    mapping_id: this.edit_id
  };
  
  if(this.fnValidateform()==true){ 
    this.objUserService.fnuserkeyconceptmapping(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
              this.fngetuserpartnerdetails();
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
    key_id: item.id,
    uemail: this.uData.uemail
  };
  
    this.objUserService.fnremoveuserconceptmapping(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
              this.presentToast('top','Deleted Successfully!');
              this.fngetuserpartnerdetails();
            }else{
              this.presentToast('top',data.status);
            }
      },
      (err) => {
      
      }
    );
}
onView(item){
  let loguserdata = {
    key_id: item.id,
    uemail: this.uData.uemail
  };
  
    this.objUserService.fngetuserconceptmappingByid(loguserdata).subscribe(
      (data:any) => {
            if(data.status=="success"){  
              this.resubs = 0;
              this.part_section = 1;
              this.viewconcept = 1;
              this.arrkeymappings = data.arrdata;
            }else{
              this.presentToast('top',data.status);
            }
      },
      (err) => {
      
      }
    );
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
onSearchChange($event) {
  this.searchTerm = $event.target.value;
  this.fngetuserpartnersearch(1); // reset to first page on search 
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
