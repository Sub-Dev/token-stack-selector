import { TokenStackStyles } from './styles/token-stack-styles.js';
import { TokenDetector } from './utils/token-detector.js';
import { TokenLayerManager } from './utils/token-layer-manager.js';
import { TokenStackButton } from './components/token-stack-button.js';
import { TokenSelectionPanel } from './components/token-selection-panel.js';
import { TokenHooksManager } from './components/token-hooks-manager.js';
import { TokenHoverPreview } from './components/token-hover-preview.js';

/**
 * Classe principal do Token Stack Selector
 * @class TokenStackSelector
 */
export class TokenStackSelector {

  /**
      * Initialize the module (Inicializa o módulo)
   */
  static initialize() {
    console.log('TokenStackSelector: Starting module... (Iniciando módulo...)');

    try {
      // Inject CSS styles (Injeta estilos CSS)
      TokenStackStyles.inject();

      // Initialize hover preview system (Inicializa sistema de preview hover)
      this.hoverPreview = new TokenHoverPreview();
      this.hoverPreview.initialize();

      // Register hooks (Registra hooks)
      TokenHooksManager.registerHooks();

      // Register main hook for Token HUD rendering (Registra hook principal para renderização do Token HUD)
      this.registerTokenHUDHook();

      console.log('TokenStackSelector: Module initialized successfully (Módulo inicializado com sucesso)');

    } catch (error) {
      console.error('TokenStackSelector: Initialization error (Erro na inicialização):', error);
    }
  }

  /**
   * Registra o hook principal para renderização do Token HUD
   */
  static registerTokenHUDHook() {
    Hooks.on("renderTokenHUD", (hud, html, tokenData) => {
      this.handleTokenHUDRender(hud, html, tokenData);
    });
  }

  /**
   * Manipula a renderização do Token HUD
   * @param {TokenHUD} hud - Instância do Token HUD
   * @param {jQuery} html - Elemento HTML do HUD
   * @param {Object} tokenData - Dados do token
   */
  static handleTokenHUDRender(hud, html, tokenData) {
    try {
      const token = canvas.tokens.get(tokenData._id);

      if (!token) {
        console.warn('TokenStackSelector: Token not found (Token não encontrado)');
        return;
      }

      // Find overlapping tokens (Encontra tokens empilhados)
      const overlappingTokens = TokenDetector.findOverlappingTokens(token);

      if (overlappingTokens.length === 0) {
        return; // No stacked tokens (Não há tokens empilhados)
      }

      // Filter visible tokens for user (Filtra tokens visíveis para o usuário)
      const visibleTokens = TokenDetector.filterVisibleTokens(overlappingTokens);

      if (visibleTokens.length === 0) {
        return; // No visible tokens (Nenhum token visível)
      }

      // Adiciona botão ao HUD
      const button = TokenStackButton.addToHUD(
        html,
        visibleTokens.length,
        () => this.handleButtonClick(visibleTokens, html, button)
      );

    } catch (error) {
      console.error('TokenStackSelector: Error processing Token HUD (Erro ao processar Token HUD):', error);
    }
  }

  /**
   * Manipula o clique no botão do HUD
   * @param {Token[]} tokens - Tokens empilhados
   * @param {jQuery} hudElement - Elemento do HUD
   * @param {jQuery} button - Botão clicado
   */
  static handleButtonClick(tokens, hudElement, button) {
    try {
      // Exibe o painel de seleção
      TokenSelectionPanel.show(tokens, hudElement, button);

    } catch (error) {
      console.error('TokenStackSelector: Error opening panel (Erro ao abrir painel):', error);
      ui.notifications.error('Error opening selection panel (Erro ao abrir painel de seleção)');
    }
  }

  /**
      * Shutdown module and cleanup resources (Desliga o módulo e limpa recursos)
   */
  static shutdown() {
    console.log('TokenStackSelector: Shutting down module... (Desligando módulo...)');

    try {
      // Remove styles (Remove estilos)
      TokenStackStyles.remove();

      // Destroy hover preview system (Destrói sistema de preview hover)
      if (this.hoverPreview) {
        this.hoverPreview.destroy();
        this.hoverPreview = null;
      }

      // Remove hooks (Remove hooks)
      TokenHooksManager.unregisterHooks();

      // Remove buttons and panels (Remove botões e painéis)
      TokenStackButton.removeAll();
      TokenSelectionPanel.removeAll();

      // Restore modified tokens (Restaura tokens modificados)
      TokenLayerManager.restoreAllModifiedTokens();

      console.log('TokenStackSelector: Module shutdown successfully (Módulo desligado com sucesso)');

    } catch (error) {
      console.error('TokenStackSelector: Error shutting down module (Erro ao desligar módulo):', error);
    }
  }

  /**
   * Reload the module (Recarrega o módulo)
   */
  static reload() {
    console.log('TokenStackSelector: Reloading module... (Recarregando módulo...)');
    this.shutdown();
    setTimeout(() => this.initialize(), 100);
  }

  /**
      * Get module statistics (Obtém estatísticas do módulo)
   * @returns {Object} Object with statistics (Objeto com estatísticas)
   */
  static getStats() {
    const activeHooks = TokenHooksManager.getActiveHooks();
    const activeButtons = $('.select-token-stack').length;
    const activePanels = $('.token-stack-panel').length;
    const modifiedTokens = canvas.tokens?.placeables?.filter(t =>
      TokenLayerManager.wasMovedToFront(t)
    ).length || 0;

    return {
      version: '1.0.0',
      activeHooks: activeHooks.length,
      activeButtons,
      activePanels,
      modifiedTokens,
      hooksDetail: activeHooks
    };
  }

  /**
   * Debug function for developers (Função de debug para desenvolvedores)
   */
  static debug() {
    const stats = this.getStats();
    console.group('TokenStackSelector Debug Info');
    console.log('Statistics (Estatísticas):', stats);
    console.log('Tokens on canvas (Tokens no canvas):', canvas.tokens?.placeables?.length || 0);
    console.log('User is GM (Usuário é GM):', game.user.isGM);
    console.groupEnd();

    return stats;
  }
} 