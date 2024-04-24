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
    this.markov.adicionaEstado("Piso");
    this.markov.adicionaEstado("Pedra");
    this.markov.adicionaEstado("Parede");
    this.markov.adicionaEstado("Bau");
    this.treinarMarkov();

    let mapa = new Mapa(this.LINHAS, this.COLUNAS, 32);
    this.iniciaMapa(mapa);
    this.mapa = mapa;
    let z = 1
    for (let  k= 0; k < z; k++) {
      const oldTiles = structuredClone(this.mapa.tiles);
      const newTiles = structuredClone(this.mapa.tiles);

      for (let l = 2; l < this.LINHAS - 2; l++) {
        for (let c = 2; c < this.COLUNAS - 2; c++) {
          let ordem = this.markov.verificaBacktracking(newTiles,l,c,8)
          let proximo = this.markov.proximo(
            this.markov.getVizinho(newTiles,l,c,ordem));
          if (proximo >= 0) {
          newTiles[l][c] = proximo;
          }
        }
      }
      this.mapa.tiles = newTiles;
      
    }
    console.log("Media de falhas em k=",z)
    console.log(this.markov.getPorcentagem())

    this.configuraMapa(mapa);
  }
  iniciaMapa(mapa) {

    
    if(this.markov.modelo == "xadrez")
    {
      return this.modeloXadrez(mapa)
    }
    if(this.markov.modelo == "padrao")
    {
      return this.modeloPadrao(mapa)
    }
    if(this.markov.modelo == "aleatoriedade")
    {
      return this.modeloPadraoComAleatorio(mapa)
    }
    //if(this.markov.modelo == "usuario")
    //{
      //return this.modeloUsuario(mapa)
    //}
  }

  modeloXadrez(mapa)
  {

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
          mapa.tiles[l][c] =(l+c)%2===0? Parede:Piso;
          continue;
        }
        if (l == 0 || l == this.LINHAS - 1 || c == 0 || c == this.COLUNAS - 1) {
          mapa.tiles[l][c] = Pedra;
          continue;
        }
        else
        {
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

  modeloPadrao(mapa)
  {

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
        }
        else
        {
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

  modeloPadraoComAleatorio(mapa)
  {

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
        }
          
          if(Math.random()< 0.1)
          {
          mapa.tiles[l][c] = Parede
          }
          
        
        
      }
    }
    mapa.cena = this;

  }
  treinarMarkov() {
    this.markov.treino();
  }

}
