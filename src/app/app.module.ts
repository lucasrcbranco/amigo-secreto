import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './modules/components/main/main.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
