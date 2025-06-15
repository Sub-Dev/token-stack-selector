import { TokenLayerManager } from '../utils/token-layer-manager.js';

/**
 * Gerenciador de hooks do Foundry VTT
 * @class TokenHooksManager
 */
export class TokenHooksManager {

  /**
   * Registra todos os hooks necessários
   */
  static registerHooks() {
    this.registerTokenControlHooks();
    console.log('TokenHooksManager: Hooks registered successfully (Hooks registrados com sucesso)');
  }

  /**
   * Registra hooks para controle de tokens
   */
  static registerTokenControlHooks() {
    // Hook para restaurar sort quando token é desselecionado
    Hooks.on("controlToken", (token, controlled) => {
      if (!controlled && TokenLayerManager.wasMovedToFront(token)) {
        TokenLayerManager.restoreOriginalPosition(token);
      }
    });

    // Hook para limpar tokens modificados quando novo token é selecionado
    Hooks.on("controlToken", (token, controlled) => {
      if (controlled) {
        TokenLayerManager.restoreAllModifiedTokens(token);
      }
    });
  }

  /**
   * Remove todos os hooks registrados
   * @param {string} [hookName] - Nome específico do hook para remover
   */
  static unregisterHooks(hookName = null) {
    if (hookName) {
      Hooks.off(hookName);
    } else {
      // Remove hooks específicos deste módulo
      Hooks.off("controlToken");
    }

    console.log('TokenHooksManager: Hooks removed (Hooks removidos)');
  }

  /**
   * Registra hook temporário com auto-remoção
   * @param {string} hookName - Nome do hook
   * @param {Function} callback - Função callback
   * @param {number} [timeout] - Tempo em ms para auto-remoção
   * @returns {number} ID do hook
   */
  static registerTemporaryHook(hookName, callback, timeout = null) {
    const hookId = Hooks.on(hookName, callback);

    if (timeout) {
      setTimeout(() => {
        Hooks.off(hookName, hookId);
      }, timeout);
    }

    return hookId;
  }

  /**
   * Verifica se um hook específico está registrado
   * @param {string} hookName - Nome do hook
   * @returns {boolean} True se registrado
   */
  static isHookRegistered(hookName) {
    return Hooks.events[hookName] && Hooks.events[hookName].length > 0;
  }

  /**
   * Lista todos os hooks ativos relacionados ao módulo
   * @returns {string[]} Array com nomes dos hooks
   */
  static getActiveHooks() {
    const moduleHooks = ['controlToken', 'renderTokenHUD'];
    return moduleHooks.filter(hook => this.isHookRegistered(hook));
  }
} 