#!/bin/bash

# Script de Release para Token Stack Selector
# Uso: ./release.sh [versão] [mensagem]
# Exemplo: ./release.sh 1.0.4 "Correção de bugs"

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verifica se está na branch master
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo -e "${RED}Erro: Você precisa estar na branch master para criar uma release${NC}"
    exit 1
fi

# Verifica se há mudanças não commitadas
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Erro: Há mudanças não commitadas. Por favor, faça commit ou stash antes de criar uma release.${NC}"
    exit 1
fi

# Puxa as últimas mudanças
echo -e "${YELLOW}Puxando últimas mudanças do repositório remoto...${NC}"
git pull origin master

# Obtém a versão atual do module.json
CURRENT_VERSION=$(grep -o '"version": "[^"]*"' module.json | cut -d'"' -f4)
echo -e "${GREEN}Versão atual: ${CURRENT_VERSION}${NC}"

# Se a versão foi fornecida como argumento, usa ela, senão usa a do module.json
if [ -z "$1" ]; then
    NEW_VERSION=$CURRENT_VERSION
    echo -e "${YELLOW}Nenhuma versão fornecida, usando versão do module.json: ${NEW_VERSION}${NC}"
else
    NEW_VERSION=$1
    echo -e "${YELLOW}Atualizando module.json para versão: ${NEW_VERSION}${NC}"
    
    # Atualiza a versão no module.json
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"${NEW_VERSION}\"/" module.json
        sed -i '' "s/v[0-9]\+\.[0-9]\+\.[0-9]\+/v${NEW_VERSION}/g" module.json
    else
        # Linux/Git Bash
        sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"${NEW_VERSION}\"/" module.json
        sed -i "s/v[0-9]\+\.[0-9]\+\.[0-9]\+/v${NEW_VERSION}/g" module.json
    fi
fi

# Verifica se a tag já existe
if git rev-parse "v${NEW_VERSION}" >/dev/null 2>&1; then
    echo -e "${RED}Erro: A tag v${NEW_VERSION} já existe!${NC}"
    exit 1
fi

# Mensagem de release
RELEASE_MESSAGE=${2:-"Release v${NEW_VERSION}"}

echo -e "${GREEN}=== Criando Release v${NEW_VERSION} ===${NC}"
echo -e "${YELLOW}Mensagem: ${RELEASE_MESSAGE}${NC}"

# Faz commit das mudanças se houver
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}Fazendo commit das mudanças...${NC}"
    git add module.json CHANGELOG.md
    git commit -m "chore: bump version to ${NEW_VERSION}"
fi

# Cria a tag
echo -e "${YELLOW}Criando tag v${NEW_VERSION}...${NC}"
git tag -a "v${NEW_VERSION}" -m "${RELEASE_MESSAGE}"

# Push das mudanças e tags
echo -e "${YELLOW}Enviando mudanças e tags para o repositório remoto...${NC}"
git push origin master
git push origin "v${NEW_VERSION}"

echo -e "${GREEN}✓ Release v${NEW_VERSION} criada com sucesso!${NC}"
echo -e "${YELLOW}Próximos passos:${NC}"
echo -e "1. Vá para https://github.com/Sub-Dev/token-stack-selector/releases/new"
echo -e "2. Selecione a tag v${NEW_VERSION}"
echo -e "3. Adicione as notas de release baseadas no CHANGELOG.md"
echo -e "4. Anexe o arquivo ZIP do módulo (se necessário)"
echo -e "5. Publique a release"

