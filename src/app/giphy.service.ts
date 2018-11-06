import { Injectable } from '@angular/core';
import { GiphyAPIKey } from 'src/environments/giphyApiKey';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

export interface GiphyResult {
  id: String;
  url: String;
  image_url: String;
}

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  static BASE_URL = 'https://api.giphy.com/v1/gifs/random?api_key=';

  rawResults: Subject<any> = new Subject<any>();
  cleanResults: Observable<GiphyResult> = new Observable<GiphyResult>();

  constructor(private http: HttpClient) {
    this.cleanResults = this.rawResults.pipe(
      map(response => {
        return response['data'];
      }),
      publishReplay(1),
      refCount()
    );

    // make this hot
    this.cleanResults.subscribe(x => x);
  }

  private randomGifUrl(query: String): String {
    return `${GiphyService.BASE_URL}${GiphyAPIKey}&tag=${query}&rating=G`;
  }

  private getResults(query: String): void {
    this.http.get(<string>this.randomGifUrl(query)).subscribe(x => this.rawResults.next(x));
  }

  submitGiphySearch(query: String): void {
    this.getResults(query);
  }
}
