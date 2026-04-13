/**
 * QRService
 * Encapsula a geração de QR Codes via biblioteca qrcodejs.
 * Segue SRP: única responsabilidade — renderizar QR Codes no DOM.
 */
export class QRService {
  /**
   * @param {string} elementId - ID do elemento onde o QR será renderizado
   */
  constructor(elementId) {
    this.elementId = elementId;
    this._instance = null;
  }

  /**
   * Renderiza o QR Code com o payload informado.
   * Limpa o QR anterior se existir.
   * @param {string} payload
   */
  render(payload) {
    const el = document.getElementById(this.elementId);
    if (!el) throw new Error(`QRService: elemento "#${this.elementId}" não encontrado.`);

    el.innerHTML = '';
    this._instance = new QRCode(el, {
      text: payload,
      width: 200,
      height: 200,
      colorDark: '#0e0e0e',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  }
}
