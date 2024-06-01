import { isPlatformBrowser } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  input,
} from '@angular/core';
import { fallbackImage } from '@constants';
import { SwiperDirective } from '@directives/swiper.directive';
import { IBanner } from '@models/banner.model';
import { SanityImagePipe } from '@pipes/sanity-image.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'nat-carousel',
  standalone: true,
  imports: [
    SwiperDirective,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzImageModule,
    SanityImagePipe,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements OnInit {
  slides = input<IBanner[]>([]);

  fallback = fallbackImage;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
    }
  }

  ngOnInit(): void {}

  readonly carouselConfig: SwiperOptions = {
    spaceBetween: 20,
    navigation: {
      nextEl: '#carousel-next-btn',
      prevEl: '#carousel-prev-btn',
    },
    pagination: {
      clickable: true,
      el: '#carousel-pagination',
      renderBullet(index, className) {
        return (
          '<span class="' +
          className +
          '">' +
          '<svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">' +
          '<circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"' +
          'stroke-opacity="1" stroke-width="1.5px"></circle>' +
          '<circle cx="8" cy="8" r="3" fill="#FFF"></circle>' +
          '</svg></span>'
        );
      },
    },
    slidesPerView: 'auto',
    observer: true,
    observeParents: true,
    effect: 'coverflow',
    autoplay: true,
    loop: true,
  };
}
