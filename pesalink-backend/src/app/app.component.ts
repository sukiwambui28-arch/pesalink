// pesalink-frontend/src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule], 
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pesalink-frontend';
}
