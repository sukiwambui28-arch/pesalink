// pesalink-frontend/src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private snackBar: MatSnackBar) { }


  /**
   * Displays a notification message.
   * @param message The message to display.
   * @param action The label for the action button (e.g., 'Close').
   * @param duration Duration in milliseconds.
   */
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }


  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}