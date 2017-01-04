import { Component } from '@angular/core';
// Add the RxJS Observable operators.
import './rxjs.operators';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')]
})
export class AppComponent {
}
