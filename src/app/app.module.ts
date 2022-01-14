import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ReadPdfService} from './services/read-pdf.service';
import {ParsePdfTextService} from './services/parse-pdf-text.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from './services/api.service';
import {ReceiptTableComponent} from './components/receipt-table/receipt-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

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
    MatButtonModule
  ],
  providers: [ReadPdfService, ParsePdfTextService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
