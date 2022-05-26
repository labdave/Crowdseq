import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { DialogsModule } from './shared/components/dialog/dialog.module';
import { MissingPageComponent } from './missing-page/missing-page.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from './shared/services/navigation.service';
import { ThemeSelectionService } from './shared/services/theme-selection.service';
import { AppHeaderService } from './shared/services/app-header.service';
import { AuthService } from './shared/auth/auth.service';
import { PermissionService } from './shared/services/permission.service';
import { AnnotationService } from './annotation/services/annotation.service';
import { SearchService } from './search/services/search.service';
import { GeneService } from './gene/services/gene.service';
import { VariantService } from './variant/services/variant.service';

@NgModule({
  declarations: [
    AppComponent,
    MissingPageComponent
  ],
  imports: [
    BrowserModule,
    DialogsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    AnnotationService,
    AppHeaderService,
    AuthService,
    NavigationService,
    PermissionService,
    SearchService,
    ThemeSelectionService,
    GeneService,
    VariantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
