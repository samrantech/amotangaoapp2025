import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable,Subscription } from 'rxjs';
import { AlertController,Platform ,NavController} from '@ionic/angular';
import { CommonService } from './services/common.service';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { UserService } from './services/user.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import OneSignal from 'onesignal-cordova-plugin';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public islogged:any;
  data$: Observable<any>;
  data: any;
  private subscription: Subscription;
  arrMnourclass : any;
  arrMnmilonga: any;
  arrMenus: any;
  public currentversion:any;
  public appserversion:any;
  public appLogoPath = "";

  public partnerDetails = {
    partner_id : "1",
    location_id: "1"
  }

  public objone = OneSignal;

  constructor( 
      private navCtrl: NavController,
      private router: Router,
      public objAuthSer: AuthService, 
      private alertCtrl: AlertController,
      private platform: Platform,
      public commonServ: CommonService,
      public inAppBrowser: InAppBrowser,
      public objUsr : UserService,
      private androidPermissions: AndroidPermissions,
      public objCart : CartService,
           
    ) { 
      
      this.currentversion = this.commonServ.applocalversion;
      this.initializeApp();
      this.fnloadmenu();

      if(localStorage.getItem("loggedstatus") === null){       
        this.objAuthSer.loggedIn.next(false); 
      }else{  
        let loggedstatus  = localStorage.getItem("loggedstatus");
        if(loggedstatus == "logged"){
          this.objAuthSer.loggedIn.next(true);         
        }
      }
      
    }


    // Call this function when your app starts
 fnOneSignalInit(){   
    OneSignal.initialize("70e160a8-c22f-418c-87c5-becb50a16aa2"); 

    
    let myClickListener = async function(event) {
        let notificationData = JSON.stringify(event); 
        alert(notificationData);        
    };  
    OneSignal.Notifications.requestPermission().then((accepted: boolean) => {
      if(accepted==true){
        //let subsId = OneSignal.User.pushSubscription.id;
         OneSignal.Notifications.addEventListener("click", myClickListener);           
         
      }      
    });
    
}


   fnCheckAndroidPermission(){

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.POST_NOTIFICATIONS).then((permission) => {         
      
      if (permission.hasPermission) {
        
      }else{
        this.fnRequestAndoridPersmission();
      }
       
    },
    (err) => {     
    }
    ); 

   }


   fnRequestAndoridPersmission(){
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.POST_NOTIFICATIONS).then((permission) => {   
      if (permission.hasPermission) {
        
      }       
    },
    (err) => {     
    }
    ); 

   }
  

    initializeApp() {     
      
      this.platform.ready().then(() => {  
        this.checkforappupdate();
        //this.fnOneSignalInit();
      });
    }
    

 
    checkforappupdate(){
   
      this.commonServ.getappversionupdate().subscribe(
        async (data:any) => {
        let mydataJson:any;
        let appchkurl: any;
        let forceupdate:any;
        let showUpdatePop:any;

        mydataJson = data;  
        if(mydataJson){
          this.appserversion = mydataJson.appversion;   
          appchkurl = mydataJson.playstoreurl;
          forceupdate = mydataJson.forcepdate;  
          showUpdatePop = mydataJson.andshowupdatepopup;

          if(showUpdatePop == 1){
            if(this.appserversion != this.currentversion){  
              this.showupdatenew(appchkurl,forceupdate,"We have improved the Tango Amistoso APP with some major changes. So we are requesting you to update your Tango Amistoso APP Version to the newer one!");    
            }
          }

         
        }

        },
        (error) => {
          //console.log("Oooops!");
        }
      );


      //this.showupdatenew("",1,"We have improved the Tango Amistoso APP with some major changes. So we are requesting you to update your Tango Amistoso APP Version to the newer one!");
    }


    async showupdatenew(apprul, forceupdate, messagedisp) {
      if (forceupdate == 1) {
        const confirm = this.alertCtrl.create({
          header: "APP Update Available",
          backdropDismiss: false,
          message: messagedisp,
          buttons: [
            {
              text: "Go to play store",
              cssClass: "updateplaystore",
              handler: () => {  
                let browser = this.inAppBrowser.create(apprul, "_system");
                browser.show();                
              },
            },
          ],
        });
        (await confirm).present();
      } else {
        const confirm = this.alertCtrl.create({
          header: "APP Update Available",
          backdropDismiss: false,
          message: messagedisp,
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "updatecancel",
            },
            {
              text: "Go to play store",
              cssClass: "updateplaystore",
            },
          ],
        });
        (await confirm).present();
      }
    }


    fnloadmenu(){      

     this.arrMnourclass = [
        {
          menu_title: 'Beginners',
          menu_url: 'https://www.tango-amistoso.co.uk/london-tango-classes-beginners',  
          menu_level: 'Beginners',       
        },  
        {
          menu_title: 'Improvers',
          menu_url: 'https://www.tango-amistoso.co.uk/london-tango-classes-improvers',  
          menu_level: 'Improvers',        
        }, 
        {
          menu_title: 'Intermediate Level',
          menu_url: 'https://www.tango-amistoso.co.uk/intermediate-level-tango-classes-in-london', 
          menu_level: 'Intermediate',         
        }, 
        {
          menu_title: 'Advanced Level',
          menu_url: 'https://www.tango-amistoso.co.uk/london-tango-classes-advanced-level-classes', 
          menu_level: 'Advanced',         
        }, 
        {
          menu_title: 'Tuesday Special',
          menu_url: 'https://www.tango-amistoso.co.uk/tuesday-special-tango-classes',
          menu_level: 'Tuesday',          
        },   
      ];


      this.arrMnmilonga = [
        {
          menu_title: 'Wednesday - Milonga Central',
          menu_url: 'https://www.tango-amistoso.co.uk/milonga-central/',         
        },  
        {
          menu_title: 'Saturday - Milonga Amistosa',
          menu_url: 'https://www.tango-amistoso.co.uk/milonga-amistosa/',         
        }, 
        {
          menu_title: 'Friday - Negracha',
          menu_url: 'https://www.tango-amistoso.co.uk/negracha-is-londons-iconic-friday-milonga/',         
        }, 
        {
          menu_title: 'Friday - Los Amigos',
          menu_url: 'https://www.tango-amistoso.co.uk/milonga-los-amigos/',         
        }, 
        {
          menu_title: 'Sunday - Milonga Simpatica',
          menu_url: 'https://www.tango-amistoso.co.uk/milonga-simpatica/',         
        },         
        {
          menu_title: 'Tango trips and Holidays',
          menu_url: 'https://www.tango-amistoso.co.uk/tango-trips-and-holidays/',         
        },   
      ];

      this.arrMenus = [
        {
          menu_title: 'Weekly Schedule',
          menu_url: 'https://www.tango-amistoso.co.uk/weekly-schedule/',         
        },  
        {
          menu_title: 'Subscriptions',
          menu_url: 'https://www.tango-amistoso.co.uk/tango-amistoso-subscriptions/',         
        },         
        {
          menu_title: 'Speical Workshops',
          menu_url: 'https://www.tango-amistoso.co.uk/workshops/',         
        }        
      ];

    }

   

    ngOnInit() {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
      };
      this.checkloginstatus();      
    }

  checkloginstatus(){
    this.data$ = this.objAuthSer.isLoggedIn();  
    this.subscription = this.data$.subscribe(
      (result) => {
        this.islogged = result; 
        if(result == true){
          let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
          if(stData.dpartnerdetails?.partner_template_config){
            let primaryColor = stData.dpartnerdetails?.partner_template_config?.primarycolor;
            const htmlEl = document.querySelector('html');
            htmlEl.style.setProperty('--ion-color-primary', primaryColor);
            this.appLogoPath = this.objUsr.getParterLogo(); 
            let pDetails = this.objUsr.getDPartnerDetails();
           
          }
        }
        
        
      },
      (error) => {
        this.islogged = false;
      }
    );
  }



  goToHome(){
    this.router.navigate(['/home']);
  }

  onlogin() {
    this.router.navigate(['/']);
  }
  onlogout(){
    window.localStorage.clear();
    //window.localStorage.removeItem('loggeruserdata');
    //window.localStorage.removeItem('loggedstatus');  
    window.sessionStorage.clear();   
    this.objCart.cartId.next("0");
    this.objCart.cartCount.next("");  
    this.objAuthSer.loggedIn.next(false);
    const htmlEl = document.querySelector('html');
    htmlEl.style.setProperty('--ion-color-primary', "#c33131");
    this.router.navigate(['/']);
    //this.objAuthSer.userlogout();
   
  }

  ongotosubcriptionpage() {
    this.router.navigateByUrl('/tangosubscriptions');
  }

  openExternalsite(flag){
    let arrURL = [];
    arrURL[1] = 'https://www.tango-amistoso.co.uk/london-tango-classes-beginners';
    arrURL[2] = 'https://www.tango-amistoso.co.uk/london-tango-classes-improvers';
    arrURL[3] = 'https://www.tango-amistoso.co.uk/intermediate-level-tango-classes-in-london';
    arrURL[4] = 'https://www.tango-amistoso.co.uk/london-tango-classes-advanced-level-classes';
    arrURL[5] = 'https://www.tango-amistoso.co.uk/tuesday-special-tango-classes';

    window.open(arrURL[flag]);
  }

  togomyaccount(){
    this.router.navigate(['/myaccount']);
  } 
  togomyqr(){
    this.router.navigate(['/showmyqrcode']);
  }


  onLoadcoursepage(itemdata){    
    let navextra: NavigationExtras = { state: { 'clevel': itemdata.menu_level } };
    this.router.navigateByUrl("/courselist",navextra);    
  }


  onLoadContentPage(pageFlag){    
    let navextra: NavigationExtras = { state: { 'pageflag': pageFlag } };
    this.router.navigateByUrl("/contents",navextra);    
  }




}
