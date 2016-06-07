import {Component} from '@angular/core'
import {SearchResult} from '../youtube.service'

let template = require('./display.component.html');
let style = require('./display.component.css');

@Component({
    selector: 'search-result',
    template: template,
    styles: [style],
    inputs: ['result']
})
export class SearchResultComponent {
    result:SearchResult;
}