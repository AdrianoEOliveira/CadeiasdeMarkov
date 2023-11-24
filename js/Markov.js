export default class Markov {
  constructor(
    assets,
    canvas,
    LINHAS,
    COLUNAS,
    GRID,
    TAMANHOIMAGEM,
    IMAGEM,
  ) {
    this.LINHAS = LINHAS;
    this.COLUNAS = COLUNAS;
    this.GRID = GRID;
    this.TAMANHOIMAGEM = TAMANHOIMAGEM;
    this.IMAGEM = IMAGEM;
    this.counts = [];
    this.states = [];
    this.possibilidades = [];
    this.assets = assets;
    this.canvas = canvas;
    //this.ordem = ordem
    this.ctx = canvas.getContext("2d");
  }
  soma(states, target) {
    const key = states.join("");
    if (this.counts[key] === undefined) {
      this.counts[key] = [];
      this.possibilidades[key] = [];
      for (let i = 0; i < this.states.length; i++) {
        this.counts[key][this.states[i]] = 0;
        this.possibilidades[key][this.states[i]] = 0;
      }
      //this.counts[key] = [Array(this.states.length).fill(0)];
    }
    this.counts[key][target]++;
  }
  calculate() {
    let iterator = Object.keys(this.counts);
    for (const key of iterator) {
      let total = 0;
      let it2 = Object.keys(this.counts[key]);
      for (const key2 of it2) {
        total = total + this.counts[key][key2];
      }
      for (const key2 of it2) {
        this.possibilidades[key][key2] = this.counts[key][key2] / total;
      }
    }
    console.log(this.possibilidades);
  }
  getProbabilite(key, state) {
    if (this.possibilidades[key] === undefined) {
      //console.log(key);
      return 0.0;
    }
    return this.possibilidades[key][state];
  }

  proximo(anteriores) {
    let indice = []
    for(let i = 0 ;i< anteriores.length;i++)
    {
      indice[i] = this.states[anteriores[i]];
    }
    let key = indice.join("");
    let x = 0;
    let limite = Math.random();
    let total = 0;
    for (let i = 0; i < this.states.length; i++) {
      total += this.getProbabilite(key, this.states[i]);
      if (total >= limite) {
        x = i;
        break;
      }
    }
    if(total==0)
    {
      console.log("Erro na geração vizinho não existe ", key);
    }
    return x;
  }

  // Add a single state or states
  addStates(tile) {
    this.states.push(tile);
  }

  treino() {
    let img = new Image();
    img = this.assets.Img(this.IMAGEM);
    this.ctx.drawImage(img, 0, 0);
    //img.style.display = "none";

    let tamanhoGrid = this.TAMANHOIMAGEM / this.GRID;
    for (let gi = 0; gi < tamanhoGrid; gi++) {
      for (let gj = 0; gj < tamanhoGrid; gj++) {
        let MarkovTile = [];

        for (let i = gi * this.GRID; i < gi * this.GRID + this.GRID; i++) {
          MarkovTile[i % this.GRID] = [];
          for (let j = gj * this.GRID; j < gj * this.GRID + this.GRID; j++) {
            let pixel = this.ctx.getImageData(j, i, 1, 1);
            let data = pixel.data;
            //const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
            //console.log(data)
            if (data[0] == 0 && data[1] == 0 && data[2] == 0) {
              //this.possibilidades[ant][0] = this.possibilidades[ant][0] + 1;
              //Cor Preto
              // pedra
              MarkovTile[i % this.GRID][j % this.GRID] = "Pedra";
            } else {
              if (data[0] == 255 && data[1] == 255 && data[2] == 255) {
                //this.possibilidades[ant][1] = this.possibilidades[ant][1] + 1;
                //Cor Branca
                //Piso
                //possibilete == 4 == vizinho pedra e 2 piso
                MarkovTile[i % this.GRID][j % this.GRID] = "Piso";
              } else {
                if (data[0] == 32 && data[1] == 32 && data[2] == 32) {
                  MarkovTile[i % this.GRID][j % this.GRID] = "Parede";
                  //Cinza
                  //parede
                } else {
                  if (data[0] == 255 && data[1] == 255 && data[2] == 0) {
                    MarkovTile[i % this.GRID][j % this.GRID] = "Bau";
                    //bau
                    //Amarelo
                  } else {
                    console.log(i, j, data);
                  }
                }
              }
            }
            //cont = cont + 1;
            //console.log(rgba)
          }
        }
        //tratamento borda coluna 0 e n-1 // diagonal - y - x
        for (let ii = 0; ii < this.GRID; ii++) {
          let jj1 = 0;
          let jj2 = this.GRID - 1;
          let aux1 = 0;
          let aux2 = 0;
          let atual1 = MarkovTile[ii][jj1];
          let atual2 = MarkovTile[ii][jj2];
          if (ii == 0) {
            aux1 = [
              MarkovTile[ii][jj1],
              MarkovTile[ii][jj1],
              MarkovTile[ii][jj1],
            ];
            aux2 = [
              MarkovTile[ii][jj2 - 1],
              MarkovTile[ii][jj2 -1],
              MarkovTile[ii][jj2],
            ];
          } else {
            aux1 = [
              MarkovTile[ii][jj1],
              MarkovTile[ii - 1][jj1],
              MarkovTile[ii -1][jj1],
            ];
            aux2 = [
              MarkovTile[ii][jj2 - 1],
              MarkovTile[ii - 1][jj2 -1 ],
              MarkovTile[ii-1][jj2],
            ];
          }
          this.soma(aux1, atual1);
          this.soma(aux2, atual2);
        }
        //tratamento borda linha 0 e n-1 // diagonal - y - x
        for (let jj = 1; jj < this.GRID - 1; jj++) {
          let ii1 = 0;
          let ii2 = this.GRID - 1;
          let aux1 = 0;
          let aux2 = 0;
          let atual1 = MarkovTile[ii1][jj];
          let atual2 = MarkovTile[ii2][jj];
          aux1 = [
            MarkovTile[ii1][jj - 1],
            MarkovTile[ii1][jj - 1],
            MarkovTile[ii1][jj],
          ];
          aux2 = [
            MarkovTile[ii2 ][jj - 1],
            MarkovTile[ii2 - 1][jj -1],
            MarkovTile[ii2-1][jj],
          ];
          this.soma(aux1, atual1);
          this.soma(aux2, atual2);
        }
        for (let ii = 1; ii < this.GRID - 1; ii++) {
          for (let jj = 1; jj < this.GRID - 1; jj++) {
            let aux = 0;
            let atual = MarkovTile[ii][jj];
            aux = [
              MarkovTile[ii][jj-1],
              MarkovTile[ii -1][jj - 1],
              MarkovTile[ii -1][jj],
            ];
            this.soma(aux, atual);
          }
        }
      }
    }
    this.calculate();
  }
  iniciar() {
    this.treino();
  }

  limpa() {
    this.possibilidadesX = [];
    this.possibilidadesY = [];
    this.tiles = [];
  }
}
