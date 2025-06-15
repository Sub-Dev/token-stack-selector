// Sistema para restaurar sort dos tokens quando desselecionados
Hooks.on("controlToken", (token, controlled) => {
  if (!controlled && token._wasMovedToFront) {
    // Restaura o sort original quando o token é desselecionado
    token.document.update({ sort: token._originalSort || 0 });
    delete token._originalSort;
    delete token._wasMovedToFront;
  }
});

// Hook para limpar tokens com sort modificado quando um novo token é selecionado
Hooks.on("controlToken", (token, controlled) => {
  if (controlled) {
    // Restaura sort de outros tokens que foram movidos para frente
    canvas.tokens.placeables.forEach(t => {
      if (t.id !== token.id && t._wasMovedToFront) {
        t.document.update({ sort: t._originalSort || 0 });
        delete t._originalSort;
        delete t._wasMovedToFront;
      }
    });
  }
});

Hooks.on("renderTokenHUD", (hud, html, tokenData) => {
  const token = canvas.tokens.get(tokenData._id);
  const cellX = Math.floor(token.x / canvas.grid.size);
  const cellY = Math.floor(token.y / canvas.grid.size);

  const overlappingTokens = canvas.tokens.placeables.filter(t => {
    const tx = Math.floor(t.x / canvas.grid.size);
    const ty = Math.floor(t.y / canvas.grid.size);
    return tx === cellX && ty === cellY && t.id !== token.id;
  });

  if (overlappingTokens.length === 0) return;

  // Cria botão moderno no HUD
  const button = $(
    `<div class="control-icon select-token-stack" title="Selecionar tokens empilhados (${overlappingTokens.length})">
      <div class="stacked-icons">
        <i class="fas fa-users base-icon"></i>
        <i class="fas fa-crosshairs overlay-icon"></i>
      </div>
      <span class="stack-count">${overlappingTokens.length}</span>
    </div>`
  );

  // Remove painel antigo se existir
  $(".token-stack-panel").remove();

  // Adiciona estilos CSS modernos
  if (!$('#token-stack-styles').length) {
    $('<style id="token-stack-styles">').text(`
      .select-token-stack {
        position: relative;
        background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
        border: 2px solid #718096;
        transition: all 0.2s ease;
      }

      .stacked-icons {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }

      .base-icon {
        font-size: 14px;
        color: #e2e8f0;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
      }

      .overlay-icon {
        position: absolute;
        font-size: 8px;
        color: #fbbf24;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
      }
      
      .select-token-stack:hover {
        background: linear-gradient(135deg, #2b6cb0 0%, #1e40af 100%);
        border-color: #3182ce;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(49, 130, 206, 0.4);
      }
      
      .stack-count {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #e53e3e;
        color: white;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border: 2px solid white;
      }

      .token-stack-panel {
        background: linear-gradient(145deg, #2d3748 0%, #1a202c 100%);
        border: 2px solid #4a5568;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(8px);
        min-width: 200px;
        max-width: 280px;
        animation: slideIn 0.2s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .token-stack-header {
        padding: 12px 16px 8px;
        border-bottom: 1px solid #4a5568;
        background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
        border-radius: 10px 10px 0 0;
      }

      .token-stack-title {
        color: #e2e8f0;
        font-size: 13px;
        font-weight: 600;
        margin: 0;
        text-align: center;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }

      .token-stack-content {
        padding: 8px;
        max-height: 300px;
        overflow-y: auto;
      }

      .token-option {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        margin: 4px 0;
        background: rgba(74, 85, 104, 0.3);
        border: 1px solid transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      }

      .token-option:hover {
        background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
        border-color: #4299e1;
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
      }

      .token-option:active {
        transform: translateX(4px) scale(0.98);
      }

      .token-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #718096;
        margin-right: 12px;
        object-fit: cover;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .token-option:hover .token-avatar {
        border-color: #4299e1;
        box-shadow: 0 0 8px rgba(66, 153, 225, 0.5);
      }

      .token-info {
        flex: 1;
        min-width: 0;
      }

      .token-name {
        color: #e2e8f0;
        font-size: 13px;
        font-weight: 500;
        margin: 0 0 2px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }

      .token-details {
        color: #a0aec0;
        font-size: 11px;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .token-stack-content::-webkit-scrollbar {
        width: 6px;
      }

      .token-stack-content::-webkit-scrollbar-track {
        background: rgba(26, 32, 44, 0.5);
        border-radius: 3px;
      }

      .token-stack-content::-webkit-scrollbar-thumb {
        background: #4a5568;
        border-radius: 3px;
      }

      .token-stack-content::-webkit-scrollbar-thumb:hover {
        background: #718096;
      }
    `).appendTo('head');
  }

  // Adiciona ação de clique
  button.on("click", () => {
    // Remove painéis existentes
    $(".token-stack-panel").remove();

    const panel = $(`
      <div class="token-stack-panel">
        <div class="token-stack-header">
          <h4 class="token-stack-title">Tokens Empilhados (${overlappingTokens.length})</h4>
        </div>
        <div class="token-stack-content">
          ${overlappingTokens.map(t => {
      const actor = t.actor;
      const tokenName = t.name || 'Token Sem Nome';
      const actorType = actor ? actor.type : 'Desconhecido';
      const hp = actor?.system?.attributes?.hp ?
        `${actor.system.attributes.hp.value}/${actor.system.attributes.hp.max} HP` : '';

      return `
              <div class="token-option" data-id="${t.id}" title="Clique para selecionar ${tokenName}">
                <img class="token-avatar" src="${t.document.texture.src}" alt="${tokenName}" />
                <div class="token-info">
                  <p class="token-name">${tokenName}</p>
                  <p class="token-details">${actorType}${hp ? ' • ' + hp : ''}</p>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      </div>
    `);

    // Posicionamento inteligente
    const hudRect = html[0].getBoundingClientRect();
    const panelWidth = 280;
    const panelHeight = Math.min(350, 80 + (overlappingTokens.length * 52));

    let left = hudRect.right + 10;
    let top = hudRect.top;

    // Ajusta se sair da tela
    if (left + panelWidth > window.innerWidth) {
      left = hudRect.left - panelWidth - 10;
    }

    if (top + panelHeight > window.innerHeight) {
      top = window.innerHeight - panelHeight - 10;
    }

    panel.css({
      position: "fixed",
      top: Math.max(10, top) + "px",
      left: Math.max(10, left) + "px",
      zIndex: 1000
    });

    // Adiciona eventos de clique nos tokens
    panel.find(".token-option").on("click", function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      const tid = this.dataset.id;
      const targetToken = canvas.tokens.get(tid);

      if (targetToken) {
        // Animação de seleção
        $(this).css('transform', 'translateX(4px) scale(0.95)');

        setTimeout(() => {
          // Seleciona o token
          canvas.tokens.selectObjects({ releaseOthers: true });
          targetToken.control();

          // Traz o token selecionado para frente usando o método correto do Foundry
          const originalSort = targetToken.document.sort;
          const maxSort = Math.max(...canvas.tokens.placeables.map(t => t.document.sort || 0));

          // Atualizada o sort do documento para trazer para frente
          targetToken.document.update({ sort: maxSort + 1 });

          // Armazena informação para restaurar depois
          targetToken._originalSort = originalSort;
          targetToken._wasMovedToFront = true;

          // Feedback visual
          ui.notifications.info(`Token "${targetToken.name}" selecionado e movido para frente`, {
            permanent: false,
            localize: false
          });

          // Remove o painel
          panel.addClass('removing');
          setTimeout(() => panel.remove(), 100);
        }, 100);
      }
    });

    // Adiciona o painel ao body
    $("body").append(panel);

    // Fecha se clicar fora (com delay para evitar fechamento imediato)
    setTimeout(() => {
      $(document).on("click.stackpanel", (ev) => {
        if (!panel[0].contains(ev.target) && !button[0].contains(ev.target)) {
          panel.addClass('removing');
          setTimeout(() => {
            panel.remove();
            $(document).off("click.stackpanel");
          }, 100);
        }
      });
    }, 100);

    // Fecha com ESC
    $(document).on("keydown.stackpanel", (ev) => {
      if (ev.key === "Escape") {
        panel.remove();
        $(document).off("click.stackpanel keydown.stackpanel");
      }
    });
  });

  html.find(".col.right").append(button);
});
