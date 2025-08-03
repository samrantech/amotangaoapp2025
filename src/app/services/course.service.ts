import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    public http: HttpClient,
    public commonServ: CommonService
  ) { 

  }

    //get class details by level
    getClassdetails(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        course_dept: data.course_dept,
        course_subject: data.course_subject,
        course_level: data.course_level,
        course_partner: data.course_partner,      
      };
      const repos = this.http.post(this.commonServ.apiURL + "getclasssesbycgroup", postdata,{headers: headers});    
      return repos;
    }


       //get class details by level
       getcourseconfigdata(data){
        var headers = new HttpHeaders();       
        headers.append('content-type','application/json');
        let postdata = {         
          course_level: data.course_level,
          partner_id: data.partner_id,  
          location_id: data.location_id,           
        };
        const repos = this.http.post(this.commonServ.apiURL + "getcourseconfigbylevel", postdata,{headers: headers});    
        return repos;
      }

      //get subcription list
      getsubscriptionlist(data){
        var headers = new HttpHeaders();       
        headers.append('content-type','application/json');
        let postdata = {         
          partner_id: data.partner_id,
          level: data.level,  
          location_id: data.location_id,         
        };
        const repos = this.http.post(this.commonServ.apiURL + "getsubplanbyfilter", postdata,{headers: headers});    
        return repos;
      }


      //get class list customefileter
      getclasslistbycustom(data){
        var headers = new HttpHeaders();       
        headers.append('content-type','application/json');
        let postdata = {         
          filterdate: data.filterdate,
          rflag: data.rflag,
          course_level: data.course_level,
          course_location: data.course_location,
          course_partner: data.course_partner
        };
        const repos = this.http.post(this.commonServ.apiURL + "getclassbyfilter", postdata,{headers: headers});    
        return repos;
      }


    //get class details by level
    getcourselist(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        course_dept: data.course_dept,
        course_subject: data.course_subject,
        course_level: data.course_level,
        course_partner: data.course_partner,
        course_title: data.course_title,      
      };
      const repos = this.http.post(this.commonServ.apiURL + "getcoursesbycgroup", postdata,{headers: headers});    
      return repos;
    }


    //get page content by slug
    getpagecontentbyslug(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        page_slug: data.page_slug, 
        partner_id: data.partner_id,
        location_id: data.location_id,         
      };
      const repos = this.http.post(this.commonServ.apiURL + "getcoursepagebyslug", postdata,{headers: headers});    
      return repos;
    }


     //get menu list by menu slug
     getmenlistbyslug(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        menu_slug: data.menu_slug,   
        partner_id: data.partner_id,
        location_id: data.location_id,       
      };
      const repos = this.http.post(this.commonServ.apiURL + "getmenulistbyslug", postdata,{headers: headers});    
      return repos;
    }

     //get menu list by menu slug
     gettangotrips(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        active_status: data.active_status, 
        partner_id: data.partner_id,                     
      };
      const repos = this.http.post(this.commonServ.apiURL + "gettangotrips", postdata,{headers: headers});    
      return repos;
    }

    //get events by template

    getEventsByTemplateId(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        active_status: data.active_status,   
        date_flag: data.date_flag,
        event_template: data.event_template,       
      };
      const repos = this.http.post(this.commonServ.apiURL + "getsevents", postdata,{headers: headers});    
      return repos;
    }

    getEventItemsById(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        active_status: data.active_status,   
        spwsgroupid: data.spwsgroupid,           
      };
      const repos = this.http.post(this.commonServ.apiURL + "geteventitems", postdata,{headers: headers});    
      return repos;
    }


    getWeeklyScheduleList(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        filterdate: data.filterdate,   
        rflag: data.rflag, 
        course_level: data.course_level,
        course_location: data.course_location,
        course_partner: data.course_partner,          
      };
      const repos = this.http.post(this.commonServ.apiURL + "getclasssesbyweek", postdata,{headers: headers});    
      return repos;
    }


    getWorkShopGroupList(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        active_status: data.active_status, 
        partner_id: data.partner_id,                     
      };
      const repos = this.http.post(this.commonServ.apiURL + "getswgroups", postdata,{headers: headers});    
      return repos;
    }

    getWorkshopItemsById(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        spwsgroupid: data.spwsgroupid,                           
      };
      const repos = this.http.post(this.commonServ.apiURL + "getworkshopitems", postdata,{headers: headers});    
      return repos;
    }

    getTangotripsItemsById(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        spwsgroupid: data.spwsgroupid,                           
      };
      const repos = this.http.post(this.commonServ.apiURL + "gettangotripdetailsbyid", postdata,{headers: headers});    
      return repos;
    }


    getNoficitionList(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        user_email: data.user_email, 
        partner_id: data.partner_id,                     
      };
      const repos = this.http.post(this.commonServ.apiURL + "getnotificationlists", postdata,{headers: headers});    
      return repos;
    }

    getNoficationCount(data){
      var headers = new HttpHeaders();       
      headers.append('content-type','application/json');
      let postdata = { 
        user_email: data.user_email, 
        partner_id: data.partner_id,                     
      };
      const repos = this.http.post(this.commonServ.apiURL + "getnotificationcount", postdata,{headers: headers});    
      return repos;
    }




}
