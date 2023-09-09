import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../loginDialog/login-dialog.component';
import { RegisterDialogComponent } from '../registerDialog/register-dialog.component';

@Component({
  selector: 'weight-journal-app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(public dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, { panelClass: 'my-dialog' });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, { panelClass: 'my-dialog' });
  }
}
