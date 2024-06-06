import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { BreakpointObserverService } from '@services/breakpoint-observer/breakpoint-observer.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFooterComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'nat-footer',
  standalone: true,
  imports: [NzFooterComponent, NzIconModule, NzGridModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
})
export class FooterComponent {
  @Input() storeInfor: any;
  private isBrowser!: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private _breakpointObserverService: BreakpointObserverService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  handleCall() {
    window.open(`tel:${this.storeInfor?.hotline}`);
  }

  handleOpenZalo() {
    window.open(this.storeInfor.linkZalo, '_blank');
  }

  handleOpenFacebook() {
    window.open(this.storeInfor.linkFacebook, '_blank');
  }

  handleTextSMS() {
    window.open(`sms:${this.storeInfor?.hotline}`);
  }
}
