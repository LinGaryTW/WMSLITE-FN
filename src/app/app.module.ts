import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EngineResponseService } from './engine-response.service';
import { SearchingEngineComponent } from './searching-engine/searching-engine.component';
import { SearchingResultComponent } from './searching-result/searching-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchingEngineComponent,
    SearchingResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [EngineResponseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
