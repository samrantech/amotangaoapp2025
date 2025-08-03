import { Component, OnInit } from '@angular/core';
import { NavController,ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router,NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-mysubscriptions',
  templateUrl: './mysubscriptions.page.html',
  styleUrls: ['./mysubscriptions.page.scss'],
})
export class MysubscriptionsPage implements OnInit {
  scannedCode = null;
  uData = {
    uname:'',
    urole:'',
    uemail:'',
    cartsource_flag: ''
  };
  public islogged:any;
  data$: Observable<any>;
  data: any;
  private subscription: Subscription;
  public isLoading:any;
  scanEmail: any;
  subscriptionplans: any;
  activesbscount: any;
  studentName: any;
  subParams1: Subscription;
  subParams2: Subscription;
  subParams3: Subscription;
  selectedDate: string;
  studentId: any;
  showsclassinfo:any;
  classlist:any;
  eventslist: any;

  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }
  public cartCount = "";
  public ncsCount = "";

  constructor(
    private navCtrl: NavController,
    public objAuthSer: AuthService,
    private router: Router,
    public loadingController: LoadingController,   
    public objUserService: UserService,
    public objCart : CartService,
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController
  ) { 
    this.selectedDate = new Date().toISOString().slice(0,10); 
    this.studentId = "";
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

  gotocart(){
    this.router.navigate(['cart']);
  }

  gotonotifications(){
    this.router.navigate(['notifications']);
  }

  fngetsubscriptionlist(){

    if(localStorage.getItem("loggeruserdata") === null){   
      
    }else{
      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      let pDetails = this.objUserService.getDPartnerDetails();
      this.uData.cartsource_flag = pDetails.cartsource_flag;
      this.uData.uname = stData.uname;
      this.uData.uemail = stData.uemail;
      this.uData.urole = stData.urole;   
      this.fnCheckuseractivesubs();     
    }
  }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;  
            this.fngetsubscriptionlist();  
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


  fnCheckuseractivesubs(){

    this.loadctrlPresent();

    let loguserdata = {
        email : this.uData.uemail,
        cartsource_flag : this.uData.cartsource_flag
    };

    this.objUserService.getuserallscription(loguserdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();
            this.classlist = [];
            this.eventslist = [];
            if(data.status=="success"){  
              //this.activesbscount = data.activesubscount;
              this.subscriptionplans = data.usersubscriptions;
              //this.studentName = data.studentname;
              //this.studentId = data.studentid;
            }
               
      },
      (err) => {
       
      }
    );
}
   
fnCheckgetuserclasses(){

  //this.loadctrlPresent();
  let pDetails = this.objUserService.getDPartnerDetails();
  this.partnerDetails.partner_id = pDetails.partner_id;
  let loguserdata = {
    classstartdate : this.selectedDate, 
    classenddate : this.selectedDate,  
    student_id : this.studentId,
    partner_id : this.partnerDetails.partner_id,   
  };

  this.objUserService.getuserclasslists(loguserdata).subscribe(
    (data:any) => {
          //this.dismissLoadctrl();
          if(data.status=="success"){  
            this.showsclassinfo = 1;
            this.classlist = data.classlist;
            this.eventslist = data.eventslist;
          }
             
    },
    (err) => {
     
    }
  );
}

scanCode () {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      //alert(atob(barcodeData.text))
      if(atob(barcodeData.text) == "attendance" && this.activesbscount >= 1){
        this.fnCheckgetuserclasses();
      }
    }).catch(error => {
      alert(error);
   });
  }

  fnOnchangeinput(e,classid,class_id,class_type){   
    if (e.currentTarget.checked) {
      var attendclass = true;
    } else {
      var attendclass = false;
    }
    
    this.fnassignattendance(classid,attendclass,class_id,class_type);
  }
  fnassignattendance(recid,attend_flag,class_id,class_type){

    //this.loadctrlPresent();
  
    let loguserdata = {
      attend_flag : attend_flag,
      recid : recid, 
      class_type: class_type,
      studentid : this.studentId, 
      class_id: class_id
    };
  
    if(recid){
      this.objUserService.assignattendance(loguserdata).subscribe(
        (data:any) => {
              //this.dismissLoadctrl();
              
              if(data.status=="success"){ 
                this.presentToast('bottom'); 
              }
                
        },
        (err) => {
        
        }
      );
    }
    else{
      this.objUserService.userassignattendance(loguserdata).subscribe(
        (data:any) => {
              //this.dismissLoadctrl();
              
              if(data.status=="success"){ 
                this.presentToast('bottom'); 
              }
                
        },
        (err) => {
        
        }
      );
    }
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Attendance updated successfully',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  onLoadEvents(itemdata) {  
      
    let navextra: NavigationExtras = { state: { subs_id: itemdata.subscription_id } };
    this.router.navigateByUrl('/usersubscriptionlist', navextra);
  }
}

