import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[natSwiper]',
  standalone: true,
})
export class SwiperDirective implements AfterViewInit {
  private swiperElement!: HTMLElement;

  @Input('config') config?: SwiperOptions;

  private readonly el = inject(ElementRef<HTMLElement>);

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    this.swiperElement = this.el.nativeElement;
    Object.assign(this.swiperElement, this.config);
    if (this.isBrowser) {
      console.log(this.swiperElement);
      // @ts-ignore
      this.swiperElement?.initialize();
    }
  }
}
