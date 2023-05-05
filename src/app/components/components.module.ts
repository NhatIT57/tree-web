import { SafePipe } from './../pipes/safe.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './contents/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OutletRightComponent } from './outlet-right/outlet-right.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ListCardComponent } from './contents/list-card/list-card.component';
import { PetsAiComponent } from './contents/pets-ai/pets-ai.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './contents/profile/profile.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    OutletRightComponent,
    SafePipe,
    ListCardComponent,
    PetsAiComponent,
    ContactComponent,
    ProfileComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CarouselModule,
  ],
  providers: [DatePipe],
  exports: [
    SignInComponent,
    HeaderComponent,
    FooterComponent,
    OutletRightComponent,
  ],
})
export class ComponentsModule {}
