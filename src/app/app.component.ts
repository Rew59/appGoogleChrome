import { Component, OnInit/*, OnDestroy*/ } from '@angular/core';

import { AuthService } from './auth.service';
import { ActivatedRoute,Router,NavigationEnd,UrlSegment,UrlTree,UrlSegmentGroup,PRIMARY_OUTLET } from '@angular/router';

import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <md-toolbar color="primary">
    <md-icon class="nav-left-icon" *ngIf="isParamUrlThemes" svgIcon="arrow" routerLink="/addthemes"></md-icon>
    <span  class="nav-text">LearnWords</span>
    <span class="example-spacer"></span>
    <md-icon *ngIf="this.AuthService.isLoggedIn" svgIcon="exit" (click)=signOut()>
    </md-icon>
  </md-toolbar>
  
  <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit/*, OnDestroy*/ {
    //title = 'Мое Ангуляр приложение!!!';
    //paramUrl: Subscription;
    //isParamUrlId:boolean;
    isParamUrlThemes: boolean;

    constructor(private mdIconRegistry: MdIconRegistry,
      private sanitizer: DomSanitizer,
      public AuthService: AuthService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      

    }

    ngOnInit(){
      this.mdIconRegistry.addSvgIcon(
        'exit',
        this.sanitizer.bypassSecurityTrustResourceUrl('assets/exit_18px.svg'));
      this.mdIconRegistry.addSvgIcon(
          'arrow',
          this.sanitizer.bypassSecurityTrustResourceUrl('assets/arrow_18px.svg'));
       
          this.router.events
          .filter(event => event instanceof NavigationEnd)
          .subscribe((event:NavigationEnd)=>{
            const tree: UrlTree = this.router.parseUrl(this.router.url);
            const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
            const s: UrlSegment[] = g.segments;
            s[0].path; // returns 'team'
            s[0].parameters; // returns {id: 33}
            if(s[1]){
              this.isParamUrlThemes = true;
            }else{
              this.isParamUrlThemes = false;
            }    
          });
        
      /*chrome.storage.sync.get(
        (val)=>{
          if(val.navigate){
            console.log('Сработал переход по '+val.navigate);
            this.router.navigate([val.navigate]);
          }
        }
      );*/
    }

    signOut(){
      this.AuthService.signOut();
    }


    /*ngOnDestroy(){
      chrome.storage.sync.set({'navigate': this.router.url});
    }*/
    
}
