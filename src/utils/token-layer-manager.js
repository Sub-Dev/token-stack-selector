/**
 * Gerenciador de camadas de tokens (z-index/sort)
 * @class TokenLayerManager
 */
export class TokenLayerManager {

  /**
   * Move um token para frente de todos os outros
   * @param {Token} token - Token para mover para frente
   */
  static bringToFront(token) {
    if (!token) return;

    try {
      // Armazena o sort original se ainda não foi armazenado
      if (token._originalSort === undefined) {
        token._originalSort = token.document.sort || 0;
      }

      // Calcula o maior sort atual e adiciona 1
      const maxSort = Math.max(...canvas.tokens.placeables.map(t => t.document.sort || 0));

      // Atualiza o sort do documento para trazer para frente
      token.document.update({ sort: maxSort + 1 });

      // Marca que o token foi movido para frente
      token._wasMovedToFront = true;

      console.log(`TokenLayerManager: Token ${token.name} moved to front (movido para frente) (sort: ${maxSort + 1})`);

    } catch (error) {
      console.error("TokenLayerManager: Error moving token to front (Erro ao mover token para frente):", error);
    }
  }

  /**
   * Restaura a posição original de um token
   * @param {Token} token - Token para restaurar
   */
  static restoreOriginalPosition(token) {
    if (!token || !token._wasMovedToFront) return;

    try {
      // Restaura o sort original
      const originalSort = token._originalSort || 0;
      token.document.update({ sort: originalSort });

      // Limpa as propriedades temporárias
      delete token._originalSort;
      delete token._wasMovedToFront;

      console.log(`TokenLayerManager: Token ${token.name} restored to original position (restaurado para posição original) (sort: ${originalSort})`);

    } catch (error) {
      console.error("TokenLayerManager: Error restoring token position (Erro ao restaurar posição do token):", error);
    }
  }

  /**
   * Restaura a posição de todos os tokens que foram movidos para frente
   * @param {Token} [excludeToken] - Token para excluir da restauração
   */
  static restoreAllModifiedTokens(excludeToken = null) {
    canvas.tokens.placeables.forEach(token => {
      if (token.id !== excludeToken?.id && token._wasMovedToFront) {
        this.restoreOriginalPosition(token);
      }
    });
  }

  /**
   * Verifica se um token foi movido para frente
   * @param {Token} token - Token para verificar
   * @returns {boolean} True se o token foi movido
   */
  static wasMovedToFront(token) {
    return Boolean(token?._wasMovedToFront);
  }

  /**
   * Obtém o sort original de um token
   * @param {Token} token - Token para obter o sort
   * @returns {number} Sort original ou atual
   */
  static getOriginalSort(token) {
    return token?._originalSort ?? token?.document?.sort ?? 0;
  }

  /**
   * Limpa todas as modificações de um token específico
   * @param {Token} token - Token para limpar
   */
  static clearModifications(token) {
    if (!token) return;

    delete token._originalSort;
    delete token._wasMovedToFront;
  }
} 