export default class Markov {
  constructor(assets, canvas, linhas, colunas, grid, tamanhoimagem, imagem) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.GRID = grid;
    this.TAMANHOIMAGEM = tamanhoimagem;
    this.IMAGEM = imagem;
    this.contagem = [];
    this.estados = [];
    this.probabilidades = [];
    this.probabilidadesGlobal = [];
    this.falhas = 0
    this.totalGlobal=0;
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  adicionaEstado(estado) {
    this.estados.push(estado);
  }

  getFalhas()
  {
    return this.falhas;
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
    this.totalGlobal++;
    this.probabilidadesGlobal[alvo]++;
  }
  calculate() {
    let vizinhos = Object.keys(this.contagem);
    for (const vizinho of vizinhos) 
    {
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
    for(let i=0;i<this.estados.length;i++)
    {
      this.probabilidadesGlobal[this.estados[i]] = 
      this.probabilidadesGlobal[this.estados[i]] / this.totalGlobal;
    }
    //console.log(this.probabilidadesGlobal)
    console.log(this.probabilidades);
  }

  getProbabilidades(vizinho, alvo) {
    if (this.probabilidades[vizinho] === undefined) {
      return this.probabilidadesGlobal[alvo];
    }
    return this.probabilidades[vizinho][alvo];
  }
  
  getVizinho(tile,l,c)
  {
    let vizinho = [
      tile[l][c - 1],
      tile[l - 1][c - 1],
      tile[l - 1][c],
      //tile[l - 1][c + 1],
      //tile[l][c + 1],
      //tile[l + 1][c + 1],
      //tile[l + 1][c],
      //tile[l + 1][c - 1],
    ]
    return vizinho;
  }

  proximo(anteriores) {
    let indice = [];
    for (let i = 0; i < anteriores.length; i++) {
      indice[i] = this.estados[anteriores[i]];
    }
    let vizinho = indice.join("");
    let x = 0;
    let limite = Math.random();
    let total = 0;
    if(this.probabilidades[vizinho]===undefined)
    {
      this.falhas++;
    }
    for (let i = 0; i < this.estados.length; i++) {
      total += this.getProbabilidades(vizinho, this.estados[i]);
      if (total >= limite) {
        x = i;
        break;
      }
    }
    return x;
  }

  treino() {

    for (let i = 0; i < this.estados.length; i++) {

      this.probabilidadesGlobal[this.estados[i]] = 0;
    }

    let img = new Image();
    img = this.assets.Img(this.IMAGEM);
    this.ctx.drawImage(img, 0, 0);
    //img.style.display = "none";

    let tamanhoGrid = this.TAMANHOIMAGEM / this.GRID;
    for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
      for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) {
        let imagemTile = [];

        for (
          let i = gridI * this.GRID;
          i < gridI * this.GRID + this.GRID;
          i++
        ) {
          imagemTile[i % this.GRID] = [];
          for (
            let j = gridJ * this.GRID;
            j < gridJ * this.GRID + this.GRID;
            j++
          ) {
            let pixel = this.ctx.getImageData(j, i, 1, 1);
            let corRgb = pixel.data;

            if (corRgb[0] == 0 && corRgb[1] == 0 && corRgb[2] == 0) {
              imagemTile[i % this.GRID][j % this.GRID] = "Pedra";
            } else {
              if (corRgb[0] == 255 && corRgb[1] == 255 && corRgb[2] == 255) {
                imagemTile[i % this.GRID][j % this.GRID] = "Piso";
              } else {
                if (corRgb[0] == 32 && corRgb[1] == 32 && corRgb[2] == 32) {
                  imagemTile[i % this.GRID][j % this.GRID] = "Parede";
                } else {
                  if (corRgb[0] == 255 && corRgb[1] == 255 && corRgb[2] == 0) {
                    imagemTile[i % this.GRID][j % this.GRID] = "Bau";
                  } else {
                    console.log(i, j, corRgb);
                  }
                }
              }
            }
          }
        }
        for (let l = 1; l < this.GRID - 1; l++) {
          for (let c = 1; c < this.GRID - 1; c++) {
            let vizinhos = this.getVizinho(imagemTile,l,c);
            let atual = imagemTile[l][c];
            this.soma(vizinhos, atual);
          }
        }
      }
    }
    this.calculate();
  }
}
