

const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;
const Vazio = 10;

export default class Markov {
  constructor(
    assets,
    canvas,
    linhas,
    colunas,
    grid,
    tamanhoimagem,
    imagem,
    numero_de_iteracoes,
    modelo,
    newTiles,
    metodo
  ) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.GRID = grid;
    this.TAMANHOIMAGEM = tamanhoimagem;
    this.IMAGEM = imagem;
    this.iteracoes = numero_de_iteracoes;
    this.modelo = modelo;
    this.newTiles = newTiles;
    this.metodo = metodo;

    this.dados = [];

    this.tiles = [];

    this.dadosBacktracking = [];
    this.backVezes = [];

    this.escolhidos = [];
    this.dadosEscolhidos = [];

    this.contagem = [];
    this.estados = [];
    this.probabilidades = [];
    this.probabilidadesGlobal = [];
    this.porcentagemDeUso = [];

    this.corte = 0.25;
    this.totalGlobal = 0;
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
  }

  zeraTreino() {
    this.backVezes = [];
    this.escolhidos = [];
    this.contagem = [];
    this.estados = [];
    this.probabilidades = [];
    this.probabilidadesGlobal = [];
    this.porcentagemDeUso = [];
    this.totalGlobal = 0;
  }

  zeraTabela() {
    this.dados = [];
    this.dadosBacktracking = [];
    this.dadosEscolhidos = [];
  }

  adicionaEstado(estado) {
    this.estados.push(estado);
  }

  iniciaPorcentagem(ordems) {
    for (let i = 0; i < ordems.length; i++) {
      this.porcentagemDeUso[ordems[i].toString()] = 0;
    }
  }

  Porcentagem(value) {
    this.corte = value
  }

  getPorcentagem() {
    return this.porcentagemDeUso;
  }

  adicionaVezesEscolhidos(vizinhos, alvo) {
    const chave = vizinhos.join("");
    if (this.escolhidos[chave] === undefined) {
      this.escolhidos[chave] = [];

      for (let i = 0; i < this.estados.length; i++) {
        this.escolhidos[chave][this.estados[i]] = 0;
      }
    }
    this.escolhidos[chave][alvo]++;
  }

  adicionaBacktracking(vizinhos, ordem) {
    const chave = vizinhos.join("");
    if (this.backVezes[chave] === undefined) {
      this.backVezes[chave] = [];

      for (let i = 0; i < 4; i++) {
        this.backVezes[chave][i] = 0;
      }
    }
    this.backVezes[chave][ordem - 1]++;
  }

  soma(vizinhos, alvo) {
    const chave = vizinhos.join("");
    if (this.contagem[chave] === undefined) {
      this.contagem[chave] = [];
      this.probabilidades[chave] = [];

      for (let i = 0; i < this.estados.length; i++) {
        this.contagem[chave][this.estados[i]] = 0;
        this.probabilidades[chave][this.estados[i]] = 0;
      }
    }

    this.contagem[chave][alvo]++;
  }
  calculate() {
    let vizinhos = Object.keys(this.contagem);
    for (const vizinho of vizinhos) {
      let total = 0;
      let chaves = Object.keys(this.contagem[vizinho]);
      for (const chave of chaves) {
        total = total + this.contagem[vizinho][chave];
      }
      for (const chave of chaves) {
        this.probabilidades[vizinho][chave] =
          this.contagem[vizinho][chave] / total;
      }
    }
    for (let i = 0; i < this.estados.length; i++) {
      this.probabilidadesGlobal[this.estados[i]] =
        this.probabilidadesGlobal[this.estados[i]] / this.totalGlobal;
    }
    //console.log(this.probabilidadesGlobal)
  }

  getProbabilidades(vizinho, alvo) {
    if (this.probabilidades[vizinho] === undefined) {
      return this.probabilidadesGlobal[alvo];
    }
    return this.probabilidades[vizinho][alvo];
  }

  separarPorNumerosEMaiusculas(string) {
    return string.split(/(?=\d)|(?=[A-Z])/);
  }

  converterEstado(vizinhos) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (vizinhos[i][j] == "Piso") vizinhos[i][j] = Piso;
        if (vizinhos[i][j] == "Pedra") vizinhos[i][j] = Pedra;
        if (vizinhos[i][j] == "Parede") vizinhos[i][j] = Parede;
        if (vizinhos[i][j] == "Bau") vizinhos[i][j] = Bau;
        if (vizinhos[i][j] == "Vazio") vizinhos[i][j] = Vazio;
      }
    }
    return vizinhos;
  }

  converterImagem() {
    for (let i = 0; i < this.estados.length; i++) {
      this.probabilidadesGlobal[this.estados[i]] = 0;
    }
    let img = new Image();
    img = this.assets.Img(this.IMAGEM);
    console.log(this)
    this.canvas.width = img.width;
    this.canvas.height = img.height;

    this.ctx.drawImage(img, 0, 0);

    let tiles = []
    for (let i = 0; i < this.TAMANHOIMAGEM; i++) {
      tiles[i] = [];
      for (let j = 0; j < this.TAMANHOIMAGEM; j++) {
        let pixel = this.ctx.getImageData(j - 1, i - 1, 1, 1);
        let corRgb = pixel.data;
        if (corRgb[0] == 0 && corRgb[1] == 0 && corRgb[2] == 0) {
          tiles[i][j] = "Pedra"
        } else {
          if (corRgb[0] == 255 && corRgb[1] == 255 && corRgb[2] == 255) {
            tiles[i][j] = "Piso"
          } else {
            if (corRgb[0] == 32 && corRgb[1] == 32 && corRgb[2] == 32) {
              tiles[i][j] = "Parede"
            } else {
              if (corRgb[0] == 255 && corRgb[1] == 255 && corRgb[2] == 0) {
                tiles[i][j] = "Bau"
              } else {
                console.log(i, j, corRgb);
              }
            }
          }
        }
      }
    }
    return tiles
  }
}