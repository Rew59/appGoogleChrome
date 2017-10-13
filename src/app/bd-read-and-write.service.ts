import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';
@Injectable()
export class BdReadAndWriteService {
  //usid;
  themes: FirebaseListObservable<any>;
  words: FirebaseListObservable<any>;
  /* Не приходитнормально свойство AuthService.user_id */
  constructor(
    public AuthService: AuthService,
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
  
  ) {
    //console.log("Я конструктор сервиса bdRead");
    
    
    //console.log(this.AuthService.user_id);

    /*var userId = AuthService.afAuth.auth.currentUser.uid;
    this.themes = db.list('users/' + userId);
    
       console.log(this.themes.);/
    */
        
        /*if(!this.usid){
          this.AuthService.afAuth.authState.subscribe(
            (val) =>{
              this.usid = val.uid
            } 
          );
        }
         this.themes = this.db.list('/users'+this.usid);
        
        this.themes.subscribe(
          (val) => console.log(val)
        );*/
    
    
    //this.themes = db.list('users/'/*+AuthService.user_id*/);
    /*this.themes.subscribe(
      val => console.log(val)
    );*/
    /*const themes$ : FirebaseListObservable<any> = db.list('users');
    themes$.subscribe(
      val => console.log(val)
    );*/
  }

  getThemes(){
    return this.themes = this.db.list('/users');
    /*return this.AuthService.user.subscribe(
      (val)=>{
        return this.themes = this.db.list('/users'+val.uid);
      }
    );*/
  }

  /*getUserId(){
    return this.AuthService.user_id;
  }*/

  addTheme(nameTheme){
    let uid = this.AuthService.afAuth.auth.currentUser.uid;
    
    if(uid && nameTheme){
      //let objNode = this.db.object('/users/'+this.AuthService.user_id);
      let listNode = this.db.list('/users/'+uid+'/themes');
      //listNode.set("themes",{ "theme": nameTheme });
      listNode.push({ "theme": nameTheme });
      console.log("Новая тема добавлена");
      return true;
    }else{
      return false;
    }

    //this.db.object('/users');
  }

  addWord(nameWord,translationWord,paramUrl):boolean{
    let uid = this.AuthService.afAuth.auth.currentUser.uid;
    let listNode;
    let flag = 0;

    if(uid && nameWord && translationWord && paramUrl){
      //this.isWordinBd(uid,nameWord,paramUrl);
      let queryObservable = this.db.list('/users/'+uid+'/words/'+paramUrl, {
        query: {
          orderByChild: 'nameWord',
          equalTo: nameWord
        }
      });

      listNode = this.db.list('/users/'+uid+'/words/'+paramUrl);
      
        /*let key = listNode.push({ 'nameWord': nameWord, 'translationWord': translationWord }).key/*.push({ 'translationWord': translationWord })*/;
        //console.log(key);
        
        //.push({ 'translationWord': translationWord });
        
        console.log("Новое слово добавлено");
      queryObservable.subscribe(val=>{
        if(val.length !== 0 && flag === 0){
          listNode = this.db.list('/users/'+uid+'/words/'+paramUrl+'/'+val[0].$key);
          listNode.push({ 'translationWord': translationWord });
          flag = 1;
          return true;
        }else{
        if(flag === 0){
          listNode.push({ 'nameWord': nameWord }).then(
            (val)=>val.push({ 'translationWord': translationWord })
          );
          flag=1;
          } 
        }
        return true;
      });
      return true;
    }else return false;
    
  }

  /*isWordinBd(uid,nameWord,paramUrl){
    let queryObservable = this.db.list('/users/'+uid+'/words/'+paramUrl, {
      query: {
        orderByChild: 'nameWord',
        equalTo: nameWord
      }
    });
    
    queryObservable.subscribe((val)=>{
      //console.log(val);
      if(val.length !== 0) return 'true'; else return 'false';
    });
    
  }*/

  getWords(paramUrl){
    let uid = this.AuthService.afAuth.auth.currentUser.uid;
    

    if(uid && paramUrl){
      this.words = this.db.list('/users/'+uid+'/words/'+paramUrl);
      
        return true;
     /* */

    }else return false;
  }

  deleteWord(key,paramUrl){
    let uid = this.AuthService.afAuth.auth.currentUser.uid;
    
    if(key && paramUrl && uid){
      let words = this.db.list('/users/'+uid+'/words/'+paramUrl+'/'+key).remove();
        
        return true;
     /* */

    }else return false;
  }
  /*updateWord(nameWord,translationWord,paramUrl){
    
  }*/

}
