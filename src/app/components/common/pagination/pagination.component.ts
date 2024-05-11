import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'nat-pagination',
  standalone: true,
  imports: [CommonModule, NzPaginationComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.less'
})
export class PaginationComponent {

}
