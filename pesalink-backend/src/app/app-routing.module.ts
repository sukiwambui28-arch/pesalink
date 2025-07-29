import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users', 
    loadChildren: () =>
       import('./features/users/users.module').then(m => m.UsersModule)
   }, 
  { path: 'dashboard', 
    loadChildren: () => 
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
 { path: 'transfer',
   loadChildren: () => 
    import('./features/transfer/transfer.module').then(m => m.TransferModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
