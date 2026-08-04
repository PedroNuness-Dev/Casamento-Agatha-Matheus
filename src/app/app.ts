import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderHeroComponent } from './components/header-hero-component/header-hero-component';

@Component({
  selector: 'app-root',
  imports: [HeaderHeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
