import { Component } from '@angular/core';

@Component({
  selector: 'weight-journal-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedin = false;
  title = 'weight-journal-ui';
}
