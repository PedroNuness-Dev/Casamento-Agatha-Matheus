import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-convite-component',
  imports: [],
  templateUrl: './convite-component.html',
  styleUrl: './convite-component.scss',
})
export class ConviteComponent implements OnInit, OnDestroy {

  dias = signal(0);
  horas = signal(0);
  minutos = signal(0);
  segundos = signal(0);

  private timer: any;

  // Data do casamento
  private dataCasamento = new Date('2026-11-20T16:00:00');

  ngOnInit() {
    this.atualizarContador();

    this.timer = setInterval(() => {
      this.atualizarContador();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  atualizarContador() {
    const agora = new Date().getTime();
    const destino = this.dataCasamento.getTime();

    const diferenca = destino - agora;

    if (diferenca <= 0) {
      this.dias.set(0);
      this.horas.set(0);
      this.minutos.set(0);
      this.segundos.set(0);
      clearInterval(this.timer);
      return;
    }

    this.dias.set(Math.floor(diferenca / (1000 * 60 * 60 * 24)));
    this.horas.set(Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.minutos.set(Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)));
    this.segundos.set(Math.floor((diferenca % (1000 * 60)) / 1000));
  }
}