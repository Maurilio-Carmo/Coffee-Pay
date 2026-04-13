/**
 * ViewController
 * Responsável por popular o DOM com dados do config.json
 * e gerenciar eventos de UI (seleção de valor, copiar, toast).
 * Segue SRP e depende de abstrações (PixModel, QRService) via injeção.
 */
export class ViewController {
  /**
   * @param {Object}    config    - dados completos de config.json
   * @param {Object}    pixModel  - instância de PixModel
   * @param {Object}    qrService - instância de QRService
   */
  constructor(config, pixModel, qrService) {
    this.config     = config;
    this.pixModel   = pixModel;
    this.qrService  = qrService;
    this._payload   = null;
    this._outrosTimer = null;
  }

  /** Popula todos os elementos estáticos do DOM com dados do config */
  populateStatic() {
    const { page, pix, github } = this.config;

    this._set('avatar',           page.initials);
    this._set('page-title',       page.title);
    this._set('page-subtitle',    page.subtitle);
    this._set('footer',           page.footer);
    this._set('pix-beneficiary',  pix.beneficiaryDisplay);

    const ghLink = document.getElementById('github-link');
    if (ghLink) ghLink.href = github.sponsorsUrl;
  }

  /** Renderiza os botões de valor a partir do config.amounts */
  renderAmountButtons() {
    const container = document.getElementById('amounts-container');
    if (!container) return;

    const amounts = this.config.amounts;

    amounts.forEach(({ value, label }, index) => {
      const btn = this._createAmountBtn(value, label, index === 0);
      container.appendChild(btn);
    });

    // Botão "Outro"
    const outro = this._createAmountBtn(null, 'valor livre', false, 'Outro');
    container.appendChild(outro);
  }

  /** Inicializa o QR Code com o primeiro valor */
  initQR() {
    const firstAmount = this.config.amounts[0].value;
    this._updateQR(firstAmount);
  }

  /** Registra eventos de UI */
  bindEvents() {
    // Input de valor livre
    const outrosInput = document.getElementById('outrosInput');
    if (outrosInput) {
      outrosInput.addEventListener('input', (e) => {
        clearTimeout(this._outrosTimer);
        const val = parseFloat(e.target.value);
        if (!val || val <= 0) return;
        this._outrosTimer = setTimeout(() => this._updateQR(val), 600);
      });
    }

    // Botão copiar
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this._copyPix());
    }
  }

  // ── Private ─────────────────────────────────────────────────

  _set(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  _createAmountBtn(value, label, isActive = false, displayText = null) {
    const btn = document.createElement('button');
    btn.className = 'amount-btn' + (isActive ? ' active' : '');
    btn.innerHTML = `${displayText ?? 'R$ ' + value}<span class="label">${label}</span>`;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const wrap = document.getElementById('outrosWrap');
      if (value === null) {
        wrap.classList.add('visible');
        document.getElementById('outrosInput').focus();
        const custom = parseFloat(document.getElementById('outrosInput').value);
        if (custom > 0) this._updateQR(custom);
      } else {
        wrap.classList.remove('visible');
        this._updateQR(value);
      }
    });

    return btn;
  }

  _updateQR(amount) {
    const payload = this.pixModel.build(amount);
    this._payload = payload;
    this.qrService.render(payload);

    const label = document.getElementById('qrValor');
    if (label) label.textContent = 'R$ ' + amount.toFixed(2).replace('.', ',');
  }

  _copyPix() {
    if (!this._payload) return;
    navigator.clipboard.writeText(this._payload).then(() => {
      this._setCopiedState(true);
      this._showToast();
      setTimeout(() => this._setCopiedState(false), 2500);
    });
  }

  _setCopiedState(copied) {
    const btn = document.getElementById('copyBtn');
    if (!btn) return;
    if (copied) {
      btn.classList.add('copied');
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Copiado!`;
    } else {
      btn.classList.remove('copied');
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Copiar código PIX (Copia e Cola)`;
    }
  }

  _showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
}
