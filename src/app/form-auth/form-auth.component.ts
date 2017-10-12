import { Component, OnInit } from '@angular/core';
//import {MdInputModule} from '@angular/material';

import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
/*import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';*/

@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.css']
})
export class FormAuthComponent{

    email:String='';
    password:String ='';
  
    //user: Observable<firebase.User>;
  
    constructor(public AuthService: AuthService, private router: Router) {
      
      
      //console.log(AuthService.getUserSignedIn());
      /*this.user = afAuth.authState;
      
      
      afAuth.auth.onAuthStateChanged(function(us) {
        if (us) {
          // User is signed in.
          router.navigateByUrl('/addthemes');
          console.log("Пользователь авторизован");
        }else{
          console.log("Пользователь не авторизован");
        }
      });*/
    }
    /*addItem(){
      this.AuthService.getUserData();
     
    }*/
    ngOnInit(){
      this.AuthService.user.subscribe(
        (user)=>{
          if(user) this.router.navigate(['/addthemes']);
        }
      );
      
      
      /*chrome.storage.sync.get(
        (val)=>console.log(val.navigate+"123")
      );*/
    }

    login(email:string,password:string) {
      //Вход пользователя
      this.AuthService.login(email,password).then((data) => {
        //Проверяем пришла ли ошибка при проверки данных
        if(!data){
          console.log('Ошибка при входе пользователя');
        }else{
          this.router.navigate(['/addthemes']);
        }
      })
    }
      //Создание пользователя
      /*this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(error);
        }
        console.log(error);
      });*/
      //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    

}
