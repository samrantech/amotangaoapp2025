import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-deleteacrequest',
  templateUrl: './deleteacrequest.page.html',
  styleUrls: ['./deleteacrequest.page.scss'],
})
export class DeleteacrequestPage implements OnInit {

  public genderlist=[
  {
    dereason:'I no longer need or want to use this account.'
  },
  {
    dereason:'I am unhappy with the service or features of this website.'
  }
];
public deletereqpostdata = {
  selectionoption: '',
  othersspecify: '',
  agreetc: false,
  seltextoption:'',
  reqsubdate: '',
  reqstatus: '',
};
public uData = {
  uname:'',
  urole:'',
  uemail:''
};
public totdelrequestcount = 0;
public isLoading:any;

  constructor(
    private navCtrl: NavController,
    public objUserService: UserService,
    private router: Router,
    public loadingController: LoadingController,
    private toastController: ToastController,
  ) {

        this.fngetDelrequests();

   }

  ngOnInit() {
  }

  onBack() {
    this.navCtrl.back();
  }

  onDeleterequtest(){

    let valid;
    if(this.deletereqpostdata.selectionoption == "" && this.deletereqpostdata.othersspecify == ''){
      valid = 0;
      document.getElementById('error_form').innerHTML = "Please select atlease one reason to delete your account";
    } else if(this.deletereqpostdata.agreetc == false){
      valid = 0;
      document.getElementById('error_form').innerHTML = "Please accept the delete requtest";
    }else{
      valid = 1;
    }

    if(valid == 1){
        this.fnmakedelrequest();
    }


  }

  fnOnchangeinput(event){

    document.getElementById('error_form').innerHTML =  '';
    if(event.target.id == "reaothers"){     
      this.deletereqpostdata.othersspecify = event.target.value
    }

  }


  fnmakedelrequest(){

    this.loadctrlPresent();

    let postdata = { 
      email: this.uData.uemail,
      delreason: this.deletereqpostdata.selectionoption,
      deloreason: this.deletereqpostdata.othersspecify,
      tcaaccepted: this.deletereqpostdata.agreetc,
      delrequestsource: 'App',  
    };

    this.objUserService.fnpostdelrequest(postdata).subscribe(
      (data:any) => {  
            if(data.status=="success"){  
              this.fngetDelrequests();
            }   
            this.dismissLoadctrl();            
      },
      (err) => {
        this.dismissLoadctrl();
      }
    );

  }


  fngetDelrequests(){

    if(localStorage.getItem("loggeruserdata") === null){  
     
      
    }else{

      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      this.uData.uemail = stData.uemail;    
    }

    let loguserdata = {
      email : this.uData.uemail
    };
    this.loadctrlPresent();
    this.objUserService.getuseraccdelrequests(loguserdata).subscribe(
      (data:any) => {  
            if(data.status=="success"){  
             this.totdelrequestcount = data.delreqcount; 
             let reqData = data.deeldata;
             this.deletereqpostdata.seltextoption = reqData.textreason;  
             this.deletereqpostdata.othersspecify = reqData.deloreason;   
             this.deletereqpostdata.reqsubdate = reqData.txtdate;  
             this.deletereqpostdata.reqstatus = data.stdelrequest;      
            }  
            this.dismissLoadctrl();                 
      },
      (err) => {
        this.dismissLoadctrl();    
      }
    );

  }

  onDelcancelrequest(){
    let loguserdata = {
      email : this.uData.uemail
    };
    this.loadctrlPresent();
    this.objUserService.fnsendacccencelreqeust(loguserdata).subscribe(
      (data:any) => {  
            if(data.status=="success"){  
              this.dismissLoadctrl();    
              this.router.navigate(['/']);            
            }               
      },
      (err) => {
        this.dismissLoadctrl();    
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

}
