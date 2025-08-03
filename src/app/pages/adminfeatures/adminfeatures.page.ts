import { Component, OnInit } from '@angular/core';
import { NavController,ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminfeatures',
  templateUrl: './adminfeatures.page.html',
  styleUrls: ['./adminfeatures.page.scss'],
})
export class AdminfeaturesPage implements OnInit {
 
  scannedCode = null;
  public isLoading:any;
  scanEmail: any;
  subscriptionplans: any;
  classpack: any;
  classpackhistory: any;
  classpackflag: any;
  attendedclass: any;
  activesbscount: any;
  studentName: any;
  studentId: any;
  guest_note: any;
  showscaninfo:any;
  showsclassinfo:any;
  classlist:any;
  eventslist: any;
  bookedclasslist:any;
  bookedeventslist: any;
  bookedguestpasslist: any;
  bookedworkshoplist: any;
  selectedDate: string;
  uData = {
    uname:'',
    urole:'',
    uemail:'',
    allowadminfeatures: '',
    appadminfeatures:[],
  };
  public islogged:any;
  data$: Observable<any>;
  data: any;
  private subscription: Subscription;
  public partnerDetails = {
    partner_id : "",
    location_id: ""
  }

  constructor(
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public loadingController: LoadingController,   
    public objUserService: UserService,
    public objAuthSer: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { 

      this.scanEmail = "";
      this.activesbscount = 0;
      this.studentName = "";
      this.studentId = "";
      this.guest_note = "";
      this.showscaninfo = 0;
      this.classpackflag = 0;
      this.attendedclass = 0;
      this.selectedDate = new Date().toISOString().slice(0,10);
  }


  ngOnInit() {
    this.checkloginstatus();  
  }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subscription = this.data$.subscribe(
      (result) => {
        if(result == true){
            let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
            this.uData.uname = stData.uname;
            this.uData.uemail = stData.uemail;
            this.uData.urole = stData.urole;  
            this.uData.allowadminfeatures = stData.allowadminfeatures;
            this.uData.appadminfeatures = stData.appadminfeatures;
            
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


  fnCheckuseractivesubs(){
    let pDetails = this.objUserService.getDPartnerDetails();
    this.loadctrlPresent();

    let loguserdata = {
        email : this.scanEmail,
        partner_id: pDetails.partner_id      
    };

    this.objUserService.getuseractivesubscription(loguserdata).subscribe(
      (data:any) => {
            this.dismissLoadctrl();
            this.classlist = [];
            this.eventslist = [];
            if(data.status=="success"){  
              if(data.classflag && data.classflag == 1){
                this.presentToast('top',data.message); 
                this.classpack = data.getclasspack;
                this.classpackhistory = data.class_pack_history;
                this.classpackflag = 1;
              }
              else{
                this.classpackflag = 0;
                this.showscaninfo = 1;
                this.activesbscount = data.activesubscount;
                this.subscriptionplans = data.subsplans;
                this.studentName = data.studentname;
                this.studentId = data.studentid;
                //if(this.activesbscount >= 1){
                  this.fnCheckgetuserclasses();
                  this.fnCheckgetuserbookedclasses();
                //}
                this.guest_note = data.guest_note;
                this.attendedclass = data.attendedclass;
              }
            }
            else{
              this.presentToast('top',data.message); 
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

fnCheckgetuserbookedclasses(){

  //this.loadctrlPresent();
  let pDetails = this.objUserService.getDPartnerDetails();
  this.partnerDetails.partner_id = pDetails.partner_id;
  let loguserdata = {
    student_id : this.studentId,
    partner_id : this.partnerDetails.partner_id,   
  };
  this.bookedclasslist = [];
  this.bookedeventslist = [];
  this.bookedworkshoplist = [];
  this.bookedguestpasslist = [];
  this.objUserService.getuserbookedclasslists(loguserdata).subscribe(
    (data:any) => {
          //this.dismissLoadctrl();
          if(data.status=="success"){  
            this.showsclassinfo = 1;
            this.bookedclasslist = data.classlist;
            this.bookedeventslist = data.eventslist;
            this.bookedworkshoplist = data.workshoplist;
            this.bookedguestpasslist = data.guestpasslist;
          }
             
    },
    (err) => {
     
    }
  );
}

fnprocessadminfeatures(fflag){

  if(fflag == "scansubscription"){
    this.scanCode();
  }
  else if(fflag == "attendanceqr"){
    this.gotoscanqr();
  }else{
    alert(fflag);
  }


}

gotoscanqr(){
  this.classpackflag = 0;
  this.router.navigate(['attendanceqr']);
}

scanCode () {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.scanEmail = atob(barcodeData.text);
      this.fnCheckuseractivesubs();
    }).catch(error => {
      alert(error);
   });
  }



  onBack() {
    this.navCtrl.back();
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
                this.presentToast('bottom','Attendance updated successfully'); 
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
                this.presentToast('bottom','Attendance updated successfully'); 
              }
                
        },
        (err) => {
        
        }
      );
    }
  }
  async presentToast(position: 'top' | 'middle' | 'bottom',msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}

