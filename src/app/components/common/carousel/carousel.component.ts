import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { SwiperDirective } from '@directives/swiper.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {
  A11y,
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'nat-carousel',
  standalone: true,
  imports: [CommonModule, NzButtonModule, SwiperDirective, NzGridModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.less',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  slides: any[] = [
    {
      title: 'Title 1',
      url: 'https://plus.unsplash.com/premium_photo-1676009619407-18a5121f9687?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      title: 'Title 2',
      url: 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      title: 'Title 3',
      url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      title: 'Title 4',
      url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D'
    },
  ];
  @ViewChild('carousel', { static: false }) carousel!: ElementRef<HTMLElement>;

  readonly carouselConfig: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel, Autoplay],
    // autoHeight: true,
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
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    // centeredSlides: true,
    autoplay: true,
    // breakpoints: {
    //   400: {
    //     slidesPerView: 'auto',
    //     centeredSlides: false,
    //   },
    // },
  };
}
