import { Injectable } from '@angular/core';

import { Router,NavigationEnd } from '@angular/router';

//import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

@Injectable()
export class AddChromeStorageNavigateService {
  //subscrEventUrl: Subscription;

  constructor(private router: Router) { 
    /*this.subscrEventUrl =  */this.router.events 
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      
      console.log('This router'+this.router.url);
      // You only receive NavigationStart events
      if(this.router.url){
        chrome.storage.sync.set({'navigate': this.router.url}, () => {
          // Notify that we saved.
          console.log('Запись в storage о изменении пути добавлена: ');
          //this.subscrEventUrl.unsubscribe();
           
        });
        console.log("Навигация изменилась"+ this.router.url);
      }
    });
  }

}
