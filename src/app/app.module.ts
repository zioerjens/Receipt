import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ReadPdfService} from './services/read-pdf.service';
import {ParsePdfTextService} from './services/parse-pdf-text.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationService} from './services/authentication.service';
import {ReceiptTableComponent} from './components/receipt-table/receipt-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from 'ng-gapi';
import credentials from '../../credentials.json';
import {HttpClientModule} from '@angular/common/http';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: credentials.web.client_id,
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: ['https://www.googleapis.com/auth/gmail.readonly'].join(' ')
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReceiptTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    HttpClientModule
  ],
  providers: [ReadPdfService, ParsePdfTextService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
