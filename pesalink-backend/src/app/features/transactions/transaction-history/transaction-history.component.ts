import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from '../transaction.service';
import { MatPaginator } from '@angular/material/paginator';
import { saveAs } from 'file-saver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';          // For native date support
import { MatDatepickerToggle } from '@angular/material/datepicker';    // Check usage in your component imports
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe, TitleCasePipe } from '@angular/common';   // For pipes and directives


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material modules you use:
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    // Add others as needed...
  ],
  declarations: [
    TransactionHistoryComponent,
    // other components
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    TitleCasePipe
  ]
})
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = false;
  error = '';
  totalTransaction = 100;
  pageSize = 10;

  filters = {
    startDate: '',
    endDate: '',
    type: '',
    sortBy: 'created_at',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  };

  displayedColumns = ['date', 'type', 'amount'];

  // Replace with actual session-based ID later
  accountId = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.loading = true;

    const formattedFilters = {
      ...this.filters,
      startDate: this.filters.startDate ? new Date(this.filters.startDate).toISOString().split('T')[0] : '',
      endDate: this.filters.endDate ? new Date(this.filters.endDate).toISOString().split('T')[0] : ''
    };

    this.transactionService.getTransactions(this.accountId, formattedFilters).subscribe({
      next: (res) => {
        this.transactions = res.data;
        this.totalTransaction = res.total;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load transactions';
        this.loading = false;
      },
    });
  }

  onFilterChange(): void {
    this.filters.page = 1;
    this.fetchTransactions();
  }

  onPageChange(event: any): void {
    this.filters.page = event.pageIndex + 1;
    this.filters.limit = event.pageSize;
    this.fetchTransactions();
  }

  exportToCsv(): void {
    const header = 'Date,Type,Amount\n';
    const rows = this.transactions.map(txn =>
      `${new Date(txn.created_at).toLocaleDateString()},${txn.type},${txn.amount}`
    );
    const csvContent = header + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      // Use saveAs
    saveAs(blob, 'transaction-history.csv');
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transaction-history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
