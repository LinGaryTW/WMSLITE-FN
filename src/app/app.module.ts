import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EngineResponseService } from './engine-response.service';
import { SearchingEngineComponent } from './searching-engine/searching-engine.component';
import { SearchingResultComponent } from './searching-result/searching-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FocusDirective } from './searching-result/facus'
@NgModule({
  declarations: [
    AppComponent,
    SearchingEngineComponent,
    SearchingResultComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    DragDropModule
  ],
  providers: [EngineResponseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
