# Token Stack Selector

![Foundry VTT](https://img.shields.io/badge/Foundry%20VTT-Compatible-orange)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> 🇺🇸 **English speakers**: Check out [README.md](README.md) for the English version.

## 📋 Descrição

**Token Stack Selector** é um módulo moderno para Foundry VTT que soluciona o problema de tokens empilhados (sobrepostos). Quando múltiplos tokens ocupam a mesma posição no grid, este módulo adiciona uma interface elegante e intuitiva para selecionar facilmente o token desejado.

## ✨ Características

### 🎯 **Interface Moderna**

- **Design Premium**: Interface similar ao painel de condições nativo do Foundry
- **Ícone Único**: Combinação visual de grupo de usuários + mira para identificação rápida
- **Animações Suaves**: Transições elegantes e feedback visual
- **Contador Visual**: Badge mostrando quantos tokens estão empilhados

### 🖱️ **Funcionalidades Avançadas**

- **Preview ao Passar o Mouse**: Mostra tokens empilhados ao passar o mouse (delay de 800ms)
- **Seleção Inteligente**: Token selecionado automaticamente vem para frente
- **Informações Detalhadas**: Mostra nome, tipo de ator e HP quando disponível
- **Posicionamento Inteligente**: Painel se ajusta automaticamente para não sair da tela
- **Múltiplas Formas de Fechar**: Clique fora, ESC ou seleção automática

### 🔧 **Experiência do Usuário**

- **Drag & Drop Correto**: Token selecionado pode ser movido imediatamente
- **Feedback Visual**: Notificações confirmando ações
- **Restauração Automática**: Z-index volta ao normal após desseleção
- **Scrollbar Customizada**: Design consistente com o tema do Foundry

## 🚀 Instalação

### Método 1: Instalação Automática

1. Abra o Foundry VTT
2. Vá para **Setup** → **Add-on Modules**
3. Clique em **Install Module**
4. Cole este manifesto: `https://github.com/Sub-Dev/token-stack-selector/releases/latest/download/module.json`
5. Clique em **Install**

### Método 2: Instalação Manual

1. Baixe o arquivo ZIP da [última release](https://github.com/Sub-Dev/token-stack-selector/releases/latest)
2. Extraia na pasta `Data/modules/` do seu Foundry VTT
3. Reinicie o Foundry VTT
4. Ative o módulo no mundo desejado

## 🎮 Como Usar

1. **Preview ao Passar o Mouse**: Simplesmente passe o mouse sobre tokens empilhados para ver um preview de todos os tokens (aparece após 800ms)
2. **Tokens Empilhados**: Quando dois ou mais tokens ocupam a mesma posição, o botão aparece automaticamente no Token HUD
3. **Abrir Seletor**: Clique no botão com ícone de mira + grupo de usuários
4. **Escolher Token**: Clique no token desejado no painel que aparece
5. **Interagir**: O token selecionado automaticamente vem para frente e pode ser movido normalmente

## 🖼️ Screenshots

### 🎬 **Demo em Ação**

![Token Stack Selector Demo](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/test-gif.gif)

_Fluxo completo: preview hover → botão HUD → painel de seleção → seleção de token_

---

### 🖱️ **Preview ao Passar o Mouse**

![Hover Preview](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/menu-hover.png)

_Preview moderno mostrando tokens empilhados ao passar o mouse (delay de 800ms)_

---

### 🎯 **Painel de Seleção**

![Selection Panel](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/menu-token-select.png)

_Interface elegante de seleção com detalhes dos tokens e posicionamento inteligente_

---

### 📚 **Menu de Tokens**

![Token Menu](https://github.com/Sub-Dev/token-stack-selector/blob/master/screenshots/menu.png)

_Interface completa mostrando todas as funcionalidades do módulo em ação_

## 🔧 Compatibilidade

- **Foundry VTT**: v11 - v13
- **Sistemas**: Compatível com todos os sistemas
- **Módulos**: Não há conflitos conhecidos

## 📝 Notas de Versão

### v1.0.0

- ✅ Interface moderna com design premium
- ✅ Seleção inteligente de tokens empilhados
- ✅ Sistema de z-index automático
- ✅ Animações e feedback visual
- ✅ Suporte a múltiplas formas de interação

## 🏗️ Arquitetura do Módulo

Este módulo usa uma **arquitetura modular** para melhor manutenibilidade e escalabilidade:

```
src/
├── components/           # Componentes de UI
│   ├── token-hooks-manager.js
│   ├── token-selection-panel.js
│   └── token-stack-button.js
├── utils/               # Utilitários e helpers
│   ├── token-detector.js
│   └── token-layer-manager.js
├── styles/              # Estilos CSS
│   └── token-stack-styles.js
└── token-stack-selector.js  # Orquestrador principal
```

### Comandos de Debug

Abra o console do navegador e use:

```javascript
TokenStackSelector.debug(); // Informações de debug
TokenStackSelector.getStats(); // Estatísticas do módulo
TokenStackSelector.reload(); // Recarregar módulo
TokenStackSelector.shutdown(); // Desligar módulo
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes detalhadas.

### 📸 Contribuindo com Screenshots

Ajude a melhorar a documentação adicionando screenshots:

1. Verifique [screenshots/README.md](screenshots/README.md) para imagens necessárias
2. Tire screenshots de alta qualidade mostrando o módulo em ação
3. Siga as convenções de nomenclatura especificadas
4. Envie via Pull Request com mensagens de commit descritivas

## 🐛 Reportar Bugs

Encontrou um problema? [Abra uma issue](https://github.com/Sub-Dev/token-stack-selector/issues) com:

- Versão do Foundry VTT
- Versão do módulo
- Passos para reproduzir o bug
- Screenshots (se aplicável)

## 📄 Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.

## 🙏 Agradecimentos

- Comunidade Foundry VTT Brasil
- Desenvolvedores do Foundry VTT
- Todos os usuários que testaram e forneceram feedback

---

**Desenvolvido com ❤️ para a comunidade Foundry VTT**
