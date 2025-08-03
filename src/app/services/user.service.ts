import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient,
    public commonServ: CommonService
  ) 
  {


   }

   
   //user login
   userlogin(data){ 
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { email: data.email, password : data.password};
    const repos = this.http.post(this.commonServ.apiURL + "appLogin", postdata,{headers: headers});    
    return repos;
  }

  //get user details
  getuserdetails(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { uemail: data.email};
    const repos = this.http.post(this.commonServ.apiURL + "getuserdetailsbyemail", postdata,{headers: headers});    
    return repos;
  }

   //get bookings history
   getbookinghistory(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { email: data.email,bsource: data.bsource};
    const repos = this.http.post(this.commonServ.apiURL + "getbookinghistory", postdata,{headers: headers});    
    return repos;
  }

     //get bookings history
     getsubsdetails(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { student_id: data.student_id,subscription_id: data.subscription_id};
      const repos = this.http.post(this.commonServ.apiURL + "getsubsdetails", postdata,{headers: headers});    
      return repos;
    }
       //get bookings history
       sendsubcontinueemail(data){
        var headers = new HttpHeaders();       
        headers.append('content-type','application/json');
        let postdata = { user_id: data.student_id,subscription_id: data.subscription_id};
        const repos = this.http.post(this.commonServ.apiURL + "subcontinueemail", postdata,{headers: headers});    
        return repos;
      }
      sendcancelsubs(data){
        var headers = new HttpHeaders();       
        headers.append('content-type','application/json');
        let postdata = { subs_id: data.subs_id,user_id: data.user_id,admin_userid: data.admin_userid,other_reason: data.other_reason,feedback: data.feedback,reason: data.reasons};
        const repos = this.http.post(this.commonServ.apiURL + "cancelSubscriptions", postdata,{headers: headers});    
        return repos;
      }
      sendpausesubs(data){
        var headers = new HttpHeaders();
        headers.append('content-type','application/json');
        let postdata = { subs_id: data.subs_id,user_id: data.user_id,admin_userid: data.admin_userid,pause_start_date: data.pause_start_date,pause_end_date: data.pause_end_date,reason_pause: data.reason_pause};
        const repos = this.http.post(this.commonServ.apiURL + "pauseSubscriptions", postdata,{headers: headers});    
        return repos;
      }
      sendupgradesubs(data){
        var headers = new HttpHeaders();
        headers.append('content-type','application/json');
        let postdata = { userid: data.user_id,csubsplanid: data.csubsplanid,upgradstdate: data.upgradstdate,nsubsplanid: data.nsubsplanid};
        const repos = this.http.post(this.commonServ.apiURL + "subsupgradefee", postdata,{headers: headers});    
        return repos;
      }
  //to get active subscription
  getuseractivesubscription(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { email: data.email,partner_id: data.partner_id};
    const repos = this.http.post(this.commonServ.apiURL + "getuseractivsubsbyemail", postdata,{headers: headers});    
    return repos;
  }
    //to get subscription
    getuserallscription(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { email: data.email,bsource: data.cartsource_flag};
      const repos = this.http.post(this.commonServ.apiURL + "getmysubscription", postdata,{headers: headers});    
      return repos;
    }
  //to get classes list for admin dashboard
  getuserclasslists(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { classstartdate: data.classstartdate,classenddate: data.classenddate,student_id: data.student_id,partner_id: data.partner_id};
    const repos = this.http.post(this.commonServ.apiURL + "searchclassebyfilter", postdata,{headers: headers});    
    return repos;
  }
    //to get user booked classes list for admin dashboard
    getuserbookedclasslists(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { classstartdate: data.classstartdate,classenddate: data.classenddate,student_id: data.student_id,partner_id: data.partner_id};
      const repos = this.http.post(this.commonServ.apiURL + "getuserbookedclasslist", postdata,{headers: headers});    
      return repos;
    }
   //to get classes list for admin dashboard
   getbookingstudentlists(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { classid: data.classid};
    const repos = this.http.post(this.commonServ.apiURL + "getassignedstudentsbyclass", postdata,{headers: headers});    
    return repos;
  }
  //to assign attendance 
  assignattendance(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { attend_flag: data.attend_flag,recid : data.recid,class_type : data.class_type,studentid : data.studentid,class_id: data.class_id };
      const repos = this.http.post(this.commonServ.apiURL + "assignattendance", postdata,{headers: headers});    
      return repos;
  }
  //to assign attendance 
  userassignattendance(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { attend_flag: data.attend_flag,recid : data.recid,class_type : data.class_type,userid : data.studentid,classid: data.class_id };
    const repos = this.http.post(this.commonServ.apiURL + "userassignattendance", postdata,{headers: headers});    
    return repos;
}
  //to update user profile
  updateuserprofiledata(data){ 
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { dob_day: data.dob_day,dob_month: data.dob_month,user_id: data.uuid,salutation:data.usalutation,firstname:data.ufirstname,lastname:data.ulastname,email:data.uemail,phone_number:data.uphone,address_line1:data.uaddress1,address_line2:data.uaddress2,city:data.ucity,post_code:data.upostcode,gender:data.ugender,newsletter_subscription:data.unewsletter,user_country:data.ucountry};
    const repos = this.http.post(this.commonServ.apiURL + "updatestudent", postdata,{headers: headers});    
    return repos;
  }

   //to update partner user profile
   async uploadPic(data) {
    return await (this.http.post(this.commonServ.apiURL + "updateuserpartnerdetails", data)).toPromise();
 }
  //to update user profile
  updatepartnersearch(data){ 
   var headers = new HttpHeaders();       
   headers.append('content-type','application/json');
   let postdata = { email: data.uemail,part_search: data.part_search};
   const repos = this.http.post(this.commonServ.apiURL + "updatepartnersearch", postdata,{headers: headers});    
   return repos;
 }


  //to update user level
  updateuserlevelreqdata(data){ 
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { userid: data.uuid,user_level:data.ulevel};
    const repos = this.http.post(this.commonServ.apiURL + "userlevelreq", postdata,{headers: headers});    
    return repos;
  }

  // to get email otp to reset passwrod
  fngetemailotprs(data){ 
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { user_email: data.email};
    const repos = this.http.post(this.commonServ.apiURL + "usrestpassword", postdata,{headers: headers});    
    return repos;
  }

  //resetpassword
  fnresetpasswithcode(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { 
      user_email: data.user_email,
      email_otp: data.email_otp,
      new_password: data.new_password,
      cartsource: 'smta',    
    };
    const repos = this.http.post(this.commonServ.apiURL + "otprestpassword", postdata,{headers: headers});    
    return repos;
  }

    //togetdelrequet
    getuseraccdelrequests(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { email: data.email};
      const repos = this.http.post(this.commonServ.apiURL + "getdelrequest", postdata,{headers: headers});    
      return repos;
    }


  //postdelrequest
  fnpostdelrequest(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { 
      email: data.email,
      delreason: data.delreason,
      deloreason: data.deloreason,     
      tcaaccepted: data.deloreason, 
      delrequestsource: 'App',  
    };
    const repos = this.http.post(this.commonServ.apiURL + "userdelrequtest", postdata,{headers: headers});    
    return repos;
  }

 //cancel account delrequest
 fnsendacccencelreqeust(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { email: data.email};
    const repos = this.http.post(this.commonServ.apiURL + "cancelaccdelrequest", postdata,{headers: headers});    
    return repos;
  }


   //feateurs list
 fngetfeateruslistbyflag(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = {email: data.uemail,user_role: data.user_role,feature_flag : data.feature_flag};
  const repos = this.http.post(this.commonServ.apiURL + "getappfeaturesbyflag", postdata,{headers: headers});    
  return repos;
}

// Get partner details by email
fngetuserpartnerdetailsbyid(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = {uemail: data.uemail,partner_id: data.partner_id};
  const repos = this.http.post(this.commonServ.apiURL + "getuserpartnerdetails", postdata,{headers: headers});    
  return repos;
}

// Update partner request
fnupdaterequest(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = {uemail: data.uemail,status: data.status,request_to: data.request_to};
  const repos = this.http.post(this.commonServ.apiURL + "updatepartrequest", postdata,{headers: headers});    
  return repos;
}

// Get user partner search
fngetuserpartnersearch(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = {uemail: data.uemail};
  const repos = this.http.post(this.commonServ.apiURL + "getuserpartnersearch", postdata,{headers: headers});    
  return repos;
}
   //country lists
   fngetcountrylists(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = {published: data.published};
    const repos = this.http.post(this.commonServ.apiURL + "getcountrylists", postdata,{headers: headers});    
    return repos;
  }


  getParterLogo(){
    let logoPath = "";  
      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      if(stData.dpartnerdetails?.partner_logo_url){
        logoPath = stData.dpartnerdetails?.partner_logo_url;            
    }
    return logoPath;
  }


  getDPartnerDetails(){
    let partnerDetails = {
      partner_id : "",
      location_id: "",
      stripe_key: "",
      cartsource_flag: "",
      currency_symbol: "&pound;" 
    }
      let stData = JSON.parse(localStorage.getItem('loggeruserdata'));  
      if(stData.dpartnerdetails){       
        partnerDetails.partner_id = stData.dpartnerdetails?.partner_id;  
        partnerDetails.location_id = stData.dpartnerdetails?.dlocationdetails?.id;  
        partnerDetails.stripe_key = stData.dpartnerdetails?.payment_keys?.api_key;
        partnerDetails.cartsource_flag = stData.dpartnerdetails?.payment_keys?.cartsource_flag; 
        partnerDetails.currency_symbol = stData.dpartnerdetails?.currency_symbol || '&pound;';
    }
    return partnerDetails;
  }


    //country lists
    fngetsignupparams(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = {published: data.published};
      const repos = this.http.post(this.commonServ.apiURL + "getappsignupparams", postdata,{headers: headers});    
      return repos;
    }    

    public userData = {
      tangoCommunity: "",
      entryLevel: "",
      firstname:"",
      lastname:"",
      userphoneno:"",
      useremail:"",
      usercity:"",
      usercountry:"",
      userpassword:"",
      unewsletter:"",
  }

 
    //resetpassword 
  fnNewRegistration(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { 
      email: data.useremail,
      firstname: data.firstname,
      lastname: data.lastname,
      profile_info: '', 
      country: data.usercountry,
      city: data.usercity,
      password: data.userpassword,
      hear_about:data.hear_about,
      hear_about_others: data.hear_about_others,
      reg_source:"tcapp",
      community_location: "1",
      tango_community: data.tangoCommunity,
      partner_id: data.tangoCommunity,
      role: data.entryLevel,
      phone: data.userphoneno,
      dob_month: data.dob_month,
      dob_day: data.dob_day
    };
    const repos = this.http.post(this.commonServ.apiURL + "createuserbywp", postdata,{headers: headers});    
    return repos;
  } 
  
  fnRegisterFCMToken(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { 
      email: data.email,
      fcm_token: data.fcm_token,
      partner_id: data.partner_id,
      partner_location: data.partner_location     
    };
    const repos = this.http.post(this.commonServ.apiURL + "appcreatefcmtoken", postdata,{headers: headers});    
    return repos;

  }

  fnRegisterOSGToken(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { 
      email: data.email,
      og_id: data.og_id,
      og_token: data.og_token,
      partner_id: data.partner_id,
      partner_location: data.partner_location     
    };
    const repos = this.http.post(this.commonServ.apiURL + "appcreateogtoken", postdata,{headers: headers});    
    return repos;

  }

    //to get active subscription
    getactivesubscriptions(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { email: data.email,itemid: data.itemid,itemflag: data.itemflag};
      const repos = this.http.post(this.commonServ.apiURL + "getactivesubscription", postdata,{headers: headers});    
      return repos;
    }
  // Get user partner search
fngetkeyconceptsoptions(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = {partner_id: data.partner_id,filterlevel: data.filterlevel,uemail: data.uemail,search: data.search};
  const repos = this.http.post(this.commonServ.apiURL + "getkeyconceptsoptions?page=" + data.page, postdata,{headers: headers});    
  return repos;
}
fnuserkeyconceptmapping(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = { uemail: data.uemail,title: data.title,reason: data.reasons,reasonsoptions: data.reasonsoptions,mapping_id: data.mapping_id};
  const repos = this.http.post(this.commonServ.apiURL + "userkeyconceptmapping", postdata,{headers: headers});    
  return repos;
}
fngetuserkeyconceptdetailsbyid(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = { uemail: data.uemail,partner_id: data.partner_id};
  const repos = this.http.post(this.commonServ.apiURL + "getuserkeyconceptdetailsbyid", postdata,{headers: headers});    
  return repos;
}
fnremoveuserconceptmapping(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = { uemail: data.uemail,key_id: data.key_id};
  const repos = this.http.post(this.commonServ.apiURL + "removeuserconceptmapping", postdata,{headers: headers});    
  return repos;
}
fngetuserconceptmappingByid(data){
  var headers = new HttpHeaders();       
  headers.append('content-type','application/json');
  let postdata = { uemail: data.uemail,key_id: data.key_id};
  const repos = this.http.post(this.commonServ.apiURL + "getuserconceptmappingByid", postdata,{headers: headers});    
  return repos;
}

  //get user details
  updateCardDetails(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { email: data.email,card_token: data.card_token,cart_source: data.cart_source};
    const repos = this.http.post(this.commonServ.apiURL + "update_card", postdata,{headers: headers});    
    return repos;
  }
  //get user details
  getallusers(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { role: data.role,searchinput: data.searchinput};
    const repos = this.http.post(this.commonServ.apiURL + "getallusers", postdata,{headers: headers});    
    return repos;
  }
  // Get user partner search
  fngetkeyconcepts(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = {partner_id: data.partner_id,active_status: data.filterstatus,filterlevel: data.filterlevel,uemail: data.uemail};
    const repos = this.http.post(this.commonServ.apiURL + "getkeyconcepts?page=" +data.page, postdata,{headers: headers});    
    return repos;
  }
  fncreupkeyconcepts(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { display_status: data.display_status,media_source: data.media_source,etitle: data.etitle,short_description: data.short_description,level: data.level,active_status: data.active_status,wsgid: data.wsgid,partner_id: data.partner_id,email: data.uemail};
    const repos = this.http.post(this.commonServ.apiURL + "creupkeyconcepts", postdata,{headers: headers});    
    return repos;
  }
  fndeletkeyconceptsbyid(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { eventid: data.eventid};
    const repos = this.http.post(this.commonServ.apiURL + "deletkeyconceptsbyid", postdata,{headers: headers});    
    return repos;
  }
  fngetkeyconceptdetailsbyid(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = {active_status: data.filterstatus,spwsgroupid: data.event_groupid,uemail: data.uemail};
    const repos = this.http.post(this.commonServ.apiURL + "getkeyconceptdetailsbyid", postdata,{headers: headers});    
    return repos;
  }
  fncupdatekeyconoptions(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { uemail: data.uemail,display_status: data.display_status,short_description: data.short_description,media_source: data.media_source,event_title: data.event_title,spleventid: data.spleventid,event_groupid: data.event_groupid,active_status: data.active_status};
    const repos = this.http.post(this.commonServ.apiURL + "cupdatekeyconoptions", postdata,{headers: headers});    
    return repos;
  }
  fndelkeyconceptoptionsbyid(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { eventid: data.eventid};
    const repos = this.http.post(this.commonServ.apiURL + "delkeyconceptoptionsbyid", postdata,{headers: headers});    
    return repos;
  }
   //get bookings history
   fngetclasspackshistory(data){
    var headers = new HttpHeaders();       
    headers.append('content-type','application/json');
    let postdata = { email: data.email,bsource: data.bsource};
    const repos = this.http.post(this.commonServ.apiURL + "getclasspackshistory", postdata,{headers: headers});    
    return repos;
  }
    //to update user level
   fncreateguestpass(data){ 
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { name: data.guest_name,user_email: data.guest_email,slot: data.date,cart_source: data.cartsource_flag,subs_email:data.uemail};
      const repos = this.http.post(this.commonServ.apiURL + "createguestpass", postdata,{headers: headers});    
      return repos;
    }
}
