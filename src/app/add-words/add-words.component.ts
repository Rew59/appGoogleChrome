import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm }                 from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
    
    let th = this;
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      
      chrome.tabs.connect(tabs[0].id).onMessage.addListener(
        (msg)=> {
          //console.log(this);
          if(msg["nameWord"] && msg["nameWord"] !== ""){
            
            console.log(msg["nameWord"]);
            th.nameWord = msg["nameWord"];
            th.onKey();
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
    

    this.AuthService.user.subscribe(
      (user)=>{
        if(user != null){
          this.BdReadAndWriteService.getWords(this.paramUrl);
        }
      }
    );

  }

  addWord(nameWord,translationWord,paramUrl){
    const result = this.BdReadAndWriteService.addWord(nameWord,translationWord,paramUrl);
    if(result){
      this.translationWord = "";
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
