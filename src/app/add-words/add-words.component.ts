import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm }                 from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../auth.service';
import { BdReadAndWriteService } from '../bd-read-and-write.service';
import { TextSelectionService } from '../text-selection.service';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {

  paramUrl:String;
  nameWord:String;
  translationWord:String;
  isLoad:boolean;
  isLoadNewWord:boolean;
  //Переменные для загрузки слов и infinite scroll
  uid:string;
  words;
  limit:BehaviorSubject<number> = new BehaviorSubject<number>(10);;
  lastKey:string = '';
  finished:boolean = false;
  isLoadWords:boolean = false;

  constructor(
    private AuthService: AuthService,
    public BdReadAndWriteService:BdReadAndWriteService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private textSel:TextSelectionService,
    private mdIconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer
  ) { //Тело конструктора
    
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      
      chrome.tabs.connect(tabs[0].id).onMessage.addListener(
        (msg)=> {
          //console.log(this);
          if(msg["nameWord"] && msg["nameWord"] !== ""){
            
            console.log(msg["nameWord"]);
            this.nameWord = msg["nameWord"];
            this.onKey();
          }
          
        }
      );
      
    });
    
    /*chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        //this.nameWord = request;
        console.log(request.nameWord);
      });*/
    /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      
      console.log(tabs);
      var port = chrome.tabs.connect(tabs[0].id);
      //port.postMessage({counter: 1});
      port.onMessage.addListener(function getResp(response) {
       console.log(response);
       
        
      });
    });*/

     
    
  }

  ngOnInit() {
    this.mdIconRegistry.addSvgIcon(
      'close',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/close_16px.svg'));
      
    this.route.params.subscribe(params=>
      this.paramUrl = params['id']
    );
    /*this.nameWord = this.textSel.textSelection;
    this.textSel.stopText();*/
    
    this.getWords();
  }
  
  onScroll(){    
    if (!this.finished) {
      this.isLoadWords = true;
      this.limit.next(this.limit.getValue()+10);
    }
  }

  getWords(){
    //if(this.finished) return;
    //console.log(this.AuthService.afAuth.auth.currentUser.uid);
    if(this.paramUrl){
      this.AuthService.user.subscribe(
        user=>{
          this.uid = user.uid;
          
          this.words =this.limit.switchMap(limit=>{
            console.log(limit);
            return this.BdReadAndWriteService.getWords(this.paramUrl, this.uid, this.limit.getValue());
          }
            
          ).map(
            data=>{
              if(data.length > 0){
                let arrWord:Array<any>= data.slice().reverse()
                //data = data.reverse();
                if (arrWord[arrWord.length - 1].$key === this.lastKey) {
                  this.finished = true;
                }else{
                  
                  this.lastKey = arrWord[arrWord.length - 1].$key;
                }
                
                this.isLoadWords = false;
                //console.log(arrWord[arrWord.length - 1].$key);
                return arrWord;
              }
            }
          );
          
        }
      );
      
    }
  }

  addWord(nameWord,translationWord,paramUrl){
    const result = this.BdReadAndWriteService.addWord(nameWord,translationWord,paramUrl);
    if(result){
      this.translationWord = "";
      this.limit.next(this.limit.getValue()+1);
    }
  }

  deleteWord(wordKey,trWordKey){
    let key = wordKey+'/'+trWordKey;
    this.BdReadAndWriteService.deleteWord(key,this.paramUrl);
  }

  onKey() { // without type info
    if(this.nameWord !== ""){
    const body = { "text": this.nameWord, "from": "en", to: "ru" };
    this.isLoad = true;
    this.http
    .post('https://server-tr.wedeploy.io/translate', body, {
      headers: new HttpHeaders().set( "Content-Type", "application/json" ),
    })
    .subscribe(
      // Successful responses call the first callback.
    data => {
      this.isLoad = false;
      this.translationWord = data["text"];
  },
    // Errors will call this callback instead:
    err => {
      console.log('Something went wrong!');
    }
    );   
  }
  }
}
