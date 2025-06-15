# Token Stack Selector

![Foundry VTT](https://img.shields.io/badge/Foundry%20VTT-Compatible-orange)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Descrição

**Token Stack Selector** é um módulo moderno para Foundry VTT que soluciona o problema de tokens empilhados (sobrepostos). Quando múltiplos tokens ocupam a mesma posição no grid, este módulo adiciona uma interface elegante e intuitiva para selecionar facilmente o token desejado.

## ✨ Características

### 🎯 **Interface Moderna**

- **Design Premium**: Interface similar ao painel de condições nativo do Foundry
- **Ícone Único**: Combinação visual de grupo de usuários + mira para identificação rápida
- **Animações Suaves**: Transições elegantes e feedback visual
- **Contador Visual**: Badge mostrando quantos tokens estão empilhados

### 🖱️ **Funcionalidades Avançadas**

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

1. **Tokens Empilhados**: Quando dois ou mais tokens ocupam a mesma posição, o botão aparece automaticamente no Token HUD
2. **Abrir Seletor**: Clique no botão com ícone de mira + grupo de usuários
3. **Escolher Token**: Clique no token desejado no painel que aparece
4. **Interagir**: O token selecionado automaticamente vem para frente e pode ser movido normalmente

## 🖼️ Screenshots

_// Adicione aqui screenshots do módulo em ação_

## 🔧 Compatibilidade

- **Foundry VTT**: v11 - v12
- **Sistemas**: Compatível com todos os sistemas
- **Módulos**: Não há conflitos conhecidos

## 📝 Notas de Versão

### v1.0.0

- ✅ Interface moderna com design premium
- ✅ Seleção inteligente de tokens empilhados
- ✅ Sistema de z-index automático
- ✅ Animações e feedback visual
- ✅ Suporte a múltiplas formas de interação

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

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
