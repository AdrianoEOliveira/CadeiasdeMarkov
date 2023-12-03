import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "./maps/mapa1.js";
import modeloMapa2 from "./maps/mapa2.js";
import Sprite from "./Sprite.js";

export default class CenaJogo extends Cena {
  quandoColidir(a, b) {
    if (!this.aRemover.includes(a) && !a.tags.has("pc")) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.assets.play("boom");
      this.game.selecionaCena("fim");
    } else {
      if (a.tags.has("enemy") && b.tags.has("enemy")) {
        this.assets.play("boom");
        this.game.pontuacao++;
        this.game.eliminacoes++;
      }
    }
  }
  preparar() {
    super.preparar();
    this.markov.adicionaEstado("Piso");
    this.markov.adicionaEstado("Pedra");
    this.markov.adicionaEstado("Parede");
    this.markov.adicionaEstado("Bau");
    this.treinarMarkov();

    let mapa = new Mapa(this.LINHAS, this.COLUNAS, 32);
    this.iniciaMapa(mapa);
    this.mapa = mapa;
    for (let k = 0; k < 10; k++) {
      const oldTiles = structuredClone(this.mapa.tiles);
      const newTiles = structuredClone(this.mapa.tiles);

      for (let l = 1; l < this.LINHAS - 1; l++) {
        for (let c = 1; c < this.COLUNAS - 1; c++) {
          let proximo = this.markov.proximo([
            newTiles[l][c - 1],
            newTiles[l - 1][c - 1],
            newTiles[l - 1][c],
            //newTiles[l-1][c+1],
            //newTiles[l][c+1],
            //newTiles[l+1][c+1],
            //newTiles[l+1][c],
            //newTiles[l+1][c-1],
          ]);
          if (proximo >= 0) {
            newTiles[l][c] = proximo;
          }
        }
      }
      this.mapa.tiles = newTiles;
    }

    this.configuraMapa(mapa);
  }
  iniciaMapa(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = 0;
      }
    }
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = 2;
        }
        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = 1;
        }
      }
    }
    mapa.cena = this;
  }
  treinarMarkov() {
    this.markov.treino();
  }
}
