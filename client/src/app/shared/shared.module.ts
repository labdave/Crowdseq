import { LoadingOverlayModule } from './directives/loading-overlay/loading-overlay.module';
import { CapsLockDirective } from './directives/caps-lock.directive';
import { LoadingOverlayDirective } from './directives/loading-overlay/loading-overlay.directive';
import { PipeModule } from './pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { AnnotationDialogComponent } from '../annotation/components/annotation-dialog/annotation-dialog.component';
import { AnnotationSelectorComponent } from '../annotation/components/annotation-selector/annotation-selector.component';
import { LolliplotViewerComponent } from '../annotation/components/lolliplot-viewer/lolliplot-viewer.component';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';
import { TranscriptCardComponent } from '../transcript/components/transcript-card/transcript-card.component';
import { VariantCardComponent } from '../variant/components/variant-card/variant-card.component';
import { VariantListComponent } from '../variant/components/variant-list/variant-list.component';
import { TranscriptListComponent } from '../transcript/components/transcript-list/transcript-list.component';
import { GeneCardComponent } from '../gene/components/gene-card/gene-card.component';
import { AnnovarCardComponent } from '../annotation/components/annovar-card/annovar-card.component';
import { AminoacidCardComponent } from '../aa-change/components/aminoacid-card/aminoacid-card.component';
import { AminoacidListComponent } from '../aa-change/components/aminoacid-list/aminoacid-list.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    LoadingOverlayModule,
    PipeModule,
    ReactiveFormsModule,
    // material modules
    MatBadgeModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatAutocompleteModule
  ],
  declarations: [
    CapsLockDirective,
    LoadingOverlayDirective,
    AnnovarCardComponent,
    AnnotationDialogComponent,
    AnnotationSelectorComponent,
    LolliplotViewerComponent,
    FeedbackDialogComponent,
    TranscriptCardComponent,
    VariantCardComponent,
    GeneCardComponent,
    VariantListComponent,
    TranscriptListComponent,
    AminoacidListComponent,
    AminoacidCardComponent
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    LoadingOverlayModule,
    PipeModule,
    ReactiveFormsModule,
    // material modules
    MatBadgeModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatTreeModule,
    // common components
    CapsLockDirective,
    LoadingOverlayDirective,
    AnnotationSelectorComponent,
    LolliplotViewerComponent,
    TranscriptCardComponent,
    VariantCardComponent,
    GeneCardComponent,
    AnnovarCardComponent,
    VariantListComponent,
    TranscriptListComponent,
    AminoacidListComponent,
    AminoacidCardComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
