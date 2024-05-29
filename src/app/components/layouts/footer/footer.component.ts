import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFooterComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'nat-footer',
  standalone: true,
  imports: [NzFooterComponent, NzIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {
  @Input() storeInfor: any

  handleCall() {
    window.open(`tel:${this.storeInfor?.hotline}`);
  }

  handleOpenZalo() {
    window.open(this.storeInfor.linkZalo, '_blank')
  }

  handleOpenFacebook() {
    window.open(this.storeInfor.linkFacebook, '_blank')
  }

  handleTextSMS() {
    window.open(`sms:${this.storeInfor?.hotline}`)
  }
}
