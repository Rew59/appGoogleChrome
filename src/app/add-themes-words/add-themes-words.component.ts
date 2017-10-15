import { Component, OnInit, OnDestroy } from '@angular/core';

//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { BdReadAndWriteService } from '../bd-read-and-write.service';
import { TextSelectionService } from '../text-selection.service';
import { AddChromeStorageNavigateService } from '../add-chrome-storage-navigate.service';

import { Router,NavigationEnd, NavigationStart, CanActivate,ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-add-themes-words',
  templateUrl: './add-themes-words.component.html',
  styleUrls: ['./add-themes-words.component.css']
})

export class AddThemesWordsComponent implements OnInit/*, OnDestroy /*implements CanActivate*/  {
  //subscrEventUrl: Subscription;
  //isInizialSubscrEventUrl:boolean;
  uID;
  //linkDb: FirebaseListObservable<any>;
  user/*: Observable<firebase.User>*/;
  themes;
  //uid;
  

  constructor(private AuthService: AuthService,
    public BdReadAndWriteService:BdReadAndWriteService,
    private router: Router,
    public textSel:TextSelectionService/*,
  public chromeNavigateService:AddChromeStorageNavigateService*/) {
     //this.BdReadAndWriteService.getThemes().subscribe((val)=>console.log(val));
     /*this.AuthService.afAuth.authState.subscribe(
      (user: firebase.User) => {
        return console.log(user);
      }

     );*/
     
     //this.BdReadAndWriteService.themes = this.BdReadAndWriteService.db.list('users/');
     /*this.BdReadAndWriteService.themes.subscribe(
      (val) => this.BdReadAndWriteService.themes = this.BdReadAndWriteService.db.list('users/')
     );*/
     
     /*this.AuthService.afAuth.authState.subscribe(
       val=> console.log(val)
     );
     console.log(this.AuthService);
     console.log(this.AuthService.getUserInfo());
     console.log(this.AuthService.user_id);*/
    //this.AuthService.user.subscribe((val)=>console.log(val.uid));
    
    /*this.AuthService.afAuth.auth.onAuthStateChanged((user) =>{ //Получение текущего пользователя
      if (user) {
        this.uID = user.uid;
        console.log(user.uid);
      }else{
        console.log("Пользователь не авторизован");
      }
    });*/
        
    //console.log(this.BdReadAndWriteService.themes);
    /*this.AuthService.afAuth.authState.subscribe((val)=>
    {
      
        console.log(this.BdReadAndWriteService.themes)
      
    }
    );*/
    /*this.AuthService.afAuth.auth.onAuthStateChanged((user) =>{ //Получение текущего пользователя
      if (user) {
        this.uid = user.uid;
        console.log("Пользователь авторизован");//console.log(this.afAuth.auth.currentUser.email);
      }else{
        console.log("Пользователь не авторизован");
      }
      
    });*/
    /*this.AuthService.afAuth.authState.subscribe(
      (val) => {this.AuthService.getUserInfo();
        console.log(this.AuthService.user_id);
      }
    ); */

    //this.AuthService.getUserInfo();
    //console.log(this.AuthService.user_id);
    //this.BdReadAndWriteService.getUserId();
    //this.themes = BdReadAndWriteService.themes;
    //console.log(this.BdReadAndWriteService.themes);
    /*AuthService.afAuth.authState.subscribe(
      val => {
        console.log(this.BdReadAndWriteService.themes);
      }
    );*/
    /*this.user = afAuth.auth.currentUser;
    if (this.user != null) {
      this.uID = this.user.uid;
    }
    //this.uID = afAuth.auth.currentUser.uid;
    this.linkDb = db.list('users/'+this.uID);*/
  }

  ngOnInit(){
    /*let i = 1;
    this.subscrEventUrl = this.router.events.subscribe((event) => {
      console.log(i++);
    });
    console.log(this.subscrEventUrl);*/
    
      //Отслеживание изменения маршрута router
    /*this.subscrEventUrl =  this.router.events 
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) => {
        
        console.log('This router'+this.router.url);
        // You only receive NavigationStart events
        if(this.router.url){
          chrome.storage.sync.set({'navigate': this.router.url}, () => {
            // Notify that we saved.
            console.log('Запись в storage о изменении пути добавлена: ');
            this.subscrEventUrl.unsubscribe();
             
          });
          console.log("Навигация изменилась"+ this.router.url);
        }
      });*/
    

    this.user = this.AuthService.user.subscribe(
      (us) => {
        if (us != null) {
          this.uID = us.uid;
          //this.themes = this.BdReadAndWriteService.db.list('users/' + this.uID+'/Themes');
          
          this.BdReadAndWriteService.themes = this.BdReadAndWriteService.db.list('users/'+ this.uID + '/themes');
          
          this.BdReadAndWriteService.themes.subscribe(val=>console.log(val));
          console.log(this.BdReadAndWriteService.themes);
        } 
      }
     );

  }

  public ngOnDestroy(){
    //this.subscrEventUrl.unsubscribe();
}

  //Проверка авторизован ли пользователь?
  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if(this.AuthService.isLoggedIn){
      return true;
      
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }*/
  addTheme(nameTheme){
    
    this.BdReadAndWriteService.addTheme(nameTheme);
  }

  start(){
    this.textSel.get_text();
  
  }

  

  stop(){
    this.textSel.stopText();
  }

}
