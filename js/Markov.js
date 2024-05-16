const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau =3;

export default class Markov {
  constructor(assets, canvas, linhas, colunas, grid, tamanhoimagem, imagem,numero_de_iteracoes,modelo,newTiles,metodo) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.GRID = grid;
    this.TAMANHOIMAGEM = tamanhoimagem;
    this.IMAGEM = imagem;
    this.iteracoes = numero_de_iteracoes
    this.modelo = modelo
    this.newTiles = newTiles;
    this.metodo = metodo;

    this.dados = [];
    this.contagem = [];
    this.estados = [];
    this.probabilidades = [];
    this.probabilidadesGlobal = [];
    this.porcentagemDeUso = []; 
    this.totalGlobal=0;
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
  }

  zeraTreino()
  {
    this.contagem = [];
    this.estados = [];
    this.probabilidades = [];
    this.probabilidadesGlobal = [];
    this.porcentagemDeUso = []; 
    this.totalGlobal=0;
  }

  zeraTabela()
  {
    this.dados = [];
  }

  adicionaEstado(estado) {
    this.estados.push(estado);
  }

  iniciaPorcentagem(ordems)
  {
    for(let i=0;i<ordems.length;i++)
    {
      this.porcentagemDeUso[ordems[i].toString()] = 0;
    }
  }

  getPorcentagem()
  {
    return this.porcentagemDeUso;
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


  converterEstado(vizinhos)
  {
    for(let i = 0;i<3;i++)
    {
      for(let j =0;j<3;j++)
      {
        if(vizinhos[i][j] =="Piso")
          vizinhos[i][j] = Piso
          if(vizinhos[i][j] =="Pedra")
          vizinhos[i][j] = Pedra
          if(vizinhos[i][j] =="Parede")
          vizinhos[i][j] = Parede
          if(vizinhos[i][j] =="Bau")
          vizinhos[i][j] = Bau
      }
    }
    console.log(vizinhos)
    return vizinhos;
  }

  adicionaDadosNaTabela(vizinhosTabela,probabilidades)
  {
    console.log(vizinhosTabela)
    if(vizinhosTabela.length == 8)
    {
      let vizinhos = [[vizinhosTabela[1],vizinhosTabela[2],vizinhosTabela[3]],
      [vizinhosTabela[0],1000,vizinhosTabela[4]],
      [vizinhosTabela[7],vizinhosTabela[6],vizinhosTabela[5]]];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux)
    }
    if(vizinhosTabela.length == 4)
    {
      let vizinhos = [[-1,vizinhosTabela[1],-1],
      [vizinhosTabela[0],1000,vizinhosTabela[2]],
      [-1,vizinhosTabela[3],-1]];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
    if(vizinhosTabela.length == 3)
    {
      let vizinhos = [[vizinhosTabela[1],vizinhosTabela[2],-1],
      [vizinhosTabela[0],1000,-1],
      [-1,-1,-1]]

      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
    if(vizinhosTabela.length == 2)
    {
      let vizinhos = [[-1,vizinhosTabela[1],-1],
      [vizinhosTabela[0],1000,-1],
      [-1,-1,-1]]
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
    if(vizinhosTabela.length == 1)
    {
      let vizinhos = [[-1,-1,-1],
      [vizinhosTabela[0],1000,-1],
      [-1,-1,-1]]
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
  }


  adicionaDadosNaTabelaHigh(vizinhosTabela,probabilidades)
  {
    if(vizinhosTabela.length == 9)
    {
      let vizinhos = [[vizinhosTabela[1],vizinhosTabela[2],vizinhosTabela[3]],
      [vizinhosTabela[0],1000,vizinhosTabela[4]],
      [vizinhosTabela[7],vizinhosTabela[6],vizinhosTabela[5]]];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
        Grade:vizinhosTabela[8],
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux)
    }
    if(vizinhosTabela.length == 5)
    {
      let vizinhos = [[-1,vizinhosTabela[1],-1],
      [vizinhosTabela[0],1000,vizinhosTabela[2]],
      [-1,vizinhosTabela[3],-1]];
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
        Grade:vizinhosTabela[4],
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
    if(vizinhosTabela.length == 4)
    {
      let vizinhos = [[vizinhosTabela[1],vizinhosTabela[2],-1],
      [vizinhosTabela[0],1000,-1],
      [-1,-1,-1]]

      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
        Grade:vizinhosTabela[3],
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
    if(vizinhosTabela.length == 3)
    {
      let vizinhos = [[-1,vizinhosTabela[1],-1],
      [vizinhosTabela[0],1000,-1],
      [-1,-1,-1]]
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
        Grade:vizinhosTabela[2],
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
    if(vizinhosTabela.length == 2)
    {
      let vizinhos = [[-1,-1,-1],
      [vizinhosTabela[0],1000,-1],
      [-1,-1,-1]]
      vizinhos = this.converterEstado(vizinhos);
      let aux = {
        vizinho:vizinhos,
        Grade:vizinhosTabela[1],
      Piso:probabilidades[0],
      Pedra:probabilidades[1],
      Parede:probabilidades[2],
      Bau:probabilidades[3]
    };
      this.dados.push(aux) 
    }
  }

  getTabelaDados()
  {
    let vizinhos = Object.keys(this.contagem);
    for (const vizinho of vizinhos) 
    {
      const vizinhosTabela = this.separarPorNumerosEMaiusculas(vizinho)
      console.log(vizinhosTabela)
      let probabilidades = []
      for (let i = 0; i < this.estados.length; i++) {
        probabilidades[i] = this.getProbabilidades(vizinho, this.estados[i]);
      }
      if(this.metodo == "high")
      {
        this.adicionaDadosNaTabelaHigh(vizinhosTabela,probabilidades);
      }
      else
      {
      this.adicionaDadosNaTabela(vizinhosTabela,probabilidades);
      }
    }
    return this.dados;
  }
  
  getVizinho(tile,l,c,ordem)
  {
    if(ordem ==8)
    {
    let vizinho = [
      tile[l][c - 1],
      tile[l - 1][c - 1],
      tile[l - 1][c],
      tile[l - 1][c + 1],
      tile[l][c + 1],
      tile[l + 1][c + 1],
      tile[l + 1][c],
      tile[l + 1][c - 1],
      ]
      return vizinho;
    }
    else
    {
      if(ordem ==4)
      {
      let vizinho = [
        tile[l][c - 1],
        //tile[l - 1][c - 1],
        tile[l - 1][c],
        //tile[l - 1][c + 1],
        tile[l][c + 1],
        //tile[l + 1][c + 1],
        tile[l + 1][c],
        //tile[l + 1][c - 1],
        ]  
        return vizinho
      }
      else
      {
        if(ordem ==3)
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
        return vizinho  
      }
      else
      {
        if(ordem ==2)
        {
        let vizinho = [
          tile[l][c - 1],
          //tile[l - 1][c - 1],
          tile[l - 1][c],
          //tile[l - 1][c + 1],
          //tile[l][c + 1],
          //tile[l + 1][c + 1],
          //tile[l + 1][c],
          //tile[l + 1][c - 1],
          ]
          return vizinho  
        }
        else
        {
          if(ordem ==1)
          {
          let vizinho = [
            tile[l][c - 1],
            //tile[l - 1][c - 1],
            //tile[l - 1][c],
            //tile[l - 1][c + 1],
            //tile[l][c + 1],
            //tile[l + 1][c + 1],
            //tile[l + 1][c],
            //tile[l + 1][c - 1],
            ]
            return vizinho
          }
        }
      }
    }
  }
}

getVizinhoHigh(tile,l,c,ordem,gi)
{
  if(ordem ==8)
  {
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
    ]
    return vizinho;
  }
  else
  {
    if(ordem ==4)
    {
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
      ]  
      return vizinho
    }
    else
    {
      if(ordem ==3)
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
      gi,
      ]
      return vizinho  
    }
    else
    {
      if(ordem ==2)
      {
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
        ]
        return vizinho  
      }
      else
      {
        if(ordem ==1)
        {
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
          ]
          return vizinho
        }
      }
    }
  }
  }
}

verificaBacktrackingHigh(tile,l,c,ordemInicial,gi)
{
  if(ordemInicial==0)
  {
    this.porcentagemDeUso[ordemInicial.toString()]++;
    return 8;
  }
  let anteriores = this.getVizinho(tile,l,c,ordemInicial)
  let indice = [];
  for (let i = 0; i < anteriores.length; i++) {
    indice[i] = this.estados[anteriores[i]];
  }
  indice[anteriores.length] = gi;
  let vizinho = indice.join("");
  if(this.probabilidades[vizinho]===undefined)
  {
    let proximaOrdem = 0
    if(ordemInicial==8)
    {
      proximaOrdem = 4;
    }
    if(ordemInicial==4)
    {
      proximaOrdem = 3;
    }
    if(ordemInicial==3)
    {
      proximaOrdem = 2;
    }
    if(ordemInicial==2)
    {
      proximaOrdem = 1;
    }
    if(ordemInicial==1)
    {
      proximaOrdem = 0;
    }

    return this.verificaBacktrackingHigh(tile,l,c,proximaOrdem,gi)//realiza backtarcking
  }
  else
  {
    this.porcentagemDeUso[ordemInicial.toString()]++;
    return ordemInicial;
  }
}

  verificaBacktracking(tile,l,c,ordemInicial)
  {
    if(ordemInicial==0)
    {
      this.porcentagemDeUso[ordemInicial.toString()]++;
      return 8;
    }
    let anteriores = this.getVizinho(tile,l,c,ordemInicial)
    let indice = [];
    for (let i = 0; i < anteriores.length; i++) {
      indice[i] = this.estados[anteriores[i]];
    }
    let vizinho = indice.join("");
    if(this.probabilidades[vizinho]===undefined)
    {
      let proximaOrdem = 0
      if(ordemInicial==8)
      {
        proximaOrdem = 4;
      }
      if(ordemInicial==4)
      {
        proximaOrdem = 3;
      }
      if(ordemInicial==3)
      {
        proximaOrdem = 2;
      }
      if(ordemInicial==2)
      {
        proximaOrdem = 1;
      }
      if(ordemInicial==1)
      {
        proximaOrdem = 0;
      }

      return this.verificaBacktracking(tile,l,c,proximaOrdem)//realiza backtarcking
    }
    else
    {
      this.porcentagemDeUso[ordemInicial.toString()]++;
      return ordemInicial;
    }
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
    for (let i = 0; i < this.estados.length; i++) {
      total += this.getProbabilidades(vizinho, this.estados[i]);
      if (total >= limite) {
        x = i;
        break;
      }
    }
    return x;
  }

  proximoHigh(anteriores,gi) {
    let indice = [];
    for (let i = 0; i < anteriores.length; i++) {
      indice[i] = this.estados[anteriores[i]];
      indice[i+1] = gi
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
    return x;
  }

  treino() {

    this.iniciaPorcentagem([8,4,3,2,1,0]);

    for (let i = 0; i < this.estados.length; i++) {

      this.probabilidadesGlobal[this.estados[i]] = 0;
    }
    let img = new Image();
    img = this.assets.Img(this.IMAGEM);
    this.ctx.drawImage(img, 0, 0);
    //img.style.display = "none";
    let gi = 0
    let tamanhoGrid = this.TAMANHOIMAGEM / this.GRID;
    for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
      for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) {
        let imagemTile = [];
        for (
          let i = gridI * this.GRID;
          i < (gridI * this.GRID) + this.GRID;
          i++
        ) {
          imagemTile[i % this.GRID] = [];
          for (
            let j = gridJ * this.GRID;
            j < (gridJ * this.GRID) + this.GRID;
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
        if(this.metodo == "high")
        {
          for (let l = 1; l < this.GRID - 1; l++) {
            for (let c = 1; c < this.GRID - 1; c++) {
              let vizinhos = this.getVizinhoHigh(imagemTile,l,c,8,gi);
              let atual = imagemTile[l][c];
              this.soma(vizinhos, atual);
              vizinhos = this.getVizinhoHigh(imagemTile,l,c,4,gi);
              this.soma(vizinhos, atual);
              vizinhos = this.getVizinhoHigh(imagemTile,l,c,3,gi);
              this.soma(vizinhos, atual);
              vizinhos = this.getVizinhoHigh(imagemTile,l,c,2,gi);
              this.soma(vizinhos, atual);
              vizinhos = this.getVizinhoHigh(imagemTile,l,c,1,gi);
              this.soma(vizinhos, atual);
              this.totalGlobal++;
              this.probabilidadesGlobal[atual]++;
            }
          }
          gi++;
        }
        else
        {
        for (let l = 1; l < this.GRID - 1; l++) {
          for (let c = 1; c < this.GRID - 1; c++) {
            let vizinhos = this.getVizinho(imagemTile,l,c,8);
            let atual = imagemTile[l][c];
            this.soma(vizinhos, atual);
            vizinhos = this.getVizinho(imagemTile,l,c,4);
            this.soma(vizinhos, atual);
            vizinhos = this.getVizinho(imagemTile,l,c,3);
            this.soma(vizinhos, atual);
            vizinhos = this.getVizinho(imagemTile,l,c,2);
            this.soma(vizinhos, atual);
            vizinhos = this.getVizinho(imagemTile,l,c,1);
            this.soma(vizinhos, atual);
            this.totalGlobal++;
            this.probabilidadesGlobal[atual]++;
          }
        }
        }
      }
    }
    this.calculate();
    console.log(this.probabilidades)
  }
}

