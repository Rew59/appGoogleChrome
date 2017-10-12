import { Component/*, OnInit, OnDestroy*/ } from '@angular/core';

//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent/* implements OnInit, OnDestroy*/ {
    title = 'Мое Ангуляр приложение!!!';

    /*constructor(private router: Router) {}

    ngOnInit(){
      chrome.storage.sync.get(
        (val)=>{
          if(val.navigate){
            console.log('Сработал переход по '+val.navigate);
            this.router.navigate([val.navigate]);
          }
        }
      );
    }

    ngOnDestroy(){
      chrome.storage.sync.set({'navigate': this.router.url});
    }*/
    
}
