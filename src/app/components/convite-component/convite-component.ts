import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
interface DayCell {
  day: number;
  weekday: string;
  featured: boolean;
}

@Component({
  selector: 'app-convite-component',
  imports: [],
  templateUrl: './convite-component.html',
  styleUrl: './convite-component.scss',
})
export class ConviteComponent implements OnInit, AfterViewInit, OnDestroy {

  // ---- Contador regressivo ------------------------------------------

  dias = signal(0);
  horas = signal(0);
  minutos = signal(0);
  segundos = signal(0);

  private timer: any;

  // Data do casamento
  private dataCasamento = new Date('2026-11-20T16:00:00');

  // ---- Tirinha de dias -------------------------------------------------
  // Tudo sobre "qual mês" mora aqui — mude esses três valores e a
  // tirinha inteira (e o dia centralizado) acompanha.
  private readonly ANO_TIRINHA = 2026;
  private readonly MES_TIRINHA = 10; // Novembro (0-indexed)
  private readonly DIA_DESTAQUE = 20;

  dias_tirinha = signal<DayCell[]>([]);

  private resizeObserver?: ResizeObserver;

  // ---- Referências de template ---------------------------------------

  // Referência à carta, usada pelo IntersectionObserver
  @ViewChild('envelopeRef') envelopeRef!: ElementRef<HTMLElement>;
  @ViewChild('revealSection') revealSection!: ElementRef<HTMLElement>;
  @ViewChild('strip') stripRef!: ElementRef<HTMLDivElement>;

  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.atualizarContador();

    this.timer = setInterval(() => {
      this.atualizarContador();
    }, 1000);
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.envelopeRef.nativeElement.classList.add('open');
            this.revealSection.nativeElement.classList.add('open');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    this.observer.observe(this.envelopeRef.nativeElement);

    // Tirinha: calcula quantos dias cabem e recalcula sempre que
    // o container mudar de tamanho (resize, orientação, etc).
    this.recalcularTirinha();
    this.resizeObserver = new ResizeObserver(() => this.recalcularTirinha());
    this.resizeObserver.observe(this.stripRef.nativeElement);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
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

  trackByDay(_index: number, cell: DayCell): number {
    return cell.day;
  }

  /**
   * Figura quantos dias cabem na largura atual e monta uma faixa
   * centrada em DIA_DESTAQUE. A largura da célula é lida do CSS
   * (--cell-width), então os breakpoints definidos no SCSS valem
   * automaticamente aqui também.
   */
  private recalcularTirinha(): void {
    const larguraDisponivel = this.stripRef.nativeElement.clientWidth;
    const larguraCelula = this.getCellWidth();

    let count = Math.floor(larguraDisponivel / larguraCelula);
    if (count < 1) count = 1;
    if (count % 2 === 0) count -= 1; // ímpar -> dia em destaque fica exatamente no centro
    if (count < 1) count = 1;

    const metade = Math.floor(count / 2);
    const diasNoMes = new Date(this.ANO_TIRINHA, this.MES_TIRINHA + 1, 0).getDate();

    let inicio = this.DIA_DESTAQUE - metade;
    let fim = this.DIA_DESTAQUE + metade;

    // Se a janela estourar os limites do mês, desloca ela inteira
    // pra dentro em vez de mostrar dias que não existem.
    if (inicio < 1) {
      fim += 1 - inicio;
      inicio = 1;
    }
    if (fim > diasNoMes) {
      inicio -= fim - diasNoMes;
      fim = diasNoMes;
    }
    inicio = Math.max(1, inicio);
    fim = Math.min(diasNoMes, fim);

    const celulas: DayCell[] = [];
    for (let d = inicio; d <= fim; d++) {
      const data = new Date(this.ANO_TIRINHA, this.MES_TIRINHA, d);
      celulas.push({
        day: d,
        weekday: this.weekdayLabel(data),
        featured: d === this.DIA_DESTAQUE,
      });
    }
    this.dias_tirinha.set(celulas);
  }

  private getCellWidth(): number {
    const valor = getComputedStyle(this.host.nativeElement)
      .getPropertyValue('--cell-width')
      .trim();
    const parsed = parseFloat(valor);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 168;
  }

  private weekdayLabel(data: Date): string {
    const raw = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(data);
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }
}