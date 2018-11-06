import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { SearchComponent } from './search/search.component';
import { HistoryService } from './history.service';
import { WikipediaService } from './wikipedia.service';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'search-history', component: SearchHistoryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchHistoryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HistoryService, useClass: HistoryService },
    { provide: WikipediaService, useClass: WikipediaService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
