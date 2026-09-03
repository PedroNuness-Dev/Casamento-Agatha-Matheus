import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { HeaderHeroComponent } from './components/header-hero-component/header-hero-component';
import { HistoryComponent } from './components/history-component/history-component';
import { ConviteComponent } from './components/convite-component/convite-component';

interface FallingFlower {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    HeaderHeroComponent,
    HistoryComponent,
    ConviteComponent
  ],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  flowers: FallingFlower[] = [];

  constructor() {
    this.generateFlowers();
  }

  private generateFlowers(): void {

    const amount = 50;

    this.flowers = Array.from(
      { length: amount },
      (_, index) => ({

        id: index,

        // Posição horizontal aleatória
        left: Math.random() * 100,

        // Tamanho entre 10px e 22px
        size: Math.floor(Math.random() * 12) + 10,

        // Queda entre 25 e 40 segundos
        duration: Math.random() * 15 + 25,

        // Faz algumas já começarem em diferentes pontos
        delay: Math.random() * -30,

        // Opacidade entre 0.25 e 0.60
        opacity: Math.random() * 0.35 + 0.25
      })
    );
  }
}