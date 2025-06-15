/**
 * Token Stack Selector - Módulo Principal
 * Versão componentizada para melhor organização e manutenção
 * 
 * @author Sub-Dev
 * @version 1.0.0
 */

import { TokenStackSelector } from './src/token-stack-selector.js';

// Inicializa o módulo quando o Foundry estiver pronto
Hooks.once('ready', () => {
  console.log('🎯 Token Stack Selector | Starting... (Inicializando...)');

  try {
    TokenStackSelector.initialize();

    // Make globally available for debug (Disponibiliza globalmente para debug)
    window.TokenStackSelector = TokenStackSelector;

    console.log('🎯 Token Stack Selector | Module loaded successfully! (Módulo carregado com sucesso!)');

    // User notification (GM only) (Notificação para o usuário - apenas GMs)
    if (game.user.isGM) {
      ui.notifications.info('Token Stack Selector activated! (Token Stack Selector ativado!) 🎯', { permanent: false });
    }

  } catch (error) {
    console.error('🎯 Token Stack Selector | Initialization error (Erro na inicialização):', error);
    ui.notifications.error('Error loading Token Stack Selector (Erro ao carregar Token Stack Selector)');
  }
});

// Cleanup hook when module is disabled (Hook para limpeza quando o módulo for desabilitado)
Hooks.on('hotReload', () => {
  console.log('🎯 Token Stack Selector | Hot reload detected (Hot reload detectado)');

  if (window.TokenStackSelector) {
    window.TokenStackSelector.shutdown();
  }
});

// Console commands for developers (Comandos de console para desenvolvedores)
console.log(`
🎯 Token Stack Selector - Debug Commands (Comandos de Debug):
  • TokenStackSelector.debug() - Debug information (Informações de debug)
  • TokenStackSelector.getStats() - Module statistics (Estatísticas do módulo)
  • TokenStackSelector.reload() - Reload module (Recarregar módulo)
  • TokenStackSelector.shutdown() - Shutdown module (Desligar módulo)
`);
