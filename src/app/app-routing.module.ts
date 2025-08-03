/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Event Booking App Template
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2021-present initappz.
*/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'myaccount',
    loadChildren: () => import('./pages/myaccount/myaccount.module').then( m => m.MyaccountPageModule)
  }, 
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },  
  {
    path: 'my-event',
    loadChildren: () => import('./pages/my-event/my-event.module').then(m => m.MyEventPageModule)
  },
  {
    path: 'event-around',
    loadChildren: () => import('./pages/event-around/event-around.module').then(m => m.EventAroundPageModule)
  },
  {
    path: 'my-calendar',
    loadChildren: () => import('./pages/my-calendar/my-calendar.module').then(m => m.MyCalendarPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'choose-interest',
    loadChildren: () => import('./pages/choose-interest/choose-interest.module').then(m => m.ChooseInterestPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then(m => m.LocationPageModule)
  },
  {
    path: 'login-congrats',
    loadChildren: () => import('./pages/login-congrats/login-congrats.module').then(m => m.LoginCongratsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'bookmark',
    loadChildren: () => import('./pages/bookmark/bookmark.module').then(m => m.BookmarkPageModule)
  },
  {
    path: 'bookmark-model',
    loadChildren: () => import('./pages/bookmark-model/bookmark-model.module').then(m => m.BookmarkModelPageModule)
  },
  {
    path: 'featured',
    loadChildren: () => import('./pages/featured/featured.module').then(m => m.FeaturedPageModule)
  },
  {
    path: 'trending',
    loadChildren: () => import('./pages/trending/trending.module').then(m => m.TrendingPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'concept-detail',
    loadChildren: () => import('./pages/concept-detail/concept-detail.module').then(m => m.ConceptDetailPageModule)
  },
  {
    path: 'event-joining',
    loadChildren: () => import('./pages/event-joining/event-joining.module').then(m => m.EventJoiningPageModule)
  },
  {
    path: 'discussion',
    loadChildren: () => import('./pages/discussion/discussion.module').then(m => m.DiscussionPageModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./pages/ticket/ticket.module').then(m => m.TicketPageModule)
  },
  {
    path: 'organizer',
    loadChildren: () => import('./pages/organizer/organizer.module').then(m => m.OrganizerPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'new-card',
    loadChildren: () => import('./pages/new-card/new-card.module').then(m => m.NewCardPageModule)
  },
  {
    path: 'payment-ticket',
    loadChildren: () => import('./pages/payment-ticket/payment-ticket.module').then(m => m.PaymentTicketPageModule)
  },
  {
    path: 'documentation',
    loadChildren: () => import('./pages/documentation/documentation.module').then(m => m.DocumentationPageModule)
  },
  {
    path: 'photos',
    loadChildren: () => import('./pages/photos/photos.module').then(m => m.PhotosPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./pages/videos/videos.module').then(m => m.VideosPageModule)
  },
  {
    path: 'add-documentation',
    loadChildren: () => import('./pages/add-documentation/add-documentation.module').then(m => m.AddDocumentationPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./pages/security/security.module').then(m => m.SecurityPageModule)
  },
  {
    path: 'appearance',
    loadChildren: () => import('./pages/appearance/appearance.module').then(m => m.AppearancePageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'invite-friends',
    loadChildren: () => import('./pages/invite-friends/invite-friends.module').then(m => m.InviteFriendsPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./pages/terms-condition/terms-condition.module').then(m => m.TermsConditionPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqPageModule)
  },   {
    path: 'mysubscriptions',
    loadChildren: () => import('./pages/mysubscriptions/mysubscriptions.module').then( m => m.MysubscriptionsPageModule)
  },
  {
    path: 'adminfeatures',
    loadChildren: () => import('./pages/adminfeatures/adminfeatures.module').then( m => m.AdminfeaturesPageModule)
  },
  {
    path: 'showmyqrcode',
    loadChildren: () => import('./pages/showmyqrcode/showmyqrcode.module').then( m => m.ShowmyqrcodePageModule)
  },
  {
    path: 'deleteacrequest',
    loadChildren: () => import('./pages/deleteacrequest/deleteacrequest.module').then( m => m.DeleteacrequestPageModule)
  },
  {
    path: 'courselist',
    loadChildren: () => import('./pages/courselist/courselist.module').then( m => m.CourselistPageModule)
  },
  {
    path: 'weeklyschedule',
    loadChildren: () => import('./pages/weeklyschedule/weeklyschedule.module').then( m => m.WeeklyschedulePageModule)
  },
  {
    path: 'specialevents',
    loadChildren: () => import('./pages/specialevents/specialevents.module').then( m => m.SpecialeventsPageModule)
  },
  {
    path: 'specialworkshops',
    loadChildren: () => import('./pages/specialworkshops/specialworkshops.module').then( m => m.SpecialworkshopsPageModule)
  },
  {
    path: 'tasubcriptions',
    loadChildren: () => import('./pages/tasubcriptions/tasubcriptions.module').then( m => m.TasubcriptionsPageModule)
  },
  {
    path: 'classlist',
    loadChildren: () => import('./pages/classlist/classlist.module').then( m => m.ClasslistPageModule)
  },
  {
    path: 'tcourses',
    loadChildren: () => import('./pages/tcourses/tcourses.module').then( m => m.TcoursesPageModule)
  },
  {
    path: 'subcriptionlist',
    loadChildren: () => import('./pages/subcriptionlist/subcriptionlist.module').then( m => m.SubcriptionlistPageModule)
  },
  {
    path: 'tangosubscriptions',
    loadChildren: () => import('./pages/tangosubscriptions/tangosubscriptions.module').then( m => m.TangosubscriptionsPageModule)
  }, 
  {
    path: 'ourclasses',
    loadChildren: () => import('./pages/ourclasses/ourclasses.module').then( m => m.OurclassesPageModule)
  },  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkoutuser',
    loadChildren: () => import('./pages/checkoutuser/checkoutuser.module').then( m => m.CheckoutuserPageModule)
  },
  {
    path: 'bookingconfirm',
    loadChildren: () => import('./pages/bookingconfirm/bookingconfirm.module').then( m => m.BookingconfirmPageModule)
  },
  {
    path: 'tangoevents',
    loadChildren: () => import('./pages/tangoevents/tangoevents.module').then( m => m.TangoeventsPageModule)
  },
  {
    path: 'eventlist',
    loadChildren: () => import('./pages/eventlist/eventlist.module').then( m => m.EventlistPageModule)
  },
  {
    path: 'workshoplist',
    loadChildren: () => import('./pages/workshoplist/workshoplist.module').then( m => m.WorkshoplistPageModule)
  },
  {
    path: 'meventdetails',
    loadChildren: () => import('./pages/meventdetails/meventdetails.module').then( m => m.MeventdetailsPageModule)
  },
  {
    path: 'mevents',
    loadChildren: () => import('./pages/mevents/mevents.module').then( m => m.MeventsPageModule)
  },
  {
    path: 'additionalattendee',
    loadChildren: () => import('./pages/additionalattendee/additionalattendee.module').then( m => m.AdditionalattendeePageModule)
  },
  {
    path: 'filtermodel',
    loadChildren: () => import('./pages/filtermodel/filtermodel.module').then( m => m.FiltermodelPageModule)
  },
  {
    path: 'workshopitems',
    loadChildren: () => import('./pages/workshopitems/workshopitems.module').then( m => m.WorkshopitemsPageModule)
  },
  {
    path: 'notificationview',
    loadChildren: () => import('./pages/notificationview/notificationview.module').then( m => m.NotificationviewPageModule)
  },
  {
    path: 'contents',
    loadChildren: () => import('./pages/contents/contents.module').then( m => m.ContentsPageModule)
  },
  {
    path: 'mylevel',
    loadChildren: () => import('./pages/mylevel/mylevel.module').then( m => m.MylevelPageModule)
  },
  {
    path: 'bookinghistory',
    loadChildren: () => import('./pages/bookinghistory/bookinghistory.module').then( m => m.BookinghistoryPageModule)
  },
  {
    path: 'attendanceqr',
    loadChildren: () => import('./pages/attendanceqr/attendanceqr.module').then( m => m.AttendanceqrPageModule)
  },
  {
    path: 'usersubscriptionlist',
    loadChildren: () => import('./pages/usersubscriptionlist/usersubscriptionlist.module').then( m => m.UsersubscriptionlistPageModule)
  },
  {
    path: 'partnersearch',
    loadChildren: () => import('./pages/partnersearch/partnersearch.module').then( m => m.PartnersearchPageModule)
  },
  {
    path: 'keyconcepts',
    loadChildren: () => import('./pages/keyconcepts/keyconcepts.module').then( m => m.PartnersearchPageModule)
  },
  {
    path: 'cardupdate',
    loadChildren: () => import('./pages/cardupdate/cardupdate.module').then( m => m.CardupdatePageModule)
  },
  {
    path: 'managekeyconcepts',
    loadChildren: () => import('./pages/managekeyconcepts/managekeyconcepts.module').then( m => m.PartnersearchPageModule)
  },
  {
    path: 'managekeymapping',
    loadChildren: () => import('./pages/managekeymapping/managekeymapping.module').then( m => m.PartnersearchPageModule)
  },
  {
    path: 'managekeyoptionmapping',
    loadChildren: () => import('./pages/managekeyoptionmapping/managekeyoptionmapping.module').then( m => m.PartnersearchPageModule)
  },
  {
    path: 'classpack',
    loadChildren: () => import('./pages/classpack/classpack.module').then( m => m.ClasspackPageModule)
  },
  {
    path: 'manageguestpass',
    loadChildren: () => import('./pages/manageguestpass/manageguestpass.module').then( m => m.GuestpassPageModule)
  },
  {
    path: 'tangotripslist',
    loadChildren: () => import('./pages/tangotripslist/tangotripslist.module').then( m => m.TangotripslistPageModule)
  },
  {
    path: 'tangotripsitems',
    loadChildren: () => import('./pages/tangotripsitems/tangotripsitems.module').then( m => m.TangotripsitemsPageModule)
  }
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }