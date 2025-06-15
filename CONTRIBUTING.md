# Guia de Contribuição

Obrigado por considerar contribuir com o **Token Stack Selector**! 🎉

## 🤝 Como Contribuir

### Reportando Bugs

Encontrou um bug? Ajude-nos a melhorar!

1. **Verifique se já não foi reportado** nas [Issues](https://github.com/Sub-Dev/token-stack-selector/issues)
2. **Use o template de bug** ao criar uma nova issue
3. **Forneça informações detalhadas**:
   - Versão do Foundry VTT
   - Versão do módulo
   - Sistema utilizado (D&D 5e, PF2e, etc.)
   - Passos para reproduzir
   - Screenshots/vídeos se possível

### Sugerindo Melhorias

Tem uma ideia incrível? Queremos ouvir!

1. **Verifique se já não foi sugerido** nas Issues
2. **Use o template de feature request**
3. **Descreva detalhadamente**:
   - Problema que resolve
   - Solução proposta
   - Mockups se aplicável

### Desenvolvendo

#### Pré-requisitos

- Node.js 16+ (se usando ferramentas de build)
- Foundry VTT (para testes)
- Git

#### Setup Local

```bash
# Clone o repositório
git clone https://github.com/Sub-Dev/token-stack-selector.git
cd token-stack-selector

# Crie um link simbólico na pasta de módulos do Foundry
# Windows (Admin):
mklink /D "C:\Users\SEU_USUARIO\AppData\Local\FoundryVTT\Data\modules\token-stack-selector" "C:\CAMINHO\PARA\token-stack-selector"

# Linux/Mac:
ln -s /caminho/para/token-stack-selector ~/.local/share/FoundryVTT/Data/modules/token-stack-selector
```

#### Padrões de Código

- **JavaScript**: ES6+ com JSDoc quando necessário
- **CSS**: Use as classes existentes do Foundry quando possível
- **Comentários**: Em português para facilitar contribuições da comunidade brasileira
- **Formatação**: Use 2 espaços para indentação

#### Estrutura de Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

Corpo da mensagem (opcional)

Rodapé (opcional)
```

**Tipos:**

- `feat`: nova funcionalidade
- `fix`: correção de bug
- `docs`: documentação
- `style`: formatação/estilo
- `refactor`: refatoração
- `test`: testes
- `chore`: tarefas de manutenção

**Exemplos:**

```bash
feat(ui): adicionar suporte a tema escuro
fix(selection): corrigir problema com tokens invisíveis
docs(readme): atualizar instruções de instalação
```

#### Processo de Pull Request

1. **Fork** o repositório
2. **Crie uma branch** para sua feature/correção:
   ```bash
   git checkout -b feature/minha-feature
   # ou
   git checkout -b fix/meu-bug
   ```
3. **Desenvolva e teste** suas mudanças
4. **Commit** seguindo os padrões
5. **Push** para seu fork:
   ```bash
   git push origin feature/minha-feature
   ```
6. **Abra um Pull Request** com:
   - Título descritivo
   - Descrição detalhada das mudanças
   - Screenshots/GIFs se aplicável
   - Referência a issues relacionadas

#### Testes

Antes de submeter, teste:

- ✅ Módulo carrega sem erros
- ✅ Funcionalidade principal funciona
- ✅ Não quebra funcionalidades existentes
- ✅ Interface responsiva
- ✅ Compatibilidade com diferentes sistemas

## 📋 Checklist do Contribuidor

- [ ] Li e entendi este guia
- [ ] Testei minhas mudanças localmente
- [ ] Segui os padrões de código
- [ ] Atualizei documentação se necessário
- [ ] Meu código não quebra funcionalidades existentes

## 🎯 Áreas Prioritárias

Contribuições são especialmente bem-vindas em:

1. **Tradução/Localização**
2. **Testes em diferentes sistemas**
3. **Performance/Otimização**
4. **Acessibilidade**
5. **Documentação**

## 💬 Comunicação

- **Issues**: Para bugs e sugestões
- **Discussions**: Para dúvidas e ideias
- **Discord**: `sub-dev` para chat direto

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma [Licença MIT](LICENSE).

---

**Obrigado por tornar este projeto melhor! 🚀**
