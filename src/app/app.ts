import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderHeroComponent } from './components/header-hero-component/header-hero-component';
import { HistoryComponent } from './components/history-component/history-component';
import { ConviteComponent } from './components/convite-component/convite-component';

@Component({
  selector: 'app-root',
  imports: [HeaderHeroComponent, HistoryComponent,ConviteComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
