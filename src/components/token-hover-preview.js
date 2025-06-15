/**
 * Token Hover Preview Component
 * Shows a modern preview of stacked tokens when hovering
 */
export class TokenHoverPreview {
  constructor() {
    this.previewElement = null;
    this.hoverTimeout = null;
    this.isVisible = false;
    this.currentTokens = [];

    this.HOVER_DELAY = 800; // 800ms delay before showing
    this.PREVIEW_OFFSET = 15; // Pixels from cursor

    console.log("Token Hover Preview (Preview de Hover de Tokens): Component initialized");
  }

  /**
   * Initialize hover preview system
   */
  initialize() {
    try {
      this.createPreviewElement();
      this.attachEventListeners();
      console.log("Token Hover Preview (Preview de Hover de Tokens): System initialized successfully");
    } catch (error) {
      console.error("Token Hover Preview (Preview de Hover de Tokens): Failed to initialize", error);
    }
  }

  /**
   * Create the preview element
   */
  createPreviewElement() {
    this.previewElement = document.createElement('div');
    this.previewElement.id = 'token-hover-preview';
    this.previewElement.className = 'token-hover-preview';
    this.previewElement.style.display = 'none';

    document.body.appendChild(this.previewElement);
  }

  /**
   * Attach event listeners to canvas
   */
  attachEventListeners() {
    const canvas = document.getElementById('board');
    if (!canvas) {
      console.warn("Token Hover Preview (Preview de Hover de Tokens): Canvas not found");
      return;
    }

    canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

    // Also listen to clicks to hide preview when user interacts
    canvas.addEventListener('click', this.handleMouseLeave.bind(this));
  }

  /**
   * Handle mouse move over canvas
   */
  handleMouseMove(event) {
    // Clear existing timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    // Get tokens at mouse position
    const tokens = this.getTokensAtPosition(event);

    if (tokens.length > 1) {
      // Multiple tokens found - show preview after delay
      this.hoverTimeout = setTimeout(() => {
        this.showPreview(tokens, event);
      }, this.HOVER_DELAY);
    } else {
      // No stacked tokens - hide preview
      this.hidePreview();
    }
  }

  /**
   * Handle mouse leave canvas
   */
  handleMouseLeave() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.hidePreview();
  }

  /**
   * Get tokens at mouse position
   */
  getTokensAtPosition(event) {
    try {
      if (!canvas || !canvas.tokens) return [];

      const rect = canvas.app.view.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Convert screen coordinates to world coordinates
      const worldPos = canvas.app.stage.toLocal({ x, y });

      // Find tokens at this position
      const tokens = canvas.tokens.placeables.filter(token => {
        if (!token.visible || token.document.hidden) return false;

        // Check if user can see this token
        if (!token.isVisible) return false;

        const bounds = token.bounds;
        return worldPos.x >= bounds.x &&
          worldPos.x <= bounds.x + bounds.width &&
          worldPos.y >= bounds.y &&
          worldPos.y <= bounds.y + bounds.height;
      });

      return tokens;
    } catch (error) {
      console.error("Token Hover Preview (Preview de Hover de Tokens): Error getting tokens at position", error);
      return [];
    }
  }

  /**
   * Show preview with tokens
   */
  showPreview(tokens, event) {
    try {
      this.currentTokens = tokens;
      this.renderPreview(tokens);
      this.positionPreview(event);

      this.previewElement.style.display = 'block';
      this.previewElement.style.opacity = '0';

      // Smooth fade in
      requestAnimationFrame(() => {
        this.previewElement.style.opacity = '1';
      });

      this.isVisible = true;

    } catch (error) {
      console.error("Token Hover Preview (Preview de Hover de Tokens): Error showing preview", error);
    }
  }

  /**
   * Hide preview
   */
  hidePreview() {
    if (!this.isVisible) return;

    this.previewElement.style.opacity = '0';

    setTimeout(() => {
      if (this.previewElement) {
        this.previewElement.style.display = 'none';
      }
      this.isVisible = false;
      this.currentTokens = [];
    }, 200);
  }

  /**
   * Render preview content
   */
  renderPreview(tokens) {
    const sortedTokens = tokens.sort((a, b) => (b.document.sort || 0) - (a.document.sort || 0));

    this.previewElement.innerHTML = `
        <div class="preview-header">
            <i class="fas fa-layer-group"></i>
            <span>Stacked Tokens (Tokens Empilhados)</span>
            <div class="token-count">${tokens.length}</div>
        </div>
        <div class="preview-content">
            ${sortedTokens.map((token, index) => this.renderTokenPreview(token, index, sortedTokens.length)).join('')}
        </div>
        <div class="preview-footer">
            <small>Click token HUD button to select (Clique no botão do HUD para selecionar)</small>
        </div>
    `;
  }

  /**
   * Render individual token preview
   */
  renderTokenPreview(token, index, totalTokens) {
    const actor = token.actor;
    const name = token.name || actor?.name || "Unknown Token (Token Desconhecido)";
    const actorType = actor?.type ? actor.type.charAt(0).toUpperCase() + actor.type.slice(1) : "Token";

    // Get HP info
    let hpInfo = '';
    if (actor?.system?.attributes?.hp) {
      const hp = actor.system.attributes.hp;
      hpInfo = `<div class="token-hp">${hp.value}/${hp.max} HP</div>`;
    }

    // Get avatar
    const avatar = token.document.texture.src || actor?.img || 'icons/svg/mystery-man.svg';

    // Z-index indicator
    const zIndex = index === 0 ? 'top' : index === totalTokens - 1 ? 'bottom' : 'middle';

    return `
        <div class="token-preview-item ${zIndex}" data-token-id="${token.id}">
            <div class="token-avatar">
                <img src="${avatar}" alt="${name}" onerror="this.src='icons/svg/mystery-man.svg'">
                <div class="z-indicator">${index + 1}</div>
            </div>
            <div class="token-info">
                <div class="token-name">${name}</div>
                <div class="token-type">${actorType}</div>
                ${hpInfo}
            </div>
            <div class="token-status ${zIndex}">
                ${index === 0 ? '<i class="fas fa-arrow-up" title="Top (Topo)"></i>' :
        index === totalTokens - 1 ? '<i class="fas fa-arrow-down" title="Bottom (Fundo)"></i>' :
          '<i class="fas fa-minus" title="Middle (Meio)"></i>'}
            </div>
        </div>
    `;
  }

  /**
   * Position preview near cursor
   */
  positionPreview(event) {
    const rect = this.previewElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX + this.PREVIEW_OFFSET;
    let y = event.clientY + this.PREVIEW_OFFSET;

    // Adjust if preview would go off screen
    if (x + rect.width > viewportWidth) {
      x = event.clientX - rect.width - this.PREVIEW_OFFSET;
    }

    if (y + rect.height > viewportHeight) {
      y = event.clientY - rect.height - this.PREVIEW_OFFSET;
    }

    // Ensure preview stays on screen
    x = Math.max(10, Math.min(x, viewportWidth - rect.width - 10));
    y = Math.max(10, Math.min(y, viewportHeight - rect.height - 10));

    this.previewElement.style.left = `${x}px`;
    this.previewElement.style.top = `${y}px`;
  }

  /**
   * Get CSS styles for the preview
   */
  static getStyles() {
    return `
        .token-hover-preview {
            position: fixed;
            z-index: 10000;
            background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            border: 2px solid #4a90e2;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 
                       0 0 20px rgba(74, 144, 226, 0.3);
            min-width: 280px;
            max-width: 350px;
            font-family: "Signika", sans-serif;
            font-size: 13px;
            color: #ffffff;
            backdrop-filter: blur(10px);
            transition: opacity 0.2s ease-in-out;
            pointer-events: none;
        }

        .token-hover-preview .preview-header {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            background: rgba(74, 144, 226, 0.2);
            border-radius: 10px 10px 0 0;
            border-bottom: 1px solid rgba(74, 144, 226, 0.3);
            font-weight: 600;
        }

        .token-hover-preview .preview-header i {
            color: #4a90e2;
            font-size: 14px;
        }

        .token-hover-preview .token-count {
            background: #4a90e2;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            margin-left: auto;
        }

        .token-hover-preview .preview-content {
            padding: 8px;
            max-height: 300px;
            overflow-y: auto;
        }

        .token-hover-preview .token-preview-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 12px;
            margin: 4px 0;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border-left: 3px solid transparent;
            transition: all 0.2s ease;
        }

        .token-hover-preview .token-preview-item.top {
            border-left-color: #4CAF50;
            background: rgba(76, 175, 80, 0.1);
        }

        .token-hover-preview .token-preview-item.bottom {
            border-left-color: #f44336;
            background: rgba(244, 67, 54, 0.1);
        }

        .token-hover-preview .token-preview-item.middle {
            border-left-color: #ff9800;
            background: rgba(255, 152, 0, 0.1);
        }

        .token-hover-preview .token-avatar {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.2);
            flex-shrink: 0;
        }

        .token-hover-preview .token-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .token-hover-preview .z-indicator {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #4a90e2;
            color: white;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            border: 2px solid #2a2a2a;
        }

        .token-hover-preview .token-info {
            flex: 1;
            min-width: 0;
        }

        .token-hover-preview .token-name {
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .token-hover-preview .token-type {
            font-size: 11px;
            color: #cccccc;
            margin-bottom: 2px;
        }

        .token-hover-preview .token-hp {
            font-size: 11px;
            color: #4CAF50;
            font-weight: 500;
        }

        .token-hover-preview .token-status {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
        }

        .token-hover-preview .token-status.top i {
            color: #4CAF50;
        }

        .token-hover-preview .token-status.bottom i {
            color: #f44336;
        }

        .token-hover-preview .token-status.middle i {
            color: #ff9800;
        }

        .token-hover-preview .preview-footer {
            padding: 8px 16px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.2);
            border-radius: 0 0 10px 10px;
        }

        .token-hover-preview .preview-footer small {
            color: #cccccc;
            font-size: 11px;
        }

        /* Custom scrollbar */
        .token-hover-preview .preview-content::-webkit-scrollbar {
            width: 6px;
        }

        .token-hover-preview .preview-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
        }

        .token-hover-preview .preview-content::-webkit-scrollbar-thumb {
            background: #4a90e2;
            border-radius: 3px;
        }

        .token-hover-preview .preview-content::-webkit-scrollbar-thumb:hover {
            background: #357abd;
        }
    `;
  }

  /**
   * Cleanup preview system
   */
  destroy() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    if (this.previewElement) {
      this.previewElement.remove();
      this.previewElement = null;
    }

    console.log("Token Hover Preview (Preview de Hover de Tokens): Component destroyed");
  }
} 