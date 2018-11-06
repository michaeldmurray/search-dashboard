import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

type SearchOperation = (query: String) => String;

export interface WikiResult {
  title: String;
  snippet: String;
  // wordcount: number;
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  static BASE_URL = '//en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json' +
    '&origin=*&srlimit=20&srsearch=';

  rawResults: Subject<any> = new Subject<any>();
  cleanResults: Observable<WikiResult[]> = new Observable<WikiResult[]>();

  constructor(private http: HttpClient) {
    this.cleanResults = this.rawResults.pipe(
      map(response => {
        return response['query']['search'];
      }),
      publishReplay(1),
      refCount()
    );

    // make this 'hot'
    this.cleanResults.subscribe(x => x);
  }

  private getResults(query: String): void {
    this.http.get(WikipediaService.BASE_URL + query)
    .subscribe(x => this.rawResults.next(x));
    // if you subscribe rawResults here, it will be 'completed' by the httpclient
  }

  submitWikiSearch(query: String): void {
    this.getResults(query);
  }
}
