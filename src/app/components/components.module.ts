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
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './contents/profile/profile.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlowerAiComponent } from './contents/Flower-ai/Flower-ai.component';
import { ListFriendSideBarComponent } from './list-friend-sidebar/list-friend-sidebar.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

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
    FlowerAiComponent,
    ContactComponent,
    ProfileComponent,
    ListFriendSideBarComponent,
    ChatRoomComponent,
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
    ListFriendSideBarComponent,
    ChatRoomComponent,
  ],
})
export class ComponentsModule { }
