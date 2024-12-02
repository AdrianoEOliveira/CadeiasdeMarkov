import { vi } from 'vitest';
import AssetManager from "../js/AssetManager.js";


global.HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    // Adicione outros métodos que você precise simular aqui
    getImageData: vi.fn().mockReturnValue({ data: [] }),
    putImageData: vi.fn(),
    createImageData: vi.fn().mockReturnValue([]),
    setTransform: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    measureText: vi.fn().mockReturnValue({ width: 0 }),
    with: vi.fn(),
  });
  
  // Mock da classe Image
  global.Image = vi.fn().mockImplementation(() => ({
    width: 100,
    height: 100,
    onload: null,
    onerror: null,
    src: '',
    addEventListener: vi.fn((event, callback) => {
      if (event === 'load') {
        // Simula o evento de carregamento após um pequeno atraso
        setTimeout(callback, 100);
      }
    }),
  }));