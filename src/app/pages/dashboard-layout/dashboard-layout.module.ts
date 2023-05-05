import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutRoutingModule } from './dashboard-layout-routing.module';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { ComponentsModule } from '../../components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    DashboardLayoutRoutingModule,
    FormsModule,
    ComponentsModule,
    CommonModule,
  ],
  exports: [FormsModule],
})
export class DashboardLayoutModule {}
