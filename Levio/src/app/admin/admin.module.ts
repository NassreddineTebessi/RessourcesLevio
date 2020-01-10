import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminControlSidebarComponent } from './admin-control-sidebar/admin-control-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOfferComponent } from './Component/job-offer/job-offer.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule} from 'angular-notifier';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { ApplicationPipe } from './pipes/application.pipe';
import {MatCheckboxModule, MatRadioModule, MatTabsModule} from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ApplicationBackComponent } from './Component/job-offer/application-back/application-back.component';
import { JobOfferDetailsComponent } from './Component/job-offer/application-back/job-offer-details/job-offer-details.component';
import { TestComponent } from './Component/job-offer/application-back/test/test.component';
import { InterviewsComponent } from './Component/job-offer/application-back/interviews/interviews.component';
import { RequestComponent } from './Component/request/request.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ClientComponent } from './Component/client/client.component';
import { ProjectComponent } from './Component/project/project.component';
import { ResourcesComponent } from './Component/resources/resources.component';
import { MandatsComponent } from './Component/mandats/mandats.component';
import { SupportComponent } from './Component/support/support.component';
import { ListRessourcesComponent } from './Component/resources/list-ressources/list-ressources.component';
import { DetailsRessourceComponent } from './Component/resources/details-ressource/details-ressource.component';
import {BrowserModule} from '@angular/platform-browser';
import {FolderComponent} from './Component/job-offer/application-back/folder/folder.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FullCalendarModule} from 'ng-fullcalendar';
import {NgxPaginationModule} from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import { MessageComponent } from './Component/message/message.component';
import {ChatService} from './services/chat.service';
import { ChatComponent } from './Component/chat/chat.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {ButtonModule} from 'primeng/button';
import { FilterTableResourcePipe } from './pipes/filter-table-resource.pipe';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    NotifierModule,
    FilterPipeModule,
    MatTabsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatRadioModule,
    MatCheckboxModule,
    PdfViewerModule,
    FullCalendarModule,
    FullCalendarModule,
    NgxPaginationModule,
    TableModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    ButtonModule
  ],
  declarations: [
    AdminHeaderComponent,
    AdminLeftSideComponent,
    AdminContentComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent,
    AdminComponent,
    JobOfferComponent,
    ApplicationBackComponent,
    JobOfferDetailsComponent,
    TestComponent,
    ApplicationPipe,
    InterviewsComponent,
    RequestComponent,
    DashboardComponent,
    ClientComponent,
    ProjectComponent,
    ResourcesComponent,
    MandatsComponent,
    SupportComponent,
    ListRessourcesComponent,
    DetailsRessourceComponent,
    FolderComponent,
    MessageComponent,
    ChatComponent,
    FilterTableResourcePipe
  ],
  providers: [ChatService],
  exports: [AdminComponent]
})
export class AdminModule { }
