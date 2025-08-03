import { Component, OnInit } from '@angular/core';
import { NavController,ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-showmyqrcode',
  templateUrl: './showmyqrcode.page.html',
  styleUrls: ['./showmyqrcode.page.scss'],
})
export class ShowmyqrcodePage implements OnInit {
  scannedCode = null;
  uData = {
    uname:'',
    urole:'',
    uemail:''
  };
  qrcodescancode: any;  
  public islogged:any;
  data$: Observable<any>;
  data: any;
  public isLoading:any;
  subParams2: Subscription;
  subParams1: Subscription;
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
    public route: Router,
    public objCart : CartService,
    public objUserService: UserService,
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
  

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subParams1 = this.data$.subscribe(
      (result) => {
        if(result == true){
            this.islogged = result;  
            this.fngetuserdetails(); 
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

  gotocart(){
    this.route.navigate(['cart']);
  }

  gotonotifications(){
    this.route.navigate(['notifications']);
  }
  
  fngetuserdetails(){

    if(localStorage.getItem("loggeruserdata") === null){  
     
      
    }else{

      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      console.log(stData)
      this.uData.uname = stData.uname;
      this.uData.uemail = stData.uemail;
      this.uData.urole = stData.urole;     
      this.qrcodescancode = btoa(this.uData.uemail);
    
    }
    let loguserdata = {
      email : this.uData.uemail
    };
    this.objUserService.getuserdetails(loguserdata).subscribe(
      (data:any) => {
            
            
            if(data.status=="success"){  
              let uddata = data.userdetails;
              this.studentId = uddata.user_id;                
              
            }else{
             
            }
               
      },
      (err) => {
       
      }
    );
  }
 
  onBack() {
    this.navCtrl.back();
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
      if(atob(barcodeData.text) == "attendance"){
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
}
