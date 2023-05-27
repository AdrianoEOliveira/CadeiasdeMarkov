export default class Markov {
  constructor(assets, canvas) {
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
    let xx , yy;
    xx = this.RandomIndex(auxX);
    let auxY = [];
    auxX = auxY.concat(this.possibilidadesY[anteriorY]);
    yy = this.RandomIndex(auxY);
    if(xx == yy)
    return xx;
    else
    return this.RandomIndexXY(anteriorX,anteriorY)
  }
  GenerateRandomMap(primeiroTile) {
    let anteriorX = primeiroTile;
    for (let l = 0; l < 10; l++) {
      this.mapa[l] = [];
      for (let c = 0; c < 10; c++) {
        
          anteriorX = this.RandomIndexXY(anteriorX,anteriorY);
          this.mapa[l][c] = this.tiles[anterior];
        }
      }
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

  treino() {

    let auxTile = [];
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
    for(let i = 0 ;i< 5;i++)
    {
      auxTile[i] = []
    }

        for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles.length; j++) {
         auxTile[i][j] = -1
        
      }
    }
    let img = new Image();
    img = this.assets.Img("Treino100");
    this.ctx.drawImage(img, 0, 0);
    //img.style.display = "none";
    auxTile[this.tiles.length]

    let ant = 0;
    let contX = 0;
    let contY = 0
    for (let gi = 0; gi<5;gi++)
    {
      for (let gj = 0; gj<5;gj++){

        for (let i = gi*5; i < gi*5 + 5; i++) 
        {
          for (let j = gj*5; j < gj*5+ 5; j++) {
          let pixel = this.ctx.getImageData(i, j, 1, 1);
          let data = pixel.data;
          //const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
          //console.log(data)
          if (data[0] == 0 && data[1] == 0 && data[2] == 0) {
            //this.possibilidades[ant][0] = this.possibilidades[ant][0] + 1;
            //ant = 0;
            auxTile[i%5][j%5] = 0
          } 
          else 
          {
            if(data[0]== 255 && data[1] == 255 && data[2] ==255)
            {
            //this.possibilidades[ant][1] = this.possibilidades[ant][1] + 1;
            //ant = 1;
            auxTile[i][j] = -1
           }
           if(data[0]== 32 && data[1] == 32 && data[2] ==32)
           {
              auxTile[i%5][j%5] = 1
              //tijolo
           }
           if(data[0]== 255 && data[1] == 255 && data[2] ==0)
           {
              auxTile[i%5][j%5] = 2
              //bau
           }
            else
            {
              //this.possibilidades[ant][2] = this.possibilidades[ant][2] + 1;
              //ant = 2;
              auxTile[2] = auxTile[2] + 1
            }
          }
        //cont = cont + 1;
        //console.log(rgba)
        }
      }
      let antX = -1;
      let antY = -1;
      for(let ii = 0 ; ii<5; ii++)
      {
        for(let jj = 0 ; jj<5 ; jj)
        {
          if(ii == 0 && jj == 0)
          {
            if(auxTile[ii][jj] == -1)
            {
              //tratamento
            }
            else
            {
              antX = auxTile[ii][jj];
              this.possibilidadesX[antX][antX] =  this.possibilidadesX[antX][antX] + 1
              this.possibilidadesY[antY][antY] =  this.possibilidadesY[antY][antY] + 1
              contX = contX +1
              contY = contY +1
            }
          }
          else{
            if(ii==0)
            {
              if(auxTile[ii][jj] == -1)
              {
                antX =-1
              }
              else
              {
                if(antX ==-1)
                {
                antX = auxTile[ii][jj];
                this.possibilidadesX[antX][antX] =  this.possibilidadesX[antX][antX] + 1
                this.possibilidadesY[antX][antX] =  this.possibilidadesY[antX][antX] + 1
                }
                else
                {
                  let xx = auxTile[ii][jj];
                this.possibilidadesX[antX][xx] =  this.possibilidadesX[antX][antX] + 1
                this.possibilidadesY[antX][xx] =  this.possibilidadesY[antX][xx] + 1
                antX = auxTile[ii][jj];
                }
                contX = contX +1
                contY = contY +1
              }
            }
            else
            {
              if(jj==0)
              {
                if(auxTile[ii][jj]>=0)
                {
                  antY = auxTile[ii-1][jj]
                  if(antY>=0)
                  {
                  let xx = auxTile[ii][jj]
                  this.possibilidadesX[antY][xx] =  this.possibilidadesX[antY][xx] + 1
                  this.possibilidadesY[antY][xx] =  this.possibilidadesY[antY][xx] + 1
                  antX =xx
                  }
                  else
                  {
                  let xx = auxTile[ii][jj]
                  this.possibilidadesX[xx][xx] =  this.possibilidadesX[xx][xx] + 1
                  this.possibilidadesY[xx][xx] =  this.possibilidadesY[xx][xx] + 1
                  antX =xx
                  }
                  contX = contX +1
                  contY = contY +1
                }
                else
                {
                  antX =-1
                }
              }
              else
              {
                if(auxTile[ii][jj]>=0)
                {
                  if(antX>=0)
                  {
                  let xx = auxTile[ii][jj]
                  this.possibilidadesX[antX][xx] =  this.possibilidadesX[antX][xx] + 1
                  antX =xx
                  }
                  antY = auxTile[ii-1][jj]
                  if(antY==-1)
                  {
                    antY = auxTile[ii][jj];
                  }
                  let xx = auxTile[ii][jj]
                  this.possibilidadesY[antY][xx] =  this.possibilidadesY[antY][xx] + 1
                  antX =xx
                  contX = contX +1
                  contY = contY +1
                }
              }

            if(auxTile[ii][jj] >=0)
            {
              if(antX ==-1)
              {
              antX = auxTile[ii][jj];
              this.possibilidadesX[antX][antX] =  this.possibilidadesX[antX][antX] + 1
              }
              else
              {
              let xx = auxTile[ii][jj];
              this.possibilidadesX[antX][xx] =  this.possibilidadesX[antX][antX] + 1
              antX = auxTile[ii][jj];
              }
              antY = auxTile[ii-1][jj]
              if(antY==-1)
              {
                antY = auxTile[ii][jj];
              }
              let xx = auxTile[ii][jj]
              this.possibilidadesY[antY][xx] =  this.possibilidadesY[antY][xx] + 1
              antX =xx

              contX = contX +1
              contY = contY +1
            }
            }
          }
        }
        antX =-1;
        antY =-1
      }
      auxTile[0] = 0
      auxTile[1] = 0
      auxTile[2] = 0
      this.possibilidades[ant][maior] = this.possibilidades[ant][maior] + 1;
      cont = cont + 1
      ant = maior
    }
  }
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles.length; j++) {
        this.possibilidades[i][j] = this.possibilidades[i][j] / cont;
      }
    }
    console.log(this.possibilidades);
  }

  iniciar() {
    this.treino();
    return this.GenerateRandomMap(0);
  }

  limpa() {
    this.possibilidades = [];
    this.tiles = [];
  }
}
