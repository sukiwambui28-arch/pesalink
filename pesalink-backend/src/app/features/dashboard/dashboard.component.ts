// pesalink-frontend/src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { DashboardService } from '@core/services/dashboard.service';
import { Observable, finalize } from 'rxjs';
import { DashboardData } from '@core/models/dashboard.model';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {
  isLoading= false;
  dashboardData$:Observable<any>;

  public dashboardData$!: Observable<DashboardData>; // ✅ Correct type and variable name

  // Chart.js configuration
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  public barChartType: ChartType = 'bar';
   
  
  public barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Spending',
        data: [1500, 2300, 1800, 2000, 1700, 2500, 2200],
        backgroundColor: '#42A5F5'
      }
    ]
  };
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardData$ = this.dashboardService.getDashboardData();
  }
  loadDashboardData(): void {
    this.isLoading= true;
    this.dashboardData$= this.dashboardService.getDashboardData().pipe(
      finalize(()=> this.isLoading = false)
    );
  }
   openTransferModal(): void {
    alert('Transfer modal triggered! (You can replace this with a modal component)');
  }
}
