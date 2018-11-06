import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, scan, publishReplay, refCount } from 'rxjs/operators';
import { WikipediaService } from './wikipedia.service';
import { GiphyService } from './giphy.service';

const initialQueries: String[] = [];

type QueriesOperation = (queries: String[]) => String[];

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  latestQuery: Subject<String> = new Subject<String>();
  queries: Observable<String[]>;

  // Operations
  updates: Subject<any> = new Subject<any>();

  // Action Streams
  addToQueries: Subject<String> = new Subject<String>();
  clearQueries: Subject<any> = new Subject<any>();

  constructor(public wikipediaService: WikipediaService,
              public giphyService: GiphyService) {
    this.queries = this.updates.pipe(
      scan((queries: String[], operation: QueriesOperation) => {
        return operation(queries);
      }, initialQueries),
      publishReplay(1),
      refCount()
    );

    // Make this 'hot'
    this.queries.subscribe(x => {});

    this.addToQueries.pipe(
      map(function(query: String): QueriesOperation {
        return (queries: String[]) => {
          const newQueries: String[] = queries.concat(query);
          return newQueries;
        };
      })
    ).subscribe(this.updates);

    this.latestQuery.subscribe(this.addToQueries);

    this.clearQueries.pipe(
      map(function(): QueriesOperation {
        return (queries: String[]) => {
          return [];
        };
      })
    ).subscribe(this.updates);
  }

  submitSearch(query: String): void {
    this.latestQuery.next(query);
    this.wikipediaService.submitWikiSearch(query);
    this.giphyService.submitGiphySearch(query);
  }

  clearHistory(): void {
    this.clearQueries.next();
  }
}
