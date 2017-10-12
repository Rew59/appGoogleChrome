import { Injectable } from '@angular/core';

//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import 'rxjs/add/operator/filter';

@Injectable()
export class AuthService {

  isLoggedIn: Boolean;



  //getUser: Observable<firebase.User>;
  currentUser: firebase.User;
  user_id: String;
  /*user_email: String;
  user_id: String;*/
  
  //userAuth: firebase.auth.Auth; //Ссылка на глобальный объект аутентификации
  public user: Observable<firebase.User>; //Ссылка на юзера
  /*resultAuthUser:boolean; //Авторизован ли пользователь?
  email;
  uId;*/
  
  constructor(public afAuth: AngularFireAuth, private router: Router/*, db: AngularFireDatabase*/) {
    this.user = this.afAuth.authState;
    
    

    /*chrome.storage.sync.set({'navigate': this.router.url}, function() {
      // Notify that we saved.
      console.log('Settings saved');
    });
    chrome.storage.sync.get(
      (val)=>console.log(val)
    );*/
    

    this.afAuth.authState.subscribe(
      (user: firebase.User) => {
        if(user){
          this.isLoggedIn = true;
          
          chrome.storage.sync.get(
            (val)=>{
              if(val.navigate && val.navigate !== this.router.url){
                console.log('Сработал переход по '+val.navigate);
                this.router.navigate([val.navigate]);
              }
            }
          );

        } else{
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        }
      }

    );

    /*this.user = afAuth.authState;
    this.user.subscribe(
      (val)=>{
        this.user_id = val.uid;
      }
    ); */
    //this.getUser = afAuth.authState;
    //console.log(this.user_id);
    /*if(this.user_id){
    
    }else {
      this.getUserInfo();console.log(this.user_id);
    }*/
    
    /*this.afAuth.auth.onAuthStateChanged((user) =>{ //Получение текущего пользователя
      if (user) {
        this.user_id = user.uid;
        console.log("Пользователь авторизован");//console.log(this.afAuth.auth.currentUser.email);
      }else{
        console.log("Пользователь не авторизован");
      }
    });*/
    
    //this.userAuth = afAuth.auth;
    //this.user = this.userAuth.currentUser;

    //console.log(router);
    //console.log(this.getUserSignedIn());
    /*console.log(this.resultAuthUser);
    this.onAuthState();
    console.log(this.resultAuthUser);*/
    /*console.log("Я конструктор сервиса auth");
    
    afAuth.auth.onAuthStateChanged((user) =>{ //Получение текущего пользователя
      if (user) {
        this.isLoggedIn = true;
        this.user_email = user.email;
        this.user_id = user.uid;
        console.log(user);
        // User is signed in.
        //this.router.navigateByUrl('/addthemes'); // Если пользователь авторизован перекидываем его
        router.navigateByUrl('/addthemes');
        console.log("Пользователь авторизован");//console.log(this.afAuth.auth.currentUser.email);
      }else{
        this.isLoggedIn = false;
        this.user_email = '';
        //this.resultAuthUser = false;
        router.navigateByUrl('/login');
        console.log("Пользователь не авторизован");
      }
      
    });*/

  }

  getUserInfo(){
    return this.user.subscribe((user)=>this.user_id = user.uid);
    /*this.afAuth.authState.subscribe(
      (user: firebase.User) => {
        return this.user_id = user.uid;
      }
    );*/
    /*if (this.currentUser) {
      return this.user_id = this.currentUser.uid;
    } else {
      return this.user_id ='';
    }*/
    /*return this.afAuth.auth.onAuthStateChanged((user) =>{ //Получение текущего пользователя
      if (user) {
        //this.isLoggedIn = true;
        this.user_id = user.uid;
        this.router.navigate(['/addthemes']);
        console.log("Пользователь авторизован");//console.log(this.afAuth.auth.currentUser.email);
      }else{
        this.isLoggedIn = false;
        
        this.router.navigate(['/login']);
        console.log("Пользователь не авторизован");
      }
    });*/
  }
  //Получение зарегистрированного пользователя
  /*getUserSignedIn(){
    let user = this.afAuth.auth.currentUser;
   // if (user) {
      // User is signed in.
      //return this.user;
    } else {
      // No user is signed in.
      return false;
    }
  }*/
  
  //Получение данных пользователя
  /*getUserData(){
    if (this.user != null) {
      this.email = this.user.email;
      this.uId = this.user.uid;
      return {
        "email":this.email,
        "uid":this.uId
      }
    }
  }

  //Выход пользователя
  signOut(){
    this.afAuth.auth.signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }*/
  

  /*onAuthState(){
    //console.log(AuthService.prototype.resultAuthUser);
   return this.afAuth.auth.onAuthStateChanged(function(us) {
      if (us) {
        this.resultAuthUser = true;console.log(this.resultAuthUser);
        // User is signed in.
        //this.router.navigateByUrl('/addthemes'); // Если пользователь авторизован перекидываем его
        //console.log("Пользователь авторизован");console.log(this.afAuth.auth.currentUser.email);
      }else{
        this.resultAuthUser = false;
        //console.log("Пользователь не авторизован");
      }
    });
  }*/
  
  login(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(function(error:any) {
      // Вывод ошибок в консоли.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        console.log(errorMessage);
      } else if(errorCode === 'auth/user-disabled'){
        console.log(errorMessage);
      } else if(errorCode === 'auth/user-not-found'){
        console.log(errorMessage);
      } else if(errorCode === 'auth/wrong-password'){
        console.log(errorMessage);
      }
      return false;
    });
  } 

}
