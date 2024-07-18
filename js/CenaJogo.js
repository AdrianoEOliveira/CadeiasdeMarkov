import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "./maps/mapa1.js";
import modeloMapa2 from "./maps/mapa2.js";
import Sprite from "./Sprite.js";

const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau =3;

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
    
    this.gerar()
  }

  lowMarkov(z) {
    if (this.markov.newTiles == "sim") {
      for (let k = 0; k < z; k++) 
      {
        const oldTiles = structuredClone(this.mapa.tiles);
        const newTiles = structuredClone(this.mapa.tiles);

        for (let l = 2; l < this.LINHAS - 2; l++) {
          for (let c = 2; c < this.COLUNAS - 2; c++) {
            let ordem = this.markov.verificaBacktracking(
              newTiles,
              l,
              c,
              8,
              " "
            );
            let proximo = this.markov.proximo(
              this.markov.getVizinho(newTiles, l, c, ordem)
            );
            if (proximo >= 0) {
              newTiles[l][c] = proximo;
            }
          }
        }
        this.mapa.tiles = newTiles;
      }
    } 
    else {
      for (let k = 0; k < z; k++) {
        const oldTiles = structuredClone(this.mapa.tiles);
        const newTiles = structuredClone(this.mapa.tiles);

        for (let l = 2; l < this.LINHAS - 2; l++) {
          for (let c = 2; c < this.COLUNAS - 2; c++) {
            let ordem = this.markov.verificaBacktracking(
              oldTiles,
              l,
              c,
              8,
              " "
            );
            let proximo = this.markov.proximo(
              this.markov.getVizinho(oldTiles, l, c, ordem)
            );
            if (proximo >= 0) {
              newTiles[l][c] = proximo;
            }
          }
        }
        this.mapa.tiles = newTiles;
      }
    }
    return this.mapa.tiles;
  }

  highMarkov(z) {
    if (this.markov.newTiles == "sim") {
      for (let k = 0; k < z; k++) {
        //const oldTiles = structuredClone(this.mapa.tiles);
        const newTiles = structuredClone(this.mapa.tiles);

        let tamanhoGrid = this.markov.TAMANHOIMAGEM / this.markov.GRID;
        tamanhoGrid = Math.floor(tamanhoGrid);
        let separadorl = Math.floor((this.LINHAS - 4) / tamanhoGrid);
        let separadorC = Math.floor((this.COLUNAS - 4) / tamanhoGrid);
        let gi = 0;
        for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
          for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) 
          {
            for (
              let l = gridI * separadorl + 2;
              l < (gridI + 1) * separadorl + 2;
              l++
            ) {
              for (
                let c = gridJ * separadorC + 2;
                c < (gridJ + 1) * separadorC + 2;
                c++
              ) {
                let ordem = this.markov.verificaBacktrackingHigh(
                  newTiles,
                  l,
                  c,
                  8,
                  gi,
                  " "
                );
                console.log(l,c,gi)
                let proximo = this.markov.proximoHigh(
                  this.markov.getVizinho(newTiles, l, c, ordem,
                  ),gi
                );
                if (proximo >= 0) {
                  newTiles[l][c] = proximo;
                }
              }
            }
            gi++;
          }
        }
        this.mapa.tiles = newTiles;
      }
    } 
    else 
    {
      for (let k = 0; k < z; k++) {
        const oldTiles = structuredClone(this.mapa.tiles);
        const newTiles = structuredClone(this.mapa.tiles);

        let tamanhoGrid = this.markov.TAMANHOIMAGEM / this.markov.GRID;
        tamanhoGrid = Math.floor(tamanhoGrid);
        let separadorl = (this.LINHAS - 4) / tamanhoGrid;
        let separadorC = (this.COLUNAS - 4) / tamanhoGrid;
        let gi = 0;
        for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
          for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) {
            for (
              let l = gridI * separadorl + 2;
              l < (gridI + 1) * separadorl + 2;
              l++
            ) {
              for (
                let c = gridJ * separadorC + 2;
                c < (gridJ + 1) * separadorC + 2;
                c++
              ) {
                let ordem = this.markov.verificaBacktrackingHigh(
                  oldTiles,
                  l,
                  c,
                  8,
                  gi,
                  " "
                );
                let proximo = this.markov.proximoHigh(
                  this.markov.getVizinho(oldTiles, l, c, ordem),
                  gi
                );
                if (proximo >= 0) {
                  newTiles[l][c] = proximo;
                }
              }
            }
          }
          gi++;
        }
        this.mapa.tiles = newTiles;
      }
    }
    
    return this.mapa.tiles;
  }

  gerar() {
    let mapa = new Mapa(this.LINHAS, this.COLUNAS, 32);
    this.iniciaMapa(mapa);
    this.mapa = mapa;
    mapa.tiles[0][1] = Pedra;
    mapa.tiles[0][this.COLUNAS-2] = Pedra;
    mapa.tiles[1][0] = Pedra;
    mapa.tiles[1][this.COLUNAS-1] = Pedra;

    mapa.tiles[this.LINHAS-1][1] = Pedra;
    mapa.tiles[this.LINHAS-2][0] = Pedra;
    mapa.tiles[this.LINHAS-1][this.COLUNAS-2] = Pedra;
    mapa.tiles[this.LINHAS-2][this.COLUNAS-1] = Pedra;
    mapa.cena = this

    let z = this.markov.iteracoes;
    if(z>0)
    {
    if (this.markov.metodo == "high") {
      mapa.tiles = this.highMarkov(z);
    } else {
      mapa.tiles = this.lowMarkov(z);
    }
    }
    this.configuraMapa(mapa);
  }

  iniciaConfiguracao() {
    this.markov.adicionaEstado("Piso");
    this.markov.adicionaEstado("Pedra");
    this.markov.adicionaEstado("Parede");
    this.markov.adicionaEstado("Bau");
  }

  iniciaMapa(mapa) {
    if (this.markov.modelo == "xadrez") {
      return this.modeloXadrez(mapa);
    }
    if (this.markov.modelo == "padrao") {
      return this.modeloPadrao(mapa);
    }
    if (this.markov.modelo == "aleatorio") {
      return this.modeloPadraoComAleatorio(mapa);
    }
    if (this.markov.modelo == "X") {
      return this.modeloX(mapa);
    }
    if (this.markov.modelo == "Xpedra") {
      return this.modeloXPedra(mapa);
    }
    if (this.markov.modelo == "padraoPedra") {
      return this.modeloPadraoPedra(mapa)
    }
    if (this.markov.modelo == "padrao2partes") {
      return this.modeloDivide2partes(mapa)
    }
    if (this.markov.modelo == "padrao4partes") {
      return this.modeloDivide4partes(mapa)
    }
    if (this.markov.modelo == "padrao8partes") {
      return this.modeloDivide8partes(mapa)
    }
    //if(this.markov.modelo == "usuario")
    //{
    //return this.modeloUsuario(mapa)
    //}
  }

  modeloXadrez(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        /*
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Parede;
          continue;
        }
        */
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = (l + c) % 2 === 0 ? Parede : Piso;
          continue;
        }
        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {
          /*
          if(Math.random()< 0.1)
          {
          mapa.tiles[l][c] = Parede
          }
          */
        }
      }
    }
    mapa.cena = this;
  }

  modeloPadrao(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Parede;
          continue;
        }

        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {
          /*
          if(Math.random()< 0.1)
          {
          mapa.tiles[l][c] = Parede
          }
          */
        }
      }
    }

    mapa.cena = this;
  }

  modeloPadraoPedra(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Pedra;
          continue;
        }

        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {
          /*
          if(Math.random()< 0.1)
          {
          mapa.tiles[l][c] = Parede
          }
          */
        }
      }
    }

    mapa.cena = this;
  }

  modeloX(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Parede;
          continue;
        }

        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {

        }
      }
    }
    for (let i = 0; i < Math.min(this.LINHAS, this.COLUNAS); i++) {
      mapa.tiles[i][i] = Parede;
      mapa.tiles[i][this.COLUNAS - 1 - i] = Parede;
    }
    mapa.tiles[0][0] = Pedra;
    mapa.tiles[0][this.COLUNAS-1] = Pedra;
    mapa.tiles[this.LINHAS-1][0] = Pedra;
    mapa.tiles[this.LINHAS-1][this.COLUNAS-1] = Pedra;

    mapa.cena = this;
  }

  modeloXPedra(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }

    for (let i = 0; i < Math.min(this.LINHAS, this.COLUNAS); i++) {
      mapa.tiles[i][i] = Pedra;
      mapa.tiles[i][this.COLUNAS - 1 - i] = Pedra;
    }

    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Parede;
          continue;
        }

        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {

        }
      }
    }
    mapa.tiles[0][0] = Pedra;
    mapa.tiles[0][this.COLUNAS-1] = Pedra;
    mapa.tiles[this.LINHAS-1][0] = Pedra;
    mapa.tiles[this.LINHAS-1][this.COLUNAS-1] = Pedra;

    mapa.cena = this;
  }

  modeloDivide2partes(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }

    let x = Math.floor(this.LINHAS/2);
    let y = Math.floor(this.COLUNAS/2)

    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Parede;
          continue;
        }

        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {
          if((l >= 1 && c >=1) && (l ==x || y==c))
            mapa.tiles[l][c] = Parede

        }
      }
    }

    mapa.cena = this;
  }

  modeloDivide4partes(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }

    let x = [Math.floor(this.LINHAS / 4), Math.floor(this.LINHAS / 2), Math.floor((3 * this.LINHAS) / 4)];
    let y = [Math.floor(this.COLUNAS / 4), Math.floor(this.COLUNAS / 2), Math.floor((3 * this.COLUNAS) / 4)];
  

    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Parede;
          continue;
        }

        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {
          if((l >= 1 && c >=1) && (l == x[0] || l ==x[1] || l==x[2] || c == y[0] || c ==y[1] || c==y[2]))
            mapa.tiles[l][c] = Parede

        }
      }
    }

    mapa.cena = this;
  }
  modeloDivide8partes(mapa) {
    for (let l = 0; l < this.LINHAS; l++) {
      mapa.tiles[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
        mapa.tiles[l][c] = Piso;
      }
    }
    let n = this.LINHAS;
    let m = this.COLUNAS
    let linhasDivisoriasHorizontais = [Math.floor(n / 8), Math.floor(n / 4), Math.floor(3 * n / 8), Math.floor(n / 2), Math.floor(5 * n / 8), Math.floor(3 * n / 4), Math.floor(7 * n / 8)];
    let colunasDivisoriasVerticais = [Math.floor(m / 8), Math.floor(m / 4), Math.floor(3 * m / 8), Math.floor(m / 2), Math.floor(5 * m / 8), Math.floor(3 * m / 4), Math.floor(7 * m / 8)];
  

    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        if (l == 1 || l == this.LINHAS - 2 || c == 1 || c == this.COLUNAS - 2) {
          mapa.tiles[l][c] = Parede;
          continue;
        }

        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        } else {

        }
      }
    }

    for (let i of linhasDivisoriasHorizontais) {
      for (let j = 2; j <this.COLUNAS-1; j++) {
        mapa.tiles[i][j] = Parede;
      }
    }
  
    for (let j of colunasDivisoriasVerticais) {
      for (let i = 2; i < this.LINHAS-1; i++) {
        mapa.tiles[i][j] = Parede;
      }
    }

    mapa.cena = this;
  }

  modeloPadraoComAleatorio(mapa) {
    mapa.tiles = this.markov.tiles;
    mapa.cena = this;
  }
  treinarMarkov() {
    this.markov.zeraTreino();
    this.iniciaConfiguracao();
    this.markov.treino();
  }
}
