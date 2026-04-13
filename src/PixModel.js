/**
 * PixModel
 * Responsável pela geração do payload PIX no padrão EMV / BR Code.
 * Segue o princípio SRP: única responsabilidade — montar e validar o payload.
 */
export class PixModel {
  /**
   * @param {Object} config  - dados vindos de data/config.json → pix
   * @param {string} config.key
   * @param {string} config.beneficiary
   * @param {string} config.city
   * @param {string} config.message
   */
  constructor(config) {
    this.key         = config.key;
    this.beneficiary = config.beneficiary;
    this.city        = config.city;
    this.message     = config.message;
  }

  /** Calcula CRC-16/CCITT-FALSE */
  #crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }

  /** Formata campo EMV: ID + tamanho (2 dígitos) + valor */
  #emv(id, value) {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  }

  /**
   * Gera o payload PIX completo para um dado valor.
   * @param {number} amount - valor em reais (ex: 5.00)
   * @returns {string} payload pronto para QR Code e copia e cola
   */
  build(amount) {
    const gui      = this.#emv('00', 'br.gov.bcb.pix');
    const key      = this.#emv('01', this.key);
    const desc     = this.#emv('02', this.message);
    const merchant = this.#emv('26', gui + key + desc);

    const mcc      = this.#emv('52', '0000');
    const currency = this.#emv('53', '986');
    const amtField = this.#emv('54', amount.toFixed(2));
    const country  = this.#emv('58', 'BR');
    const name     = this.#emv('59', this.beneficiary);
    const city     = this.#emv('60', this.city);
    const txid     = this.#emv('05', '***');
    const addData  = this.#emv('62', txid);

    const raw = '000201' + merchant + mcc + currency + amtField + country + name + city + addData + '6304';
    return raw + this.#crc16(raw);
  }
}
