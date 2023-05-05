import { ProfileComponent } from './../../components/contents/profile/profile.component';
import { ContactComponent } from './../../components/contact/contact.component';
import { PetsAiComponent } from './../../components/contents/pets-ai/pets-ai.component';
import { ListCardComponent } from './../../components/contents/list-card/list-card.component';
import { AuthGuard } from './../../services/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { HomeComponent } from '../../components/contents/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'list-card', component: ListCardComponent },
      { path: 'ai-for-pets', component: PetsAiComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile/:id', component: ProfileComponent },
    ],
  },

  // canActivate: [AuthGuard],
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardLayoutRoutingModule {}
