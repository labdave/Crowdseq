import { RoundPipe } from './round.pipe';
import { StringFormatPipe } from './string-format.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';
import { CommonModule, DecimalPipe, PercentPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecondsToTimePipe } from './seconds-to-time.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [RoundPipe, SafeHtmlPipe, SecondsToTimePipe, StringFormatPipe],
  declarations: [RoundPipe, SafeHtmlPipe, SecondsToTimePipe, StringFormatPipe],
  providers: [DecimalPipe, PercentPipe],
})
export class PipeModule { }
