import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdInputModule, 
  MdButtonModule, 
  MdGridListModule,
  MdProgressSpinnerModule, 
  MdCardModule,
  MdListModule,
  MdIconModule,
  MdToolbarModule,
  MdTabsModule
} from '@angular/material';

// New imports to update based on AngularFire2 version 4
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { FormAuthComponent } from './form-auth/form-auth.component';
import { AddThemesWordsComponent } from './add-themes-words/add-themes-words.component';
import { AddWordsComponent } from './add-words/add-words.component';

//Загрузка сервисов
import { AuthService } from './auth.service';
import { BdReadAndWriteService } from './bd-read-and-write.service';
import { TextSelectionService } from './text-selection.service';
import { AddChromeStorageNavigateService } from './add-chrome-storage-navigate.service';
import { TranslationWordsPipe } from './translation-words.pipe';

const appRoutes: Routes = [
  { path: 'login', component: FormAuthComponent },
  { path: 'addthemes', component: AddThemesWordsComponent },
  { path: 'addthemes/:id', component: AddWordsComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }/*,
  { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    FormAuthComponent,
    AddThemesWordsComponent,
    AddWordsComponent,
    TranslationWordsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,

    MdInputModule,
    MdButtonModule,
    MdGridListModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdListModule,
    MdIconModule,
    MdToolbarModule,
    MdTabsModule,

    AngularFireModule.initializeApp(environment.firebase,'myApp'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    AuthService,
    BdReadAndWriteService,
    TextSelectionService,
    AddChromeStorageNavigateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
