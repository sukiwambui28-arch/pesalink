// pesalink-frontend/src/app/features/transactions/transfer-modal/transfer-modal.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.scss']
})
export class TransferModalComponent {
  transferForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<TransferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { senderId: number } // Data passed into the dialog
  ) {
    this.transferForm = this.fb.group({
      receiverAccountNumber: ['', [Validators.required, Validators.pattern(/^ACC\d{3}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const transferData = {
      senderId: this.data.senderId,
      ...this.transferForm.value
    };

    this.transactionService.transferMoney(transferData).subscribe({
      next: (response:any) => {
        this.isLoading = false;
        // Close the dialog and pass the receipt data back
        this.dialogRef.close({ success: true, receipt: response.receipt });
      },
      error: (err:any) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'An unknown error occurred.';
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}