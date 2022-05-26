import { Component, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from './../environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
// import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';
import { AnnotationService } from './annotation/services/annotation.service';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { NavigationService } from './shared/services/navigation.service';
import { DialogService } from './shared/components/dialog/dialog.service';
import { ThemeSelectionService } from './shared/services/theme-selection.service';
import { CustomIconMapper } from './shared/utils/custom-icon-mapper.class';
import { AppHeaderService } from './shared/services/app-header.service';
import { FeedbackDialogComponent } from './shared/components/feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('annotationUpload') annotationFileInputElement;

  readonly outOfArea = -200; // used for floating sidebar highlight

  userInfo: any;
  idleWarningAlert: MatDialogRef<DialogComponent>;
  showNavBar = true;
  header = '';

  constructor(
    public router: Router,
    // private idle: Idle,
    public dialog: MatDialog,
    // private keepalive: Keepalive,
    private appHeaderService: AppHeaderService,
    private navigation: NavigationService,
    private dialogService: DialogService,
    private titleService: Title,
    private themeService: ThemeSelectionService,
    private annotationService: AnnotationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    // this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.themeService.setTheme(); // sets the default theme

    const customIcon: CustomIconMapper = new CustomIconMapper(
      iconRegistry,
      sanitizer
    ); // this constructor will map all the custom icons

    this.router.events.subscribe(event => {
      // Whenever there is a navigation event, get the url and strip out dashes format it
      if (event instanceof NavigationEnd) {
        this.appHeaderService.setHeader('');
        // Here so this doesn't get called multiple times in one url navigation
        if (event['title'] && event['title'] !== 'Home') {
          this.setTitle('Crowdseq - ' + event['title']);
        } else {
          this.setTitle('Crowdseq');
        }
        // this.authService.showHelp = false;
      }
    });

    this.appHeaderService.headerEmmiter
      .subscribe((header) => {
        if (header !== null) {
          this.header = header;
        } else {
          this.header = '';
        }
      });

    this.navigation.showNavBarEmitter
      .subscribe((mode) => {
        // mode will be null the first time it is created, so you need to ignore it when null
        if (mode !== null) {
          this.showNavBar = mode;
        }
      });

    // this.navigation.showNavBar(true);
    // this.authService.loggedInEmitter.subscribe(loggedIn => {
    //   if (loggedIn !== null && loggedIn) {
    //     // logged in
    //     // this.setPingInterval();
    //     this.navigation.showNavBar(true);
    //     const timeout = 1200; // default timeout to 1200 seconds (20 minutes)
    //     const idleTime = timeout * 0.667; // idle time ( length of time user has been idle before getting warning )
    //     // this.idle.setIdle(idleTime); // set idle time to 90% of timeout length *triggers the idle warning*
    //     // this.idle.setTimeout(timeout - idleTime); // set timeout length to the remainder of the timeout length *triggers the timeout/logout*
    //     // this.idle.watch();
    //     this.authService.getUserInfo().subscribe(
    //       data => {
    //         this.userInfo = data;
    //         if ( this.userInfo.affiliation_id.abbr === 'DDB' ) {
    //           this.affiliateService.getAffiliations().subscribe(); // just subscribe to pull the list ( don't need to do anything with it here)
    //           this.permissionService.getAuthGroups().subscribe(); // just subscribe to pull the list
    //         }
    //         // this.themeService.saveDefaultThemeSelection(this.userInfo.user_prefs[0].theme_selected);
    //       },
    //       error => {
    //         console.error('Error getting user info');
    //       }
    //     );
    //   } else {
    //     // logged out
    //     // this.idle.stop(); // stop the timeout counter
    //   }
    // });

    // this.idle.onIdleEnd.subscribe(() => {
    //   this.zone.run(() => {
    //     // need to run the close alert in a NgZone for ChangeDetection to pick it up
    //     if (this.idleWarningAlert) {
    //       this.idleWarningAlert.close();
    //       this.idleWarningAlert = null;
    //     }
    //   });
    // });
    // this.idle.onTimeout.subscribe(() => {
    //   // user timed out
    //   if (this.idleWarningAlert) {
    //     this.idleWarningAlert.close();
    //     this.idleWarningAlert = null;
    //     this.authService.logout(true);
    //     this.dialogService.alert(
    //       'Session Timed Out',
    //       'Session timed out due to idleness. Please log in.',
    //       this.viewContainerRef
    //     );
    //   }
    // });
    // this.idle.onTimeoutWarning.subscribe(countdown => {
    //   // user is warned for being idle
    //   if (!this.idleWarningAlert) {
    //     this.idleWarningAlert = this.dialogService.alert(
    //       'Idle Warning',
    //       'You have gone this.idle. Your session will timeout in ' +
    //         new SecondsToTimePipe().transform(Math.round(countdown)),
    //       this.viewContainerRef,
    //       DialogService.warning
    //     );
    //   } else {
    //     this.idleWarningAlert.componentInstance.message =
    //       'You have gone this.idle. Your session will timeout in ' +
    //       new SecondsToTimePipe().transform(Math.round(countdown));
    //   }
    // });
    // keepalive.onPing.subscribe(() => { // make sure our token doesn't expire
    //   this.authService.refreshToken() // refresh jwt
    //     .subscribe(
    //       data => {
    //         this.setPingInterval();
    //       },
    //       error => {
    //         console.error('There was an error with the keepalive mechanism');
    //         console.error(error);
    //         this.authService.logout();
    //       });
    // });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // inviteUser() {
  //   const dialogRef = this.dialog.open(InviteUserDialogComponent, {
  //     width: '700px',
  //     height: 'auto'
  //   });
  // }

  annotationClicked(): void {
    this.annotationFileInputElement.nativeElement.click();
  }

  onAnnotationFileSelected(event: any): void {
    if ( event.target.files.length > 0 ) {
      const file = event.target.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
      this.annotationFileInputElement.nativeElement.value = '';
      this.annotationService.uploadAnnotationData(formData).subscribe(
        data => {
          this.dialogService.showSnackbar(
            'Annotation Data Uploaded!',
            DialogService.medium,
            DialogService.success
          );
        }, error => {
          this.dialogService.showSnackbar(
            'Annotation Data Upload Failed!',
            DialogService.medium,
            DialogService.error
          );
        }
      );
    }
  }


  provideFeedback(): void {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, {
      width: '700px',
      height: 'auto'
    });
  }

  help(): void {
    // this.authService.startTour();
  }

  logout() {
    // this.authService.logout();
  }

  // setPingInterval() {
  //   // sets the ping interval to the token expiration date minus 10 seconds
  //   this.keepalive.interval(moment.duration(this.authService.getExpiration().diff(moment())).asSeconds() - 10);
  // }
}
