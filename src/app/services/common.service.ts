import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public apiURL : any;
  public applocalversion = "1.1.3";
  public apiLiveURL : any;

  constructor(
    public http: HttpClient
  ) { 
    //this.apiURL = "https://dev.samrantech.com/tangoapi/public/api/";
   
    //this.apiURL = "http://localhost/tangoapiv3/public/api/";
    //this.apiURL = "http://localhost/tangoapi/public/api/";
    this.apiURL = "https://www.tango-amistoso.co.uk/tangoapi/public/api/";
    this.apiLiveURL = "https://www.tango-amistoso.co.uk/tangoapi/public/api/"
  }

  getappversionupdate() {
    let repos = this.http.get(
      "https://www.tango-amistoso.co.uk/appversion/amotangoupdate.php?rid=" +
        Math.random()
    );
    return repos;
  }
}
