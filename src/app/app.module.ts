import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from '@path-app/app.component'
import { ComponentsModule } from '@path-app/components/components.module'
import { CommonModule } from '@angular/common'
import { GoogleAnalyticsService } from '@path-services/google-analytics.service'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule, CommonModule],
  providers: [GoogleAnalyticsService, provideExperimentalZonelessChangeDetection()],
  bootstrap: [AppComponent],
})
export class AppModule {}
