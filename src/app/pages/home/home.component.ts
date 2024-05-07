import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeSelectorComponent } from '@components/theme-selector/theme-selector.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ThemeSelectorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {}
