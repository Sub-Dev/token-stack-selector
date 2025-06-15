/**
 * Estilos CSS para o Token Stack Selector
 * @class TokenStackStyles
 */
export class TokenStackStyles {

  /**
   * Injeta os estilos CSS no documento
   * @static
   */
  static inject() {
    if ($('#token-stack-styles').length) return;

    const styles = `
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

      /* Hover Preview Styles */
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

      /* Custom scrollbar for hover preview */
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

    $('<style id="token-stack-styles">').text(styles).appendTo('head');
  }

  /**
   * Remove os estilos do documento
   * @static
   */
  static remove() {
    $('#token-stack-styles').remove();
  }
} 