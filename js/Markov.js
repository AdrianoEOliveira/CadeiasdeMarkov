export default class Markov {
  constructor(assets, canvas,LINHAS,COLUNAS,GRID,TAMANHOIMAGEM,IMAGEM,InicialX,InicialY) {
    this.LINHAS = LINHAS;
    this.COLUNAS =COLUNAS;
    this.GRID = GRID;
    this.TAMANHOIMAGEM = TAMANHOIMAGEM;
    this.IMAGEM =IMAGEM;
    this.InicialX = InicialX;
    this.InicialY = InicialY;
    this.tiles = [];
    this.possibilidadesX = [];
    this.possibilidadesY = [];
    this.mapa = [];
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }



  RandomIndex(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    //let randomIndex = Math.floor(Math.random())
    if (arr[randomIndex] > 0) {
      return randomIndex;
    } else {
      return this.RandomIndex(arr);
    }
  }

  RandomIndexXY(anteriorX,anteriorY) {
    let auxX = [];
    auxX = auxX.concat(this.possibilidadesX[anteriorX]);
    let x = 0;
    let y = 0;
    let auxY = [];
    auxY = auxY.concat(this.possibilidadesY[anteriorY]);
    let limite = Math.random() *1;
    let soma = 0;
    for (let i = 0; i < auxX.length ; i++) {
      soma += auxX[i];

      if (soma >= limite) {
        x= i;
        break;
      }
    }
    limite = Math.random() *1;
    soma = 0
    for (let i = 0; i < auxX.length ; i++) {
      soma += auxY[i];

      if (soma >= limite) {
        y= i;
        break;
      }
    }
    if((auxX[x] !=0) && (auxY[y] != 0))
    {
      if(x == y)
      {
      return x;
      }
      else
      {
      return this.RandomIndexXY(anteriorX,anteriorY);
      }
    }
    else
    {
    return this.RandomIndexXY(anteriorX,anteriorY);
    }
  }
  GenerateRandomMap() {
    var anteriorX = this.InicialX;
    var anteriorY = this.InicialY;
    for (let l = 0; l < this.LINHAS; l++) 
    {
      this.mapa[l] = [];
      for (let c = 0;c < this.COLUNAS ; c++) 
      {
          if(l>=1)
          {
          anteriorY = this.mapa[l-1][c];
          anteriorX = this.RandomIndexXY(anteriorX,anteriorY);
          this.mapa[l][c] = this.tiles[anteriorX];
          }
          else
          {
          anteriorX = this.RandomIndexXY(anteriorX,anteriorY);
          this.mapa[l][c] = this.tiles[anteriorX];
          }
      }
      anteriorX = this.InicialX
      }
    return this.mapa;
  }

  // Add a single state or states
  addStates(tile) {
    this.tiles.push(tile);
  }
  setPosssibilidades(possibilite) {
    this.possibilidades = possibilite;
  }

  treino() 
  {

    for (let i = 0; i < this.tiles.length; i++) {
      this.possibilidadesX[i] = [];
      this.possibilidadesY[i] = [];
    }
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles.length; j++) {
        this.possibilidadesX[i][j] = 0;
        this.possibilidadesY[i][j] = 0;
        
      }
    }
    let img = new Image();
    img = this.assets.Img(this.IMAGEM);
    this.ctx.drawImage(img, 0, 0);
    //img.style.display = "none";

    let tamanhoGrid = this.TAMANHOIMAGEM /this.GRID;
    for (let gi = 0; gi<tamanhoGrid;gi++)
    {
      for (let gj = 0; gj<tamanhoGrid;gj++)
      {
        let MarkovTile = []

        for (let i = gi*this.GRID; i < gi*this.GRID + this.GRID; i++) 
        {
          MarkovTile[i%this.GRID] = []
          for (let j = gj*this.GRID; j < gj*this.GRID + this.GRID; j++) 
          {
          let pixel = this.ctx.getImageData(j, i, 1, 1);
          let data = pixel.data;
          //const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
          //console.log(data)
          if (data[0] == 0 && data[1] == 0 && data[2] == 0) 
          {
            //this.possibilidades[ant][0] = this.possibilidades[ant][0] + 1;
            //Cor Preto
            //
            MarkovTile[i%this.GRID][j%this.GRID] = 1;
          } 
          else 
          {
          if(data[0]== 255 && data[1] == 255 && data[2] ==255)
            {
            //this.possibilidades[ant][1] = this.possibilidades[ant][1] + 1;
            //Cor Branca 
            //Piso
            MarkovTile[i%this.GRID][j%this.GRID] = 0;
           }
           else
           {
           if(data[0]== 32 && data[1] == 32 && data[2] ==32)
           {
            MarkovTile[i%this.GRID][j%this.GRID] = 3;
              //Cinza
              //Pedra
           }
           else{
           if(data[0]== 255 && data[1] == 255 && data[2] ==0)
           {
            MarkovTile[i%this.GRID][j%this.GRID] = 2;
              //bau
              //Amarelo
           }
           else
           {console.log(i,j,data)}
          }
          }
        }
        //cont = cont + 1;
        //console.log(rgba)
          }
        }
      for(let ii = 0 ; ii<this.GRID; ii++)
      {
        let antX = -1;
        for(let jj = 0 ; jj<this.GRID; jj++)
        {
          if(ii==0)
          {
            if(MarkovTile[ii][jj]>=0)
            {
              let AntY
              AntY = MarkovTile[ii][jj]
              let atual = MarkovTile[ii][jj]
              this.possibilidadesY[AntY][atual]= this.possibilidadesY[AntY][atual] + 1
              if(antX == -1)
              {
              antX = atual
              }
              this.possibilidadesX[antX][atual] = this.possibilidadesX[antX][atual] + 1
              antX = atual

            }
            else
            {
              antX =-1
            }
          }
          else
          {
            if(MarkovTile[ii][jj]>=0)
            {
              
              let AntY ;
              AntY = MarkovTile[ii-1][jj];
              let atual = MarkovTile[ii][jj];
              this.possibilidadesY[AntY][atual]= this.possibilidadesY[AntY][atual] + 1
              if(antX == -1)
              {
              antX = atual
              }
              this.possibilidadesX[antX][atual] = this.possibilidadesX[antX][atual] + 1
              antX = atual

            }
            else
            {
              antX =-1
            }

          }
        }
    }
  }
  }

    for (let i = 0; i < this.tiles.length; i++) {
      let SomatorioX =0;
      let SomatorioY = 0;
      for (let j = 0; j < this.tiles.length; j++) {
        SomatorioX = SomatorioX + this.possibilidadesX[i][j];
        SomatorioY = SomatorioY + this.possibilidadesY[i][j];
      }
      let totalX = SomatorioX;
      let totalY = SomatorioY;
      SomatorioX =0;
      SomatorioY = 0;
      for (let j = 0; j < this.tiles.length; j++) {
        this.possibilidadesX[i][j] = this.possibilidadesX[i][j] / totalX;
        SomatorioX = SomatorioX + this.possibilidadesX[i][j];
        this.possibilidadesY[i][j] = this.possibilidadesY[i][j] / totalY;
        SomatorioY = SomatorioY + this.possibilidadesY[i][j];
      }
      console.log("Somatorio em x de i =",i," = ",SomatorioX)
      console.log("Somatorio em y de i =",i," = ",SomatorioY)
    }
    console.log("Markov em relação a X:" )
    console.log(this.possibilidadesX);
    console.log("Markov em relação a Y:")
    console.log(this.possibilidadesY);
}
iniciar() 
{
  this.treino();
  return this.GenerateRandomMap();
}

limpa() {
  this.possibilidadesX = [];
  this.possibilidadesY = [];
  this.tiles = [];
}
}