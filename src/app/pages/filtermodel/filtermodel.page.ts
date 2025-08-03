import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-filtermodel',
  templateUrl: './filtermodel.page.html',
  styleUrls: ['./filtermodel.page.scss'],
})
export class FiltermodelPage implements OnInit {

  categories = [
    {
      id: '1',
      name: 'All',
      status: '1',
    },
    {
      id: '2',
      name: 'Mon',
      status: '1',
    },
    {
      id: '3',
      name: 'Tue',
      status: '1',
    },
    {
      id: '4',
      name: 'Wed',
      status: '1',
    },
    {
      id: '5',
      name: 'Thu',
      status: '1',
    },
    {
      id: '6',
      name: 'Fri',
      status: '1',
    },
    {
      id: '7',
      name: 'Sat',
      status: '1',
    },
    {
      id: '8',
      name: 'Sun',
      status: '1',
    },
  ];

  public filterData = {
    filterDay: "all",
    filerLevel: "all",
    filterLocation: "all",
    rflag: 'all',    
  }

  public navdata: any;

  public courseData = {
    coursclases: [],
    classcount: 0,
    weekdays: [],
    courselevels: [],
    courselocations: [], 
    nextweekclasses: [],
    thisweekcoures: [],
    thisweekevents: [],
  };

  constructor(
    public modalController: ModalController,
    public router: ActivatedRoute,
    public navParams: NavParams,  
    private alertController: AlertController,
    public loadingController: LoadingController,
    public route: Router,    
  ) { 

    this.navdata = this.navParams.get('courseData');
    if(this.navdata){     
      this.courseData.weekdays = this.navdata.weekdays;
      this.courseData.courselevels =  this.navdata.courselevels;
      this.courseData.courselocations =  this.navdata.courselocations;
      
    }

  }

  ngOnInit() {
  }

  onClose() {
    this.modalController.dismiss(this.filterData);
  }



}
