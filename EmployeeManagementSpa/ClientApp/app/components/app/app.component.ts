import { Component } from '@angular/core';
import './rxjs.operators';// Add the RxJS Observable operators
import { HandleErrorService } from './handle-error.service';
import { ExtractDataService } from './extract-data.service';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    providers: [HandleErrorService, ExtractDataService],
})
export class AppComponent {
    
}
