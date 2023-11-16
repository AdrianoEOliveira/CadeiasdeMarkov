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
    this.possibilidades = [];
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

  RandomIndexXY(anteriorX,anteriorY,anteriorXY) {
    let aux = [];
    let indice = anteriorXY*16 +anteriorY *4 + anteriorX;
    aux = aux.concat(this.possibilidades[indice]);
    let x = 0;
    let limite = Math.random() ;
    let soma = 0;
    for (let i = 0; i < aux.length ; i++) {
      soma += aux[i];

      if (soma >= limite) {
        x= i;
        break;
      }
    }
    return x;
    
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
            let anteriorXY;
          if(c==0)
          {
            anteriorXY = this.mapa[l-1][c]
          }
          else
          {
            anteriorXY = this.mapa[l-1][c-1]
          }
          anteriorY = this.mapa[l-1][c];
          anteriorX = this.RandomIndexXY(anteriorX,anteriorY,anteriorXY);
          this.mapa[l][c] = this.tiles[anteriorX];
          }
          else
          {
          let anteriorXY = this.InicialY;
          anteriorX = this.RandomIndexXY(anteriorX,anteriorY,anteriorXY);
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

  treino() 
  {

    for (let i = 0; i < this.tiles.length**3; i++) {
      this.possibilidades[i] = [];
    }
    for (let i = 0; i <this.tiles.length**3; i++) {
      for (let j = 0; j < this.tiles.length; j++) {
        this.possibilidades[i][j] = 0;
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
            // pedra
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
            MarkovTile[i%this.GRID][j%this.GRID] = 2;
              //Cinza
              //parede
           }
           else{
           if(data[0]== 255 && data[1] == 255 && data[2] ==0)
           {
            MarkovTile[i%this.GRID][j%this.GRID] = 3;
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
        //tratamento borda coluna 0 e n-1 // diagonal - y - x
      for(let ii = 0 ;ii<this.GRID;ii++)
      {
        let jj1 = 0
        let jj2 = this.GRID -1;
        let aux1 = 0;
        let aux2 = 0;
        let atual1 = MarkovTile[ii][jj1]
        let atual2 = MarkovTile[ii][jj2]
        if(ii==0)
        {
          aux1 = 16*MarkovTile[ii][jj1] + 4* MarkovTile[ii][jj1] + MarkovTile[ii][jj1]
          aux2 = 16*MarkovTile[ii][jj2-1] +4* MarkovTile[ii][jj2] + MarkovTile[ii][jj2-1]
        }
        else
        {
          aux1 = 16*MarkovTile[ii-1][jj1] + 4* MarkovTile[ii-1][jj1] + MarkovTile[ii][jj1]
          aux2 = 16*MarkovTile[ii-1][jj2-1] + 4* MarkovTile[ii-1][jj2] + MarkovTile[ii][jj2-1]
        }
        console.log()
        this.possibilidades[aux1][atual1] = this.possibilidades[aux1][atual1] + 1
        this.possibilidades[aux2][atual2] = this.possibilidades[aux2][atual2] + 1  
      }
    //tratamento borda coluna 1 e n-2 // diagonal - y - x
      for(let jj = 1 ;jj<this.GRID-1;jj++)
      {
        let ii1 = 0
        let ii2 = this.GRID -1 ;
        let aux1 = 0;
        let aux2 = 0;
        let atual1 = MarkovTile[ii1][jj]
        let atual2 = MarkovTile[ii2][jj]
        aux1 = 16*MarkovTile[ii1][jj] + 4* MarkovTile[ii1][jj] + MarkovTile[ii1][jj-1]
        aux2 = 16*MarkovTile[ii2-1][jj-1] +4* MarkovTile[ii2-1][jj] + MarkovTile[ii2][jj-1]
        this.possibilidades[aux1][atual1] = this.possibilidades[aux1][atual1] + 1
        this.possibilidades[aux2][atual2] = this.possibilidades[aux2][atual2] + 1  
      }
      for(let ii = 1 ;ii<this.GRID-1;ii++)
      {
        for(let jj = 1 ;jj<this.GRID-1;jj++)
        {
          let aux = 0;
          let atual = MarkovTile[ii][jj]
          aux =16*MarkovTile[ii-1][jj-1] + 4* MarkovTile[ii-1][jj] + MarkovTile[ii][jj-1]
          this.possibilidades[aux][atual] = this.possibilidades[aux][atual] + 1

        }
      }
    }
  }
    console.log(this.possibilidades)
    for (let i = 0; i < this.tiles.length**3; i++) {
      let Somatorio = 0
      for (let j = 0; j < this.tiles.length; j++) {
        Somatorio = Somatorio + this.possibilidades[i][j];
      }
      let total = Somatorio;
      Somatorio =0;
      for (let j = 0; j < this.tiles.length; j++) {
        this.possibilidades[i][j] = this.possibilidades[i][j] / total;
        Somatorio = Somatorio + this.possibilidades[i][j];
      }
      console.log("Somatorio em x de i =",i," = ",Somatorio)
    }
    console.log("Markov de ordem 3 :" )
    console.log(this.possibilidades);
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