import Markov from "./Markov.js";

export default class Mapa {
  constructor(linhas = 30, colunas = 30, tamanho = 32, markov) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.TAMANHO = tamanho;
    this.tiles = [];
    for (let l = 0; l < this.LINHAS; l++) {
      this.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        this.tiles[l][c] = 0;
      }
      this.cena = null;
    }
    this.markov = markov;
  }
  desenhar(ctx) {
    let img = new Image();
    img = this.cena.assets.Img("terreno");
    let chest = new Image();
    chest = this.cena.assets.Img("chest");
    let coin = new Image();
    coin = this.cena.assets.Img("coin");
    let linha = 21;
    let coluna = 8;
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        ctx.drawImage(
          img,
          coluna * 32,
          linha * 32,
          32,
          32,
          c * 32,
          l * 32,
          32,
          32
        );
        if (this.tiles[l][c] == 1) {
          ctx.drawImage(img, 21 * 32, 21 * 32, 32, 32, c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 2) {
          ctx.drawImage(chest, 0, 0, 32, 32, c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 3) {
          ctx.drawImage(img, 23 * 32, 23 * 32, 32, 32, c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 4) {
          ctx.drawImage(img, 22 * 32, 21 * 32, 32, 32, c * 32, l * 32, 32, 32);
        }
        if (this.tiles[l][c] == 5) {
          ctx.drawImage(coin, 0, 0, 32, 32, c * 32, l * 32, 32, 32);
        }

        ctx.strokeRect(
          c * this.TAMANHO,
          l * this.TAMANHO,
          this.TAMANHO,
          this.TAMANHO
        );
      }
    }
  }
  carregaMapa() {
    this.markov.addStates(1);
    this.markov.addStates(0);

    this.tiles = this.markov.iniciar();
    this.markov.limpa();

    //this.desenhar()
  }
}
