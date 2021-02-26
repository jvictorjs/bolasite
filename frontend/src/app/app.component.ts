import { slideInAnimation } from './route-animation';
import { Component } from '@angular/core';

@Component({ // DECORATOR é o @
  selector: 'app-root',
  templateUrl: 'app.component.html',
  animations: [slideInAnimation]
})
export class AppComponent {

}
