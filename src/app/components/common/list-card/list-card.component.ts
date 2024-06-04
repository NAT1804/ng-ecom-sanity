import { CommonModule, SlicePipe } from '@angular/common';
import { Component, OnInit, inject, input, model, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { fallbackImage } from '@constants';
import { SanityImagePipe } from '@pipes/sanity-image.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CarouselComponent } from '../carousel/carousel.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BreakpointObserverService } from '@services/breakpoint-observer/breakpoint-observer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nat-list-card',
  standalone: true,
  imports: [
    CommonModule,
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
    NzResultModule,
    NzButtonModule,
    RouterModule,
  ],
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.less',
})
export class ListCardComponent<T> implements OnInit {
  categoryName = input<string>('');
  data = input<T[]>([]);
  pageSize = model(6);
  pageIndex = signal<number>(1);
  fallback = fallbackImage;
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {}

  openProductDetail(slug: string) {
    this.router.navigateByUrl(`/products/${slug}`);
  }
}
