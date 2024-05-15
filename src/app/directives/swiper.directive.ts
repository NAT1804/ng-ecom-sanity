import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  INJECTOR,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[natSwiper]',
  standalone: true,
})
export class SwiperDirective implements OnInit, AfterViewInit {
  @Input('config') config?: SwiperOptions;

  private isBrowser: boolean = false;

  constructor(
    private el: ElementRef<SwiperContainer>,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.isBrowser) {
      const nativeEl = this.el.nativeElement;
      if (nativeEl) {
        Object.assign(nativeEl, this.config);
        nativeEl?.initialize();
      }
    }
  }
}
