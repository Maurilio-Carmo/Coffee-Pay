/**
 * ComponentLoader
 * Responsável por carregar arquivos HTML parciais (components/)
 * e injetá-los em elementos do DOM via fetch.
 * Segue SRP: única responsabilidade — carregar e injetar HTML.
 */
export class ComponentLoader {
  /**
   * Carrega um componente HTML e injeta no elemento alvo.
   * @param {string} selector - seletor CSS do elemento alvo
   * @param {string} path     - caminho do arquivo HTML
   * @returns {Promise<void>}
   */
  async load(selector, path) {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`ComponentLoader: elemento "${selector}" não encontrado.`);

    const res = await fetch(path);
    if (!res.ok) throw new Error(`ComponentLoader: falha ao carregar "${path}" (${res.status})`);

    el.innerHTML = await res.text();
  }

  /**
   * Carrega múltiplos componentes em paralelo.
   * @param {Array<{selector: string, path: string}>} components
   * @returns {Promise<void>}
   */
  async loadAll(components) {
    await Promise.all(components.map(({ selector, path }) => this.load(selector, path)));
  }
}
