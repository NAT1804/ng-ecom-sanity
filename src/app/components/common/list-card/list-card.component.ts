import { Component, OnInit, inject, input, model, signal } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { SlicePipe } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { SanityImagePipe } from '@pipes/sanity-image.pipe';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SanityService } from '@services/sanity/sanity.service';
import { Router } from '@angular/router';
import { fallbackImage } from '@constants';

@Component({
  selector: 'nat-list-card',
  standalone: true,
  imports: [
    NzListModule,
    NzCardModule,
    NzGridModule,
    NzDividerModule,
    NzImageModule,
    NzPaginationModule,
    SlicePipe,
    CarouselComponent,
    SanityImagePipe,
    NzTypographyModule,
  ],
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.less',
})
export class ListCardComponent<T> implements OnInit {
  categoryName = input<string>('Category Name');
  data = input<T[]>([]);
  pageSize = model(6)
  pageIndex = signal<number>(1);
  fallback = fallbackImage;
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {}

  openProductDetail(slug: string) {
    this.router.navigateByUrl(`/products?s=${slug}`);
  }

  handleClickImage($event: MouseEvent) {
    $event.preventDefault();
    console.log('image');
  }
}
