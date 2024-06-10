import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { fallbackImage } from '@constants';
import { SwiperDirective } from '@directives/swiper.directive';
import { IBanner } from '@models/banner.model';
import { SanityImagePipe } from '@pipes/sanity-image.pipe';
import { NzImageModule } from 'ng-zorro-antd/image';
import { SwiperOptions } from 'swiper/types';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'nat-carousel',
  standalone: true,
  imports: [SwiperDirective, NzImageModule, SanityImagePipe, NzSpinModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements OnInit {
  slides = input<IBanner[]>([]);

  public fallback = fallbackImage;

  constructor() {}

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
    loop: false,
  };
}
