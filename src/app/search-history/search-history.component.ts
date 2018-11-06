import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  queries: Observable<String[]>;

  constructor(public historyService: HistoryService) { }

  ngOnInit() {
    this.queries = this.historyService.queries;
  }

  onClearClick(): void {
    this.historyService.clearHistory();
  }

}
