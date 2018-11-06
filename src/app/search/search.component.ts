import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { WikipediaService } from '../wikipedia.service';
import { Observable } from 'rxjs';
import { WikiResult } from '../wikipedia.service';
import { GiphyResult, GiphyService } from '../giphy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: String;
  wikiResults: Observable<WikiResult[]>;
  giphyResults: Observable<GiphyResult>;

  constructor(public historyService: HistoryService,
              public wikipediaService: WikipediaService,
              public giphyService: GiphyService) { }

  ngOnInit() {
    this.searchText = '';
    this.wikiResults = this.wikipediaService.cleanResults;
    this.giphyResults = this.giphyService.cleanResults;
  }

  onSearch(): void {
    this.historyService.submitSearch(this.searchText);
    this.searchText = '';
  }
}
