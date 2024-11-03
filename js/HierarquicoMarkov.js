import Markov from "./Markov.js";

export default class HierarquicoMarkov extends Markov
{
    constructor(markovInstance) {
        // Usa os atributos da instância de Markov passada
        super(
          markovInstance.assets,
          markovInstance.canvas,
          markovInstance.LINHAS,
          markovInstance.COLUNAS,
          markovInstance.GRID,
          markovInstance.TAMANHOIMAGEM,
          markovInstance.IMAGEM,
          markovInstance.iteracoes,
          markovInstance.modelo,
          markovInstance.newTiles,
          markovInstance.metodo
        );
    }

adicionaDadosBack(vizinhosTabela, vizinho) {
    let vizinhos = [
        [vizinhosTabela[1], vizinhosTabela[2], vizinhosTabela[3]],
        [vizinhosTabela[0], 1000, vizinhosTabela[4]],
        [vizinhosTabela[7], vizinhosTabela[6], vizinhosTabela[5]],
    ];
    vizinhos = this.converterEstado(vizinhos);

    let aux = {
        vizinho: vizinhos,
        Grade: vizinhosTabela[8],
        "Ordem 4": this.backVezes[vizinho][3],
        "Ordem 3": this.backVezes[vizinho][2],
        "Ordem 2": this.backVezes[vizinho][1],
        "Ordem 1": this.backVezes[vizinho][0],
    };
    this.dadosBacktracking.push(aux);
}

adicionaDadosNaTabela(vizinhosTabela, probabilidades, vizinho) {
    if (vizinhosTabela.length == 9) {
      let vizinhos = [
        [vizinhosTabela[1], vizinhosTabela[2], vizinhosTabela[3]],
        [vizinhosTabela[0], 1000, vizinhosTabela[4]],
        [vizinhosTabela[7], vizinhosTabela[6], vizinhosTabela[5]],
      ];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho: vizinhos,
        Grade: vizinhosTabela[8],
        Piso: probabilidades[0],
        Pedra: probabilidades[1],
        Parede: probabilidades[2],
        Bau: probabilidades[3],
      };
      this.dados.push(aux);
      if (this.escolhidos[vizinho] === undefined) {
        return;
      } else {
        let aux = {
          vizinho: vizinhos,
          Grade: vizinhosTabela[8],
          Piso: this.escolhidos[vizinho]["Piso"],
          Pedra: this.escolhidos[vizinho]["Pedra"],
          Parede: this.escolhidos[vizinho]["Parede"],
          Bau: this.escolhidos[vizinho]["Bau"],
        };
        this.dadosEscolhidos.push(aux);
      }
    }
    if (vizinhosTabela.length == 5) {
      let vizinhos = [
        [-1, vizinhosTabela[1], -1],
        [vizinhosTabela[0], 1000, vizinhosTabela[2]],
        [-1, vizinhosTabela[3], -1],
      ];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho: vizinhos,
        Grade: vizinhosTabela[4],
        Piso: probabilidades[0],
        Pedra: probabilidades[1],
        Parede: probabilidades[2],
        Bau: probabilidades[3],
      };
      this.dados.push(aux);

      if (this.escolhidos[vizinho] === undefined) {
        return;
      } else {
        let aux = {
          vizinho: vizinhos,
          Grade: vizinhosTabela[4],
          Piso: this.escolhidos[vizinho]["Piso"],
          Pedra: this.escolhidos[vizinho]["Pedra"],
          Parede: this.escolhidos[vizinho]["Parede"],
          Bau: this.escolhidos[vizinho]["Bau"],
        };
        this.dadosEscolhidos.push(aux);
      }
    }
    if (vizinhosTabela.length == 4) {
      let vizinhos = [
        [vizinhosTabela[1], vizinhosTabela[2], -1],
        [vizinhosTabela[0], 1000, -1],
        [-1, -1, -1],
      ];

      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho: vizinhos,
        Grade: vizinhosTabela[3],
        Piso: probabilidades[0],
        Pedra: probabilidades[1],
        Parede: probabilidades[2],
        Bau: probabilidades[3],
      };
      this.dados.push(aux);
      if (this.escolhidos[vizinho] === undefined) {
        return;
      } else {
        let aux = {
          vizinho: vizinhos,
          Grade: vizinhosTabela[3],
          Piso: this.escolhidos[vizinho]["Piso"],
          Pedra: this.escolhidos[vizinho]["Pedra"],
          Parede: this.escolhidos[vizinho]["Parede"],
          Bau: this.escolhidos[vizinho]["Bau"],
        };
        this.dadosEscolhidos.push(aux);
      }
    }
    if (vizinhosTabela.length == 3) {
      let vizinhos = [
        [-1, vizinhosTabela[1], -1],
        [vizinhosTabela[0], 1000, -1],
        [-1, -1, -1],
      ];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho: vizinhos,
        Grade: vizinhosTabela[2],
        Piso: probabilidades[0],
        Pedra: probabilidades[1],
        Parede: probabilidades[2],
        Bau: probabilidades[3],
      };
      this.dados.push(aux);
      if (this.escolhidos[vizinho] === undefined) {
        return;
      } else {
        let aux = {
          vizinho: vizinhos,
          Grade: vizinhosTabela[2],
          Piso: this.escolhidos[vizinho]["Piso"],
          Pedra: this.escolhidos[vizinho]["Pedra"],
          Parede: this.escolhidos[vizinho]["Parede"],
          Bau: this.escolhidos[vizinho]["Bau"],
        };
        this.dadosEscolhidos.push(aux);
      }
    }
    if (vizinhosTabela.length == 2) {
      let vizinhos = [
        [-1, -1, -1],
        [vizinhosTabela[0], 1000, -1],
        [-1, -1, -1],
      ];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho: vizinhos,
        Grade: vizinhosTabela[1],
        Piso: probabilidades[0],
        Pedra: probabilidades[1],
        Parede: probabilidades[2],
        Bau: probabilidades[3],
      };
      this.dados.push(aux);
      if (this.escolhidos[vizinho] === undefined) {
        return;
      } else {
        let aux = {
          vizinho: vizinhos,
          Grade: vizinhosTabela[1],
          Piso: this.escolhidos[vizinho]["Piso"],
          Pedra: this.escolhidos[vizinho]["Pedra"],
          Parede: this.escolhidos[vizinho]["Parede"],
          Bau: this.escolhidos[vizinho]["Bau"],
        };
        this.dadosEscolhidos.push(aux);
      }
    }
  }
  getTabelaDados() {
    let vizinhos = Object.keys(this.contagem);
    for (const vizinho of vizinhos) {
      const vizinhosTabela = this.separarPorNumerosEMaiusculas(vizinho);
      let probabilidades = [];
      for (let i = 0; i < this.estados.length; i++) {
        probabilidades[i] = this.getProbabilidades(vizinho, this.estados[i]);
      }
    this.adicionaDadosNaTabela(vizinhosTabela, probabilidades, vizinho);
      }
    vizinhos = Object.keys(this.backVezes);
    for (const vizinho of vizinhos) {
      const vizinhosTabela = this.separarPorNumerosEMaiusculas(vizinho);
      this.adicionaDadosBack(vizinhosTabela, vizinho);
    }
    console.log(this.backVezes);
    console.log(this.dadosBacktracking);
    console.log(this.dadosEscolhidos);
    return [this.dados, this.dadosEscolhidos, this.dadosBacktracking];
  }

  getVizinho(tile, l, c, ordem, gi) {
    if (ordem == 8) {
      let vizinho = [
        tile[l][c - 1],
        tile[l - 1][c - 1],
        tile[l - 1][c],
        tile[l - 1][c + 1],
        tile[l][c + 1],
        tile[l + 1][c + 1],
        tile[l + 1][c],
        tile[l + 1][c - 1],
        gi,
      ];
      return vizinho;
    } else {
      if (ordem == 4) {
        let vizinho = [
          tile[l][c - 1],
          //tile[l - 1][c - 1],
          tile[l - 1][c],
          //tile[l - 1][c + 1],
          tile[l][c + 1],
          //tile[l + 1][c + 1],
          tile[l + 1][c],
          //tile[l + 1][c - 1],
          gi,
        ];
        return vizinho;
      } else {
        if (ordem == 3) {
          let vizinho = [
            tile[l][c - 1],
            tile[l - 1][c - 1],
            tile[l - 1][c],
            //tile[l - 1][c + 1],
            //tile[l][c + 1],
            //tile[l + 1][c + 1],
            //tile[l + 1][c],
            //tile[l + 1][c - 1],
            gi,
          ];
          return vizinho;
        } else {
          if (ordem == 2) {
            let vizinho = [
              tile[l][c - 1],
              //tile[l - 1][c - 1],
              tile[l - 1][c],
              //tile[l - 1][c + 1],
              //tile[l][c + 1],
              //tile[l + 1][c + 1],
              //tile[l + 1][c],
              //tile[l + 1][c - 1],
              gi,
            ];
            return vizinho;
          } else {
            if (ordem == 1) {
              let vizinho = [
                tile[l][c - 1],
                //tile[l - 1][c - 1],
                //tile[l - 1][c],
                //tile[l - 1][c + 1],
                //tile[l][c + 1],
                //tile[l + 1][c + 1],
                //tile[l + 1][c],
                //tile[l + 1][c - 1],
                gi,
              ];
              return vizinho;
            }
          }
        }
      }
    }
  }

  verificaBacktracking(tile, l, c, ordemInicial, gi, original) {
    if (ordemInicial == 0) {
      this.porcentagemDeUso[ordemInicial.toString()]++;
      return 8;
    }

    let anteriores = this.getVizinho(tile, l, c, ordemInicial);
    let indice = [];
    for (let i = 0; i < anteriores.length; i++) {
      indice[i] = this.estados[anteriores[i]];
    }
    indice[anteriores.length] = gi;
    let vizinho = indice.join("");
    if (this.probabilidades[vizinho] === undefined) {
      let proximaOrdem = 0;
      if (ordemInicial == 8) {
        proximaOrdem = 4;
        return this.verificaBacktracking(
          tile,
          l,
          c,
          proximaOrdem,
          gi,
          indice
        );
      }
      if (ordemInicial == 4) {
        proximaOrdem = 3;
      }
      if (ordemInicial == 3) {
        proximaOrdem = 2;
      }
      if (ordemInicial == 2) {
        proximaOrdem = 1;
      }
      if (ordemInicial == 1) {
        proximaOrdem = 0;
      }

      return this.verificaBacktracking(
        tile,
        l,
        c,
        proximaOrdem,
        gi,
        original
      ); //realiza backtarcking
    } else {
      if (ordemInicial < 8) {
        this.adicionaBacktracking(original, ordemInicial);
      }
      this.porcentagemDeUso[ordemInicial.toString()]++;
      return ordemInicial;
    }
  }

  proximo(anteriores, gi) {
    let indice = [];
    for (let i = 0; i < anteriores.length; i++) {
      indice[i] = this.estados[anteriores[i]];
      indice[i + 1] = gi;
    }
    let vizinho = indice.join("");
    let x = 0;
    let limite = Math.random();
    let total = 0;
    for (let i = 0; i < this.estados.length; i++) {
      total += this.getProbabilidades(vizinho, this.estados[i]);
      if (total >= limite) {
        x = i;
        break;
      }
    }

    this.adicionaVezesEscolhidos(indice, this.estados[x]);
    return x;
  }

  
 

  treinoGrids() {

    let tamanhoGrid = this.TAMANHOIMAGEM / this.GRID;
    tamanhoGrid = Math.floor(tamanhoGrid);

    let canto = Math.floor(tamanhoGrid * this.corte);
    if (canto == 0) {
      canto = 1
    }
    let gi = []
    for (let i = 0; i < tamanhoGrid; i++) {
      gi[i] = []; // Inicializa a linha

      for (let j = 0; j < tamanhoGrid; j++) {

        gi[i][j] = "Meio"

      }
    }

    // Canto superior esquerdo (diagonal principal)
    for (let i = 0; i < canto; i++) {
      for (let j = 0; j < canto; j++) {
        gi[i][j] = "Superior esquerdo";
      }
    }

    // Canto superior direito (diagonal secundária)
    for (let i = 0; i < canto; i++) {
      for (let j = 0; j < canto; j++) {
        gi[i][tamanhoGrid - canto + j] = "Superior direito";
      }
    }

    // Canto inferior esquerdo (diagonal principal)
    for (let i = 0; i < canto; i++) {
      for (let j = 0; j < canto; j++) {
        gi[tamanhoGrid - canto + i][j] = "Inferior esquerdo";
      }
    }

    // Canto inferior direito (diagonal secundária)
    for (let i = 0; i < canto; i++) {
      for (let j = 0; j < canto; j++) {
        gi[tamanhoGrid - canto + i][tamanhoGrid - canto + j] = "Inferior direito";
      }
    }


    for (let i = 0; i < canto; i++) {
      for (let j = canto; j < tamanhoGrid - canto; j++) {
        gi[i][j] = "Cima";
      }
    }

    for (let i = canto; i < tamanhoGrid - canto; i++) {
      for (let j = 0; j < canto; j++) {
        gi[i][j] = "Esquerda";
      }
    }

    for (let i = tamanhoGrid - canto; i < tamanhoGrid; i++) {
      for (let j = canto; j < tamanhoGrid - canto; j++) {
        gi[i][j] = "Baixo";
      }
    }
    for (let i = canto; i < tamanhoGrid - canto; i++) {
      for (let j = tamanhoGrid - canto; j < tamanhoGrid; j++) {
        gi[i][j] = "Direita";
      }
    }
    console.log(gi)
    return gi;

  }

  converterImagem()
  {
    let tiles = []
    for (let i = 0; i < this.TAMANHOIMAGEM + 2; i++) {
        tiles[i] = [];
        for (let j = 0; j < this.TAMANHOIMAGEM + 2; j++) {
          tiles[i][j] = "Vazio";
          if (i > 0 && j > 0 && i < this.TAMANHOIMAGEM + 1 && j < this.TAMANHOIMAGEM + 1
          ) {
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
    }
    return tiles
}
  treino() {

    this.iniciaPorcentagem([8, 4, 3, 2, 1, 0]);

    for (let i = 0; i < this.estados.length; i++) {
        this.probabilidadesGlobal[this.estados[i]] = 0;
    }

    let tiles = this.converterImagem();

    let posicao = this.treinoGrids(); 
    let tamanhoGrid = this.TAMANHOIMAGEM / this.GRID;
    tamanhoGrid = Math.floor(tamanhoGrid);
    for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
        for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) {
            for (
                let l = gridI * this.GRID;
                l < gridI * this.GRID + this.GRID;
                l++
              ) {
                for (
                  let c = gridJ * this.GRID;
                  c < gridJ * this.GRID + this.GRID;
                  c++
                ) {
                  let gri = posicao[gridI][gridJ]
                  console.log(tiles)
                  let vizinhos = this.getVizinho(tiles, l + 1, c + 1, 8, gri);
                  let atual = tiles[l + 1][c + 1];
                  this.soma(vizinhos, atual);
                  vizinhos = this.getVizinho(tiles, l + 1, c + 1, 4, gri);
                  this.soma(vizinhos, atual);
                  vizinhos = this.getVizinho(tiles, l + 1, c + 1, 3, gri);
                  this.soma(vizinhos, atual);
                  vizinhos = this.getVizinho(tiles, l + 1, c + 1, 2, gri);
                  this.soma(vizinhos, atual);
                  vizinhos = this.getVizinho(tiles, l + 1, c + 1, 1, gri);
                  this.soma(vizinhos, atual);
                  this.totalGlobal++;
                  this.probabilidadesGlobal[atual]++;
                }
              }
            }
        }
    this.calculate();
    console.log(tiles)
    console.log(this.probabilidades);

}

}