# 🏗️ Estrutura Modular - Token Stack Selector

Esta é a estrutura componentizada do Token Stack Selector, organizando o código em módulos lógicos e reutilizáveis.

## 📁 Estrutura de Diretórios

```
src/
├── components/           # Componentes de interface
│   ├── token-hooks-manager.js     # Gerenciamento de hooks do Foundry
│   ├── token-selection-panel.js   # Painel de seleção de tokens
│   └── token-stack-button.js      # Botão do Token HUD
├── utils/               # Utilitários e helpers
│   ├── token-detector.js          # Detecção de tokens empilhados
│   └── token-layer-manager.js     # Gerenciamento de z-index/sort
├── styles/              # Estilos CSS
│   └── token-stack-styles.js      # Todos os estilos do módulo
└── token-stack-selector.js        # Classe principal (orchestrator)
```

## 🧩 Componentes

### 📍 **token-stack-selector.js** _(Principal)_

- **Responsabilidade**: Orquestrador principal que integra todos os componentes
- **Funcionalidades**:
  - Inicialização do módulo
  - Coordenação entre componentes
  - Hooks principais do Foundry
  - Debug e estatísticas

### 🎨 **styles/token-stack-styles.js**

- **Responsabilidade**: Gerenciamento de estilos CSS
- **Funcionalidades**:
  - Injeção de estilos no documento
  - Remoção de estilos
  - CSS componentizado e organizados

### 🔍 **utils/token-detector.js**

- **Responsabilidade**: Detecção e análise de tokens
- **Funcionalidades**:
  - Encontrar tokens empilhados
  - Extrair informações de tokens
  - Filtrar tokens visíveis por permissão
  - Compatibilidade com diferentes sistemas

### 🔧 **utils/token-layer-manager.js**

- **Responsabilidade**: Gerenciamento de camadas de tokens
- **Funcionalidades**:
  - Mover tokens para frente
  - Restaurar posições originais
  - Gerenciar propriedades temporárias
  - Logging e debug

### 🔘 **components/token-stack-button.js**

- **Responsabilidade**: Componente do botão no Token HUD
- **Funcionalidades**:
  - Criação do elemento HTML
  - Adição ao HUD
  - Atualização de contadores
  - Gerenciamento de estado

### 📋 **components/token-selection-panel.js**

- **Responsabilidade**: Painel de seleção de tokens
- **Funcionalidades**:
  - Criação do painel HTML
  - Posicionamento inteligente
  - Eventos de interação
  - Animações e feedback

### 🔗 **components/token-hooks-manager.js**

- **Responsabilidade**: Gerenciamento de hooks do Foundry
- **Funcionalidades**:
  - Registro de hooks
  - Remoção de hooks
  - Hooks temporários
  - Debug de hooks ativos

## 🎯 Vantagens da Componentização

### ✅ **Manutenibilidade**

- Código organizado por responsabilidade
- Fácil localização de funcionalidades
- Debugging mais eficiente

### ✅ **Reutilização**

- Componentes independentes
- Fácil extração para outros projetos
- APIs bem definidas

### ✅ **Testabilidade**

- Cada componente pode ser testado isoladamente
- Mocking mais simples
- Debugging granular

### ✅ **Escalabilidade**

- Fácil adição de novos componentes
- Modificações localizadas
- Redução de conflitos de código

### ✅ **Performance**

- Carregamento otimizado
- Controle granular de recursos
- Melhor gerenciamento de memória

## 🔄 Fluxo de Funcionamento

```mermaid
graph TD
    A[main.js] --> B[TokenStackSelector.initialize()]
    B --> C[TokenStackStyles.inject()]
    B --> D[TokenHooksManager.registerHooks()]
    B --> E[Hook: renderTokenHUD]

    E --> F[TokenDetector.findOverlappingTokens()]
    F --> G{Há tokens empilhados?}
    G -->|Sim| H[TokenStackButton.addToHUD()]
    G -->|Não| I[Fim]

    H --> J[Usuário clica no botão]
    J --> K[TokenSelectionPanel.show()]
    K --> L[Usuário seleciona token]
    L --> M[TokenLayerManager.bringToFront()]
    M --> N[TokenSelectionPanel.close()]
```

## 🛠️ APIs dos Componentes

### TokenStackSelector (Principal)

```javascript
TokenStackSelector.initialize(); // Inicializa módulo
TokenStackSelector.shutdown(); // Desliga módulo
TokenStackSelector.reload(); // Recarrega módulo
TokenStackSelector.debug(); // Info de debug
TokenStackSelector.getStats(); // Estatísticas
```

### TokenDetector

```javascript
TokenDetector.findOverlappingTokens(token); // Encontra tokens empilhados
TokenDetector.hasOverlappingTokens(token); // Verifica se há empilhamento
TokenDetector.getTokenInfo(token); // Extrai informações
TokenDetector.filterVisibleTokens(tokens); // Filtra por visibilidade
```

### TokenLayerManager

```javascript
TokenLayerManager.bringToFront(token); // Move para frente
TokenLayerManager.restoreOriginalPosition(token); // Restaura posição
TokenLayerManager.restoreAllModifiedTokens(); // Restaura todos
TokenLayerManager.wasMovedToFront(token); // Verifica se foi movido
```

## 🚀 Comandos de Debug

No console do navegador:

```javascript
// Informações completas de debug
TokenStackSelector.debug();

// Estatísticas do módulo
TokenStackSelector.getStats();

// Recarregar módulo
TokenStackSelector.reload();

// Desligar módulo
TokenStackSelector.shutdown();
```

## 📝 Convenções de Código

- **Classes**: PascalCase (`TokenStackSelector`)
- **Métodos**: camelCase (`findOverlappingTokens`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_TOKENS`)
- **Arquivos**: kebab-case (`token-stack-selector.js`)
- **JSDoc**: Documentação obrigatória para métodos públicos
- **Console**: Prefixo com nome da classe para logs

---

**Desenvolvido com ❤️ e arquitetura modular**
