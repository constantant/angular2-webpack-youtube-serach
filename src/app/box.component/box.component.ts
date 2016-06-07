import {Component, EventEmitter, OnInit, ElementRef, Inject} from '@angular/core'
import {SearchResult, YouTubeService} from '../youtube.service'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';

let template = require('./box.component.html');
let style = require('./box.component.css');

@Component({
    selector: 'search-box',
    template: template,
    styles: [style],
    outputs: ['loading', 'results']
})
export class SearchBox implements OnInit {
    public loading:EventEmitter < boolean > = new EventEmitter<boolean>();
    public results:EventEmitter < SearchResult[] > = new EventEmitter<SearchResult[]>();
    public youtube:YouTubeService;
    private el:ElementRef;

    constructor(@Inject(YouTubeService) youtube:YouTubeService, @Inject(ElementRef) el:ElementRef) {
        this.youtube = youtube;
        this.el = el;
    }

    ngOnInit():void {
        Observable.fromEvent(this.el.nativeElement, 'input')
            .map((e:any) => e.target.value)
            .filter((text:string) => {

                return text.length > 1
            })
            .debounceTime(400)
            .do(() => this.loading.emit(true))
            .map((query:string) => {
                let youtube = <any>this.youtube;
                return youtube.search(query)
            })
            .switch()
            .subscribe(
                (results:SearchResult[]) => {
                    this.loading.emit(false);
                    this.results.emit(results);
                },
                (err:any) => {
                    console.log(err);
                    this.loading.emit(false);
                },
                () => { // on completion
                    this.loading.emit(false);
                }
            );

    }
}