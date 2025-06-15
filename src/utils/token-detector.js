/**
 * Utilitário para detecção de tokens empilhados
 * @class TokenDetector
 */
export class TokenDetector {

  /**
   * Encontra tokens que estão empilhados na mesma posição de um token base
   * @param {Token} baseToken - Token de referência
   * @returns {Token[]} Array de tokens empilhados (exceto o token base)
   */
  static findOverlappingTokens(baseToken) {
    if (!baseToken || !canvas.tokens) return [];

    const cellX = Math.floor(baseToken.x / canvas.grid.size);
    const cellY = Math.floor(baseToken.y / canvas.grid.size);

    return canvas.tokens.placeables.filter(token => {
      const tx = Math.floor(token.x / canvas.grid.size);
      const ty = Math.floor(token.y / canvas.grid.size);
      return tx === cellX && ty === cellY && token.id !== baseToken.id;
    });
  }

  /**
   * Verifica se um token tem outros tokens empilhados
   * @param {Token} token - Token para verificar
   * @returns {boolean} True se há tokens empilhados
   */
  static hasOverlappingTokens(token) {
    return this.findOverlappingTokens(token).length > 0;
  }

  /**
   * Obtém informações detalhadas de um token para exibição
   * @param {Token} token - Token para extrair informações
   * @returns {Object} Objeto com informações do token
   */
  static getTokenInfo(token) {
    const actor = token.actor;
    const tokenName = token.name || 'Unnamed Token (Token Sem Nome)';
    const actorType = actor ? actor.type : 'Unknown (Desconhecido)';

    // Try to get HP in different ways (system compatibility) (Tenta obter HP de diferentes formas - compatibilidade com sistemas)
    let hp = '';
    if (actor?.system?.attributes?.hp) {
      const current = actor.system.attributes.hp.value || 0;
      const max = actor.system.attributes.hp.max || 0;
      hp = `${current}/${max} HP`;
    } else if (actor?.system?.health) {
      const current = actor.system.health.value || 0;
      const max = actor.system.health.max || 0;
      hp = `${current}/${max} HP`;
    }

    return {
      id: token.id,
      name: tokenName,
      type: actorType,
      hp: hp,
      texture: token.document.texture.src,
      actor: actor
    };
  }

  /**
   * Filtra tokens visíveis para o usuário atual
   * @param {Token[]} tokens - Array de tokens para filtrar
   * @returns {Token[]} Tokens visíveis pelo usuário
   */
  static filterVisibleTokens(tokens) {
    return tokens.filter(token => {
      // If GM, can see all tokens (Se é GM, vê todos os tokens)
      if (game.user.isGM) return true;

      // If token owner, can see (Se é proprietário do token, pode ver)
      if (token.actor && token.actor.testUserPermission(game.user, "OWNER")) return true;

      // If token is visible, can see (Se o token está visível, pode ver)
      if (!token.document.hidden) return true;

      return false;
    });
  }
} 