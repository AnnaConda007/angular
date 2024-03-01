import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RouterOutlet } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AddPageComponent,
    DashboardComponent,
    OrderPageComponent,
    EditPageComponent,
    LoginPageComponent,
  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'add', component: AddPageComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'product/:id/edit', component: EditPageComponent },
          { path: 'order', component: OrderPageComponent },
        ],
      },
    ]),
  ],
  exports: [],
})
export class AdminModule {}
