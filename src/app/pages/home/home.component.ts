import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { ThemeSelectorComponent } from '@components/common/theme-selector/theme-selector.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import {
  NZ_CAROUSEL_CUSTOM_STRATEGIES,
  NzCarouselFlipStrategy,
  NzCarouselModule,
  NzCarouselTransformNoLoopStrategy,
} from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSelectorComponent,
    NzBreadCrumbModule,
    NzCarouselModule,
    ListCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  providers: [
    {
      provide: NZ_CAROUSEL_CUSTOM_STRATEGIES,
      useValue: [
        {
          name: 'transform-no-loop',
          strategy: NzCarouselTransformNoLoopStrategy,
        },
        { name: 'flip', strategy: NzCarouselFlipStrategy },
      ],
    },
  ],
})
export class HomeComponent {
  array = [1, 2, 3, 4];

  effect = 'flip';
}
