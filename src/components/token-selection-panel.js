import { TokenDetector } from '../utils/token-detector.js';
import { TokenLayerManager } from '../utils/token-layer-manager.js';

/**
 * Componente do painel de seleção de tokens
 * @class TokenSelectionPanel
 */
export class TokenSelectionPanel {

  /**
   * Cria o HTML do painel de seleção
   * @param {Token[]} tokens - Array de tokens para exibir
   * @returns {jQuery} Elemento jQuery do painel
   */
  static create(tokens) {
    const tokenCount = tokens.length;

    const tokenCards = tokens.map(token => {
      const info = TokenDetector.getTokenInfo(token);

      return `
         <div class="token-option" data-id="${info.id}" title="Click to select ${info.name} (Clique para selecionar ${info.name})">
           <img class="token-avatar" src="${info.texture}" alt="${info.name}" />
           <div class="token-info">
             <p class="token-name">${info.name}</p>
             <p class="token-details">${info.type}${info.hp ? ' • ' + info.hp : ''}</p>
           </div>
         </div>
       `;
    }).join('');

    const panel = $(`
       <div class="token-stack-panel">
         <div class="token-stack-header">
           <h4 class="token-stack-title">Stacked Tokens (${tokenCount}) (Tokens Empilhados)</h4>
         </div>
         <div class="token-stack-content">
           ${tokenCards}
         </div>
       </div>
     `);

    return panel;
  }

  /**
   * Posiciona o painel de forma inteligente na tela
   * @param {jQuery} panel - Painel para posicionar
   * @param {jQuery} hudElement - Elemento do HUD de referência
   * @param {number} tokenCount - Número de tokens (para calcular altura)
   */
  static position(panel, hudElement, tokenCount) {
    const hudRect = hudElement[0].getBoundingClientRect();
    const panelWidth = 280;
    const panelHeight = Math.min(350, 80 + (tokenCount * 52));

    let left = hudRect.right + 10;
    let top = hudRect.top;

    // Ajusta se sair da tela horizontalmente
    if (left + panelWidth > window.innerWidth) {
      left = hudRect.left - panelWidth - 10;
    }

    // Ajusta se sair da tela verticalmente
    if (top + panelHeight > window.innerHeight) {
      top = window.innerHeight - panelHeight - 10;
    }

    // Aplica posicionamento
    panel.css({
      position: "fixed",
      top: Math.max(10, top) + "px",
      left: Math.max(10, left) + "px",
      zIndex: 1000
    });
  }

  /**
   * Adiciona eventos de interação ao painel
   * @param {jQuery} panel - Painel para adicionar eventos
   * @param {jQuery} button - Botão que abriu o painel
   * @param {Function} onTokenSelect - Callback quando um token é selecionado
   */
  static addEventListeners(panel, button, onTokenSelect) {
    // Eventos de clique nos tokens
    panel.find('.token-option').on('click', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      const tokenId = this.dataset.id;
      const targetToken = canvas.tokens.get(tokenId);

      if (targetToken && onTokenSelect) {
        // Animação de seleção
        $(this).css('transform', 'translateX(4px) scale(0.95)');

        setTimeout(() => {
          onTokenSelect(targetToken);
        }, 100);
      }
    });

    // Fecha o painel com delay para evitar fechamento imediato
    setTimeout(() => {
      $(document).on('click.stackpanel', (ev) => {
        if (!panel[0].contains(ev.target) && !button[0].contains(ev.target)) {
          this.close(panel);
        }
      });
    }, 100);

    // Fecha com ESC
    $(document).on('keydown.stackpanel', (ev) => {
      if (ev.key === 'Escape') {
        this.close(panel);
      }
    });
  }

  /**
   * Fecha o painel com animação
   * @param {jQuery} panel - Painel para fechar
   */
  static close(panel) {
    if (!panel || !panel.length) return;

    panel.addClass('removing');

    setTimeout(() => {
      panel.remove();
      $(document).off('click.stackpanel keydown.stackpanel');
    }, 100);
  }

  /**
   * Remove todos os painéis existentes
   */
  static removeAll() {
    $('.token-stack-panel').remove();
    $(document).off('click.stackpanel keydown.stackpanel');
  }

  /**
   * Seleciona um token e executa as ações necessárias
   * @param {Token} token - Token para selecionar
   */
  static selectToken(token) {
    if (!token) return;

    try {
      // Seleciona o token no canvas
      canvas.tokens.selectObjects({ releaseOthers: true });
      token.control();

      // Move o token para frente
      TokenLayerManager.bringToFront(token);

      // Visual feedback (Feedback visual)
      ui.notifications.info(`Token "${token.name}" selected and moved to front (selecionado e movido para frente)`, {
        permanent: false,
        localize: false
      });

    } catch (error) {
      console.error('TokenSelectionPanel: Error selecting token (Erro ao selecionar token):', error);
      ui.notifications.error('Error selecting token (Erro ao selecionar token)');
    }
  }

  /**
   * Cria e exibe um painel completo
   * @param {Token[]} tokens - Tokens para exibir
   * @param {jQuery} hudElement - Elemento do HUD
   * @param {jQuery} button - Botão que abriu o painel
   * @returns {jQuery} Painel criado
   */
  static show(tokens, hudElement, button) {
    // Remove painéis existentes
    this.removeAll();

    // Filtra tokens visíveis
    const visibleTokens = TokenDetector.filterVisibleTokens(tokens);

    if (visibleTokens.length === 0) {
      ui.notifications.warn('No visible tokens to select (Nenhum token visível para selecionar)');
      return null;
    }

    // Cria o painel
    const panel = this.create(visibleTokens);

    // Posiciona na tela
    this.position(panel, hudElement, visibleTokens.length);

    // Adiciona eventos
    this.addEventListeners(panel, button, (token) => {
      this.selectToken(token);
      this.close(panel);
    });

    // Adiciona ao DOM
    $('body').append(panel);

    return panel;
  }
} 