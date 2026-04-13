/**
 * main.js — Entry point da aplicação
 *
 * Orquestra o carregamento dos componentes, config e
 * inicializa o MVC da página de doação.
 *
 * Padrão: MVC + SOLID
 *  - Model:      PixModel      (src/PixModel.js)
 *  - View:       components/   (HTML parciais)
 *  - Controller: ViewController (src/ViewController.js)
 *  - Service:    QRService     (src/QRService.js)
 *  - Loader:     ComponentLoader (src/ComponentLoader.js)
 */

import { ComponentLoader }  from './ComponentLoader.js';
import { PixModel }         from './PixModel.js';
import { QRService }        from './QRService.js';
import { ViewController }   from './ViewController.js';

async function init() {
  try {
    // 1. Carrega config
    const res    = await fetch('./data/config.json');
    const config = await res.json();

    // 2. Carrega componentes HTML
    const loader = new ComponentLoader();
    await loader.loadAll([
      { selector: '#slot-header',  path: './components/header.html' },
      { selector: '#slot-pix',     path: './components/pix-card.html' },
      { selector: '#slot-github',  path: './components/github-card.html' },
      { selector: '#slot-footer',  path: './components/footer.html' },
    ]);

    // 3. Instancia Model e Services
    const pixModel  = new PixModel(config.pix);
    const qrService = new QRService('qrcode');

    // 4. Instancia e inicializa o Controller
    const controller = new ViewController(config, pixModel, qrService);
    controller.populateStatic();
    controller.renderAmountButtons();
    controller.initQR();
    controller.bindEvents();

  } catch (err) {
    console.error('Erro ao inicializar a aplicação:', err);
  }
}

init();
