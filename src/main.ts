import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Impede que o navegador tente "adivinhar" a posição de scroll
// salva da última visita. Sem isso, ele restaura a posição usando
// a altura da página ainda incompleta (antes de imagens/fontes
// carregarem), e o conteúdo "pula" para outro lugar depois.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
