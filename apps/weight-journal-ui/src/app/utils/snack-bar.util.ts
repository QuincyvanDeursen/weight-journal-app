import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
  })
export class snackBarUtil {

    constructor(private snackBar: MatSnackBar) { 
    }

    openSuccessSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
        });
    }

    openErrorSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
        });
    }

    openWarningSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: ['warning-snackbar'],
        });
    }

    openInfoSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: ['info-snackbar'],
        });
    }
}