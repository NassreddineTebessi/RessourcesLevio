import { AdminModule } from './admin/admin.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { routing } from './app-routing/app-routing.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ChatService} from './admin/services/chat.service';
import { LoginComponent } from './login/login.component';
import { AcceuilComponent } from './front/acceuil/acceuil.component';
import { HeaderComponent } from './front/header/header.component';
import { FooterComponent } from './front/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AcceuilComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    AdminModule,
    NgxPaginationModule,
    RouterModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
