import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/forms/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) {

  }

  public confirm(message: string, action: () => void) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '30em',
      data: {
        message: message,
        action: action
      }
    });
  }
}