import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringFormat' })
export class StringFormatPipe implements PipeTransform {
  constructor() { }
  transform(string) {
    return string.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&apos;/g, '\'');
  }
}
