import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TransferFormComponent } from './transfer-form.component';
import { TransferRoutingModule } from './transfer-routing.module';

@NgModule({
  declarations: [TransferFormComponent],
  imports: [CommonModule, ReactiveFormsModule, TransferRoutingModule, TransferFormComponent],
})
export class TransferModule {}
