import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

/** Constructor for this class will map all the custom icons to the font for use in md-icon. No need for any other function calls */
export class CustomIconMapper {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('seq',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/duoseq_suite.svg'));
  }
}
