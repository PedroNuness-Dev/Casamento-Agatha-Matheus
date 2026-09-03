import { Component } from '@angular/core';

interface FallingFlower {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

@Component({
  selector: 'app-header-hero-component',
  imports: [],
  templateUrl: './header-hero-component.html',
  styleUrl: './header-hero-component.scss',
})
export class HeaderHeroComponent {

  flowers: FallingFlower[] = [];

  constructor() {
    this.generateFlowers();
  }

  private generateFlowers(): void {
    const amount = 18;

    this.flowers = Array.from({ length: amount }, (_, index) => ({
      id: index,

      // posição horizontal
      left: Math.random() * 100,

      // tamanho da flor
      size: Math.floor(Math.random() * 18) + 12,

      // duração da queda
      duration: Math.random() * 8 + 10,

      // atraso inicial
      delay: Math.random() * -15,

      // transparência
      opacity: Math.random() * 0.35 + 0.35,

      // rotação inicial
      rotation: Math.random() * 360
    }));
  }
}