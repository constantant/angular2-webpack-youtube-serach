import {Injectable, Inject} from '@angular/core'
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Rx';

const YOUTUBE_API_KEY:string = "AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk";
const YOUTUBE_API_URL:string = "https://www.googleapis.com/youtube/v3/search";

export class SearchResult {
    id:string;
    title:string;
    description:string;
    thumbnailUrl:string;
    videoUrl:string;

    constructor(obj?:any) {
        this.id = obj.id || null;
        this.title = obj.title || null;
        this.description = obj.description || null;
        this.thumbnailUrl = obj.thumbnailUrl || null;
        this.videoUrl = obj.videoUrl || `https://www.youtube.com/watch?v=${this.id}`;
    }
}

@Injectable()
export class YouTubeService {
    public http:Http;
    private apiKey:string = YOUTUBE_API_KEY;
    private apiUrl:string = YOUTUBE_API_URL;

    constructor(@Inject(Http) http:Http) {
        this.http = http;
    }

    search(query:string):Observable<SearchResult[]> {
        let params:string = [
            `q=${query}`, `key=${this.apiKey}`, `part=snippet`, `type=video`, `maxResults=10`
        ].join('&');
        let queryUrl:string = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl)
            .map((response:Response) => {
                return (<any>response.json()).items.map((item:any) => {
                    return new SearchResult({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url
                    });
                });
            });
    }
}