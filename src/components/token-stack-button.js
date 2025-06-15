/**
 * Componente do botão de seleção de tokens empilhados
 * @class TokenStackButton
 */
export class TokenStackButton {

  /**
   * Cria o elemento HTML do botão
   * @param {number} tokenCount - Número de tokens empilhados
   * @returns {jQuery} Elemento jQuery do botão
   */
  static create(tokenCount) {
    const button = $(
      `<div class="control-icon select-token-stack" title="Select stacked tokens (${tokenCount}) (Selecionar tokens empilhados)">
         <div class="stacked-icons">
           <i class="fas fa-users base-icon"></i>
           <i class="fas fa-crosshairs overlay-icon"></i>
         </div>
         <span class="stack-count">${tokenCount}</span>
       </div>`
    );

    return button;
  }

  /**
   * Adiciona o botão ao Token HUD
   * @param {jQuery} hudElement - Elemento HTML do HUD
   * @param {number} tokenCount - Número de tokens empilhados
   * @param {Function} clickHandler - Função para tratar cliques
   * @returns {jQuery} Elemento do botão criado
   */
  static addToHUD(hudElement, tokenCount, clickHandler) {
    // Remove botões antigos se existirem
    hudElement.find('.select-token-stack').remove();

    // Cria o novo botão
    const button = this.create(tokenCount);

    // Adiciona o handler de clique
    if (clickHandler) {
      button.on('click', clickHandler);
    }

    // Adiciona o botão ao HUD
    hudElement.find('.col.right').append(button);

    return button;
  }

  /**
   * Remove todos os botões de seleção do documento
   */
  static removeAll() {
    $('.select-token-stack').remove();
  }

  /**
   * Atualiza o contador de um botão existente
   * @param {jQuery} button - Botão para atualizar
   * @param {number} newCount - Novo número para o contador
   */
  static updateCounter(button, newCount) {
    if (!button || !button.length) return;

    button.find('.stack-count').text(newCount);
    button.attr('title', `Select stacked tokens (${newCount}) (Selecionar tokens empilhados)`);
  }

  /**
   * Verifica se um botão já existe no HUD
   * @param {jQuery} hudElement - Elemento HTML do HUD
   * @returns {boolean} True se o botão existe
   */
  static existsInHUD(hudElement) {
    return hudElement.find('.select-token-stack').length > 0;
  }

  /**
   * Obtém o botão existente no HUD
   * @param {jQuery} hudElement - Elemento HTML do HUD
   * @returns {jQuery|null} Botão encontrado ou null
   */
  static getFromHUD(hudElement) {
    const button = hudElement.find('.select-token-stack');
    return button.length > 0 ? button : null;
  }
} 