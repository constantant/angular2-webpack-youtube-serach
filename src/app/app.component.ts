import {Component, Type, ViewEncapsulation} from '@angular/core';
import {SearchResult, YouTubeService} from './youtube.service'
import {SearchResultComponent} from './display.component'
import {SearchBox} from './box.component'

let template = require('./app.component.html');
let style = require('./app.component.css');

@Component({
    selector: 'youtube-search',
    template: template,
    styles: [style],
    directives: [
        <Type>SearchBox,
        <Type>SearchResultComponent
    ],
    providers:[
        YouTubeService
    ],
    encapsulation: ViewEncapsulation.Native
})
export class YouTubeSearchComponent {
    results:SearchResult[];

    updateResults(results:SearchResult[]):void {
        this.results = results;
    }
}