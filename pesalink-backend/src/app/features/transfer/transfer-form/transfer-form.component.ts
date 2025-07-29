import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '@core/services/transfer.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
  standalone: true,
  imports: []
})
export class TransferFormComponent {
  transferForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private transferService: TransferService) {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.transferForm.valid) {
      this.transferService.sendMoney(this.transferForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'Transfer successful!';
          this.errorMessage = '';
          this.transferForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Transfer failed.';
          this.successMessage = '';
        }
      });
    }
  }
}
